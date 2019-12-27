# 团队代码质量：eslint+husky+prettier+lint-staged

> 本文主要探究，如何约束和保持 `前端团队代码一致性`, 分别介绍 eslint、prettier、husky、lint-staged、commitlint

----
## 一、团队代码约束工程化流程

1. 待提交的代码 git add 添加到 git暂存区（staged）；
2. 执行 git commit；
3. husky（哈士奇）注册在 git hook 中的 commit-msg钩子函数被调用，执行commitlint，强制校验代码提交时的commit msg；
4. husky（哈士奇）注册在 git hook 中的 pre-commit钩子函数被调用，执行lint-staged；
5. lint-staged（顾名思义是只对暂存区文件执行lint）取得所有被提交的文件依次执行写好的任务（ESLint 和 Prettier）；
6. 如果有错误（没通过ESlint检查）则停止任务，同时打印错误信息，等待修复后再执行commit；
7. 成功commit，可push到远程。

## 二、认识流程中的工具

::: tip
husky（哈士奇）的作用：如果没有husky，代码就需要push到origin之后再进行lint扫描，反馈流程过长且本身未通过检查的代码是不应该push到origin仓库中的。最理想的时机应该是在本地执行 git commit 时，触发代码检查，那么就需要用到 git hook。husky 其实就是一个为 git 客户端增加 hook 的工具。将其安装到所在仓库的过程中它会自动在 .git/ 目录下增加相应的钩子实现在 pre-commit 阶段就执行一系列流程保证每一个 commit 的正确性。
:::

::: tip
git的hook 就是git add、git commit等git操作时的回调钩子（可以查看.git文件下的hooks目录，这里存放的是git相关操作的一些脚本例子）。
:::

::: tip
lint-staged 就是在 pre-commit 钩子函数中执行的工具。在进行git commit的时候触发到git hook进而执行pre-commit，而pre-commit脚本引用了lint-staged配置表，只对git add到stage区的文件进行配置表中配置的操作（此处我们不仅仅可以利用其调用linters，还可以调用prettier对代码进行格式化，注意应先格式化后lint检查）；
:::

::: tip
为什么只对stage区的文件检查？如果是项目中途引入代码检查，那么在有历史代码时，对其他未修改文件都进行检查，一下出现成百上千个错误，那么可能会造成冲突或者一些不可预知的问题，降低项目稳定性；
:::

::: tip
具体lint-staged做了三件事情：
  1. 执行prettier脚本，这是对代码进行格式化的，在下面具体来说；
  2. 执行eslint --fix操作，进行扫描，若发现工具可修复的问题进行fix；
  3. 上述两项任务完成后对代码重新add。
:::

::: tip
prettier是格式化代码工具：可是eslint已经有格式化功能了，为什么还需要prettier？Prettier 确实和 ESLint 有重叠，但两者侧重点不同：
  - ESLint 主要工作就是检查代码质量和检查代码风格，并给出提示，虽然 eslint --fix 来修复一些问题（eslint规则中前面带🔧图标的都是可以自动修复的），但它所能提供的格式化功能很有限；
  - 而 Prettier 没有对代码的质量进行检查的能力，其只会对代码风格按照指定的规范进行统一，避免一个项目中出现多种不同的代码风格。Prettier 被设计为易于与 ESLint 集成，所以你可以轻松在项目中使两者，而无需担心冲突。
:::

::: tip
commitlint的作用：使用commitLint强制校验代码提交时的commit msg格式，约束团队git提交规范，方便历史回顾、帮助他人更好review、查找、追踪代码变动历史等。也需要使用huksy，将commitlint的检查绑定到commit-msg这个hook上。
  - `<type>[optional scope]: <description>`: type如下
    ```
    build: 项目构建打包
    ci: 项目构建配置的变动
    docs: 仅仅修改了文档等（不是指文案类的改动，而是指项目文档、代码注释等）
    fix: 修复bug
    feat: 增加新功能
    perf: 优化
    refactor: 重构(非fix、非feature、非style风格格式化)
    revert: 代码回滚
    style: 代码风格变动，例如空格、缩进等（不是指css文件变动）
    test: 测试用例代码
    chore: 其他类型的更改（非即以上类型的改动）
    ```
