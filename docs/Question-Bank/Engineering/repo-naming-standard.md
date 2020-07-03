# 代码管理风格规范

代码管理标准比较流行的有两种方式：`monorepo`、`multirepo`：
- `Monorepo` 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)；vue3就用此方式；
    - 目前最常见的 `monorepo` 解决方案是 Lerna 和 yarn 的 workspaces 特性；
    - lerna 和 yarn-workspace 并不是只能选其一，大多 `monorepo` 即会使用 lerna 又会在 package.json 声明 workspaces。这样的话，无论你的包管理器是 npm 还是 yarn，都能发挥 `monorepo` 的优势；要是包管理是 yarn ，lerna 就会把依赖安装交给 yarn 处理。
- `Multirepo` 是每个模块建一个 repo。
- 另外还有git submodule，通过 Git 子模块，可以在当前 repo 中包含其它 repos、作为当前 repo 的子目录使用，同时能够保持 repos 之间的独立。