:::


## 二、具体配置

1. 配置eslint

eslint配置文件可以有多种形式（传送门：[eslint官网]()）：
  ESLint 配置文件优先级：
  - .eslintrc.js(输出一个配置对象)
  - .eslintrc.yaml
  - .eslintrc.yml
  - .eslintrc.json（ESLint的JSON文件允许JavaScript风格的注释）
  - .eslintrc（可以是JSON也可以是YAML）
  - package.json（在package.json里创建一个eslintConfig属性，在那里定义你的配置）

这里我们采用在项目根目录下配置.eslintrc.js及.eslintignore文件。

- 在项目根目录创建一个.eslintignore文件，告诉ESLint去忽略特定的文件和目录
- .eslintignore文件是一个纯文本文件，其中的每一行都是一个glob模式表明哪些路径应该忽略检测
```
/build/
/config/
/dist/
/*.js
```

.eslintrc.js配置文件：
```js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true, // 与寻找配置文件规则有关
  // ESLint默认使用Espree作为其解析器, 同时babel-eslint也是用得最多的解析器
  parser: 'vue-eslint-parser', // 详见https://eslint.vuejs.org/user-guide/#faq
  parserOptions: { // TODparser解析代码时的参数
    parser: 'babel-eslint',
    sourceType: 'module', // //设置为script(默认)或module（如果你的代码是ECMAScript模块)
    // 指定要使用的ECMAScript版本，默认值5
    // ecmaVersion: 5,
    // 这是个对象，表示你想使用的额外的语言特性,所有选项默认都是false
    ecmaFeatures: {
      // 允许在全局作用域下使用return语句
      // globalReturn: false,
      // 启用全局strict模式（严格模式）
      // impliedStrict: false,
      // 启用JSX
      jsx: true,
      // 启用对实验性的objectRest/spreadProperties的支持
      // experimentalObjectRestSpread: false
    }
  },
  // globals: {
  //     __: true // 配置自定义全局变量
  // },
  // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境，不矛盾
  env: {
    //效果同配置项ecmaVersion一样
    es6: true,
    browser: true,
    node: true,
    // commonjs: false,
    // mocha: true,
    // jquery: true,
    //如果你想使用来自某个插件的环境时，确保在plugins数组里指定插件名
    //格式为：插件名/环境名称（插件名不带前缀）
    // react/node: true
  },
  // ESLint支持使用第三方插件
  // 在使用插件之前，你必须使用npm安装它
  // 全局安装的ESLint只能使用全局安装的插件
  // 本地安装的ESLint不仅可以使用本地安装的插件还可以使用全局安装的插件
  // plugin与extend的区别：extend提供的是eslint现有规则的一系列预设
  // 而plugin则提供了除预设之外的自定义规则，当你在eslint的规则里找不到合适的的时候
  // 就可以借用插件来实现了
  extends: [ // extends属性值可以是一个字符串或字符串数组，数组中每个配置项继承它前面的配置
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  // 插件名称可以省略eslint-plugin-前缀
  plugins: [
    'vue'
  ],
  // off或0--关闭规则
  // warn或1--开启规则，警告级别(不会导致程序退出)
  // error或2--开启规则，错误级别(当被触发的时候，程序会退出)
  rules: {
    // 这里如果配置了具体规则，会覆盖.prettierrc文件中的规则
    // 且单独执行prettier --write命令，这里的配置是读不到的
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "none",
      "bracketSpacing": true,
      "jsxBracketSameLine": true,
      "endOfLine": "crlf"
    }],
    // https://eslint.vuejs.org/rules/
    // https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    // https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline':'off',
    // https://eslint.vuejs.org/rules/name-property-casing.html
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 0,
    // 如果某条规则有额外的选项，你可以使用数组字面量指定它们
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "fetch",
        "asyncData",
        "data",
        "computed",
        "watch",
        ["directives", "filters"],
        "LIFECYCLE_HOOKS",
        "methods",
        "head",
        ["template", "render"],
        "renderError",
        "components"
      ]
    }],
    // https://eslint.org/docs/rules/
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    // ......
  }
}

```

如果希望在重新编译的时候eslint自动修复代码，需要在webpack配置中加入eslint，并且设置 fix: true ，并且在devserver中开启eslint（[传送门](https://my.oschina.net/u/3970421/blog/2874449)，本方案未采用）。

2. 配置prettier

与eslint的配置方式相似，prettier也可以有多重配置文件，本文也只采用在根目录下配置.prettierrc.js。

.prettierrc.js配置文件： 
```js
module.exports = { 
 "printWidth": 80, // 每行代码长度（默认80）
 "tabWidth": 2, // 每个tab相当于多少个空格（默认2）
 "useTabs": false, // 是否使用tab进行缩进（默认false）
 "singleQuote": true, // 使用单引号（默认false）
 "semi": true, // 声明结尾使用分号(默认true)
 "trailingComma": "all", // 多行使用拖尾逗号（默认none）
 "bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
 "jsxBracketSameLine": false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
 "arrowParens": "avoid" // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
}
```

prettier有3种使用方式：
- 在编辑器中安装插件，如vs code中安装 Prettier - Code formatter；
- 使用脚本，使用了根目录配置文件的，使用命令行 `prettier --write {src,static}/**/*.{js,vue}` 格式化，prettier不但需要在项目里安装，还需要全局安装才能使用prettier命令，否则无效；
- 作为linter工具的插件使用（`也是本方案采取的方式`）：
  - 由于需要同时使用prettier和eslint，而prettier的一些规则和eslint的一些规则可能存在冲突，所以需要将eslint的一些可能与prettier发生冲突的代码格式化规则关闭。这里使用eslint-plugin-prettier和eslint-config-prettier。

  - eslint-plugin-prettier可以将prettier的规则设置为eslint的规则，对不符合规则的进行提示。（与eslint-plugin-vue相同）

  - eslint-config-prettier可以关闭eslint可能与prettier发生冲突的代码格式化规则。官方称eslint-plugin-prettier需要与eslint-config-prettier搭配食用才能获得最佳效果。
  - `npm i -D prettier eslint-plugin-prettier eslint-config-prettier`，在.eslintrc.js文件中添加配置：
```js
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ]
  rules: {
    "prettier/prettier": "error"
  }
}
```

3. 配置commitlint
[传送门](https://segmentfault.com/a/1190000017790694)

还可以结合`commitizen`交互提交工具，在全局安装commitizen，就可以在任意git项目中，都运行`git cz`命令。

```
$ npm install commitizen cz-conventional-changelog -g
$ echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint --edit $HUSKY_GIT_PARAMS"
    }
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ],
    "rules": {
      "subject-case": [0],
      "scope-case": [0]
    }
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "devDependencies": {
    "@commitlint/cli": "^7.1.2",
    "@commitlint/config-conventional": "^7.1.2"
  }
}

```

4. 配置lint-staged

lint-staged的路径按照glob规则配置，先prettier格式化，再eslint检查，最后重新git add。

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "{src,static}/**/*.{js,vue}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  },
  "devDependencies": {
    "eslint": "^4.15.0",
    "husky": "^1.1.2",
    "lint-staged": "^9.5.0",
    "prettier": "^1.19.1",
  }
}
```

5. stylelint

待完成：https://segmentfault.com/a/1190000017335221


## 三、 注意几个关键问题！！

::: danger 关键问题

- 我们使用的方案是借用了两个插件来集成eslint与prettier：`eslint-config-prettier 这个是关闭eslint冲突的规则`，`eslint-plugin-prettier是在eslint运行时同步执行prettier`；

- 由于我们使用了 eslint-plugin-prettier 插件来驱动prettier的执行，执行`eslint --fix`会同时执行eslint检查和prettier格式化，因此在`lint-staged`中就不需要先执行一次 `prettier --write` 了。（`The rule is autofixable -- if you run eslint with the --fix flag, your code will be formatted according to prettier style.`）

- 而如果不使用上面提到的两个插件，则必须要在`lint-staged`中就分别执行 `prettier --write` 与`eslint --fix`，由于是分开来执行的，各自需要读取各自的rules，所以要特别注意两者的一致性，否则肯定会报错。

- 在eslintrc.js中配置prettier/prettier的具体option规则时（比如 `"prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}]`），这里的option中的rules的优先级比直接在 .prettierrc文件中的规则高，因此eslint驱动prettier执行格式化会以这里的规则为准，所以如果这里配置了就不用重复在.prettierrc文件中配置了。

- 但是 **不推荐在 在eslintrc.js中配置prettier/prettier的具体option规则**，因为编辑器的一些prettier扩展只能读到.prettierrc文件中的配置，而不能读到lint配置文件的prettier配置项，因此推荐的做法是**在.prettierrc文件中配置prettier的规则，eslint-config-prettier插件在用eslint驱动prettier执行时也能读到，编辑器的扩展插件也能读到**（`Note: While it is possible to pass options to Prettier via your ESLint configuration file, it is not recommended because editor extensions such as prettier-atom and prettier-vscode will read .prettierrc, but won't read settings from ESLint, which can lead to an inconsistent experience.`）。

:::

## 四、 完整配置

package.json
```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "{src,static}/**/*.{js,vue}": [
      // "prettier --write", // 由于使用插件eslint-plugin-prettier，不需要重复配置
      "eslint --fix",
      "git add"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ],
    "rules": {
      "subject-case": [
        0
      ],
      "scope-case": [
        0
      ]
    }
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "devDependencies": {
    "@commitlint/cli": "^7.1.2",
    "@commitlint/config-conventional": "^7.1.2",
    "babel-eslint": "^8.2.6",
    "cz-conventional-changelog": "2.1.0",
    "eslint": "^4.15.0",
    "eslint-config-prettier": "^6.7.0",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-vue": "^4.0.0",
    "husky": "^1.1.2",
    "lint-staged": "^9.5.0",
    "prettier": "^1.19.1",
  }
}
```

.prettierrc.js
```js
module.exports = {
  "printWidth": 120, // 每行代码长度（默认80）
  "tabWidth": 2, // 每个tab相当于多少个空格（默认2）
  "useTabs": false, // 是否使用tab进行缩进（默认false）
  "singleQuote": true, // 使用单引号（默认false）
  "semi": false, // 声明结尾使用分号(默认true)
  "trailingComma": "none", // 多行使用拖尾逗号（默认none）
  "bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
  "jsxBracketSameLine": true, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  "arrowParens": "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
  "proseWrap": "preserve",
  "endOfLine": "crlf"
}
```


eslintrc.js
```js
module.exports = {
  root: true,
  parser: 'vue-eslint-parser', // 详见https://eslint.vuejs.org/user-guide/#faq
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'vue',
    'prettier'
  ],
  rules: {
    "prettier/prettier": "error",
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    "vue/multiline-html-element-content-newline": 'off',
    'vue/html-end-tags': 2,
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    "vue/html-closing-bracket-newline": [0, {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/html-closing-bracket-newline": 0,
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "any",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/require-default-prop": 0,
    "vue/order-in-components": [0, {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "fetch",
        "asyncData",
        "data",
        "computed",
        "watch",
        ["directives", "filters"],
        "LIFECYCLE_HOOKS",
        "methods",
        "head",
        ["template", "render"],
        "renderError",
        "components"
      ]
    }],
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ['error', 'always', {'null': 'ignore'}],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    // 'indent': [2, 2, {
    //   'SwitchCase': 1
    // }],
    // 'semi': [2, 'never'],
    indent: 0, // process by prettier
    semi: 0, // process by prettier
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never']
  }
}
```

.eslintignore
```
/build/
/config/
/dist/
/*.js
```




