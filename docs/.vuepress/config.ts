import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'Roundtable FE',  // 设置网站标题
    description: 'A knowledge base created by Roundtable FE',

    themeConfig: {
        logo: '/logo.png',
        sidebarDepth: 2,
        editLink: false,
        // activeHeaderLinks: true,
        // lastUpdated: true,
        repo: 'https://github.com/johninch/Roundtable',
        darkMode: false,
        navbar: [
            { text: 'Home', link: '/' },
            { text: '知识库', link: '/Question-Bank/' },
            { text: '共读', link: '/Lets-Read/' },
            { text: '通缉令', link: '/Wanted/' },
            { text: '源码探秘', link: '/Quest-SC/' },
            { text: '算法', link: '/Algorithm/' },
            { text: 'Ani-Css', link: 'https://esop-fed.github.io/ani-css/' },
            {
                text: '进阶全栈',
                link: '/FullStackDeveloper/'
            },
            {
                text: '个人备忘',
                children: [
                    { text: 'johninch', link: '/Mark/johninch/' },
                ]
            },
            {
                text: 'blog',
                children: [
                    { text: 'johninch', link: 'https://johninch.github.io/' },
                    { text: 'Caleb', link: 'https://dannisi.github.io/' },
                    { text: 'niannings', link: 'https://niannings.github.io/' },
                    { text: 'Xmtd', link: 'https://Xmtd.github.io/' },
                    { text: 'febcat', link: 'https://febcat.github.io/' }
                ]
            },
            {
                text: 'github',
                children: [
                    // { text: 'Roundtable', link: 'https://github.com/johninch/Roundtable' },
                    { text: 'esop-fed', link: 'https://github.com/esop-fed' },
                    { text: 'johninch', link: 'https://github.com/johninch' },
                    { text: 'Caleb', link: 'https://github.com/dannisi' },
                    { text: 'niannings', link: 'https://github.com/niannings' },
                    { text: 'Xmtd', link: 'https://github.com/Xmtd' },
                    { text: 'febcat', link: 'https://github.com/febcat' }
                ]
            }
        ],
        sidebar: {
            '/Question-Bank/': [
                '/Question-Bank/',
                {
                    text: '基本语法',
                    isGroup: true,
                    children: [
                        '/Question-Bank/basic-grammar/variablesAndTypes1.md',
                        '/Question-Bank/basic-grammar/variablesAndTypes2.md',
                        '/Question-Bank/basic-grammar/number.md',
                        '/Question-Bank/basic-grammar/variablesAndTypes3.md',
                        '/Question-Bank/basic-grammar/variablesAndTypes4.md',
                        '/Question-Bank/basic-grammar/variablesAndTypes5.md',
                        '/Question-Bank/basic-grammar/deep-clone.md',
                        '/Question-Bank/basic-grammar/deep-query.md',
                        '/Question-Bank/basic-grammar/chain-methods.md',
                        '/Question-Bank/basic-grammar/callback-hell.md',
                        '/Question-Bank/basic-grammar/flatten-array.md',
                        '/Question-Bank/basic-grammar/to-2D-array.md',
                        '/Question-Bank/basic-grammar/duplicate-remove.md',
                        '/Question-Bank/basic-grammar/is-array.md',
                        '/Question-Bank/basic-grammar/create-array.md',
                        '/Question-Bank/basic-grammar/odd-even-print.md',
                        '/Question-Bank/basic-grammar/bind-implementation.md',
                        '/Question-Bank/basic-grammar/debounce.md',
                        '/Question-Bank/basic-grammar/fibonacci.md',
                        '/Question-Bank/basic-grammar/print-all-directory-file.md',
                        '/Question-Bank/basic-grammar/type-judge.md',
                        '/Question-Bank/basic-grammar/li-index.md',
                        '/Question-Bank/basic-grammar/football-people.md',
                        '/Question-Bank/basic-grammar/back-to-top.md',
                        '/Question-Bank/basic-grammar/curry.md',
                        '/Question-Bank/basic-grammar/js-querySelector.md',
                        '/Question-Bank/basic-grammar/js-tricks.md',
                    ]
                },
                {
                    text: '面向对象与原型链',
                    isGroup: true,
                    children: [
                        '/Question-Bank/object-oriented/prototype-chain.md',
                        '/Question-Bank/object-oriented/class-declaration.md',
                        '/Question-Bank/object-oriented/class-extends.md',
                    ]
                },
                {
                    text: 'JS的执行机制',
                    isGroup: true,
                    children: [
                        '/Question-Bank/execution/interpreter.md',
                        '/Question-Bank/execution/context.md',
                        '/Question-Bank/execution/event-loop.md',
                        '/Question-Bank/execution/asynchronous-cb.md',
                        '/Question-Bank/execution/asynchronous-promise.md',
                        '/Question-Bank/execution/asynchronous-gen.md',
                        '/Question-Bank/execution/asynchronous-async&await.md'
                    ]
                },
                {
                    text: 'CSS相关',
                    isGroup: true,
                    children: [
                        '/Question-Bank/css/layout-3-col.md',
                        '/Question-Bank/css/layout-block-center.md',
                        '/Question-Bank/css/box-sizing&margin-collapse&BFC.md',
                        '/Question-Bank/css/layout-method.md',
                        '/Question-Bank/css/css-base.md',
                        '/Question-Bank/css/css-tricks.md',
                        '/Question-Bank/css/flex-box.md',
                        '/Question-Bank/css/circle-loading.md',
                    ]
                },
                {
                    text: 'HTML & DOM',
                    isGroup: true,
                    children: [
                        '/Question-Bank/dom/dom-event.md',
                        '/Question-Bank/dom/shadow-dom.md',
                    ]
                },
                {
                    text: 'BOM',
                    isGroup: true,
                    children: [
                        '/Question-Bank/bom/bom-base.md',
                        '/Question-Bank/bom/router.md',
                    ]
                },
                {
                    text: '通信',
                    isGroup: true,
                    children: [
                        '/Question-Bank/communication/http.md',
                        '/Question-Bank/communication/internet-base.md',
                        '/Question-Bank/communication/http-headers.md',
                        '/Question-Bank/communication/http-proxy.md',
                        '/Question-Bank/communication/cross-domain.md',
                        '/Question-Bank/communication/cors.md',
                        '/Question-Bank/communication/upload.md',
                        '/Question-Bank/communication/download.md',
                        '/Question-Bank/communication/preview.md',
                        '/Question-Bank/communication/json.md',
                        '/Question-Bank/communication/axios.md',
                    ]
                },
                {
                    text: '浏览器及前端性能',
                    isGroup: true,
                    children: [
                        '/Question-Bank/browser/browser-mechanism.md',
                        '/Question-Bank/browser/render.md',
                        '/Question-Bank/browser/performance.md',
                        '/Question-Bank/browser/performance-evaluation.md',
                        '/Question-Bank/browser/process-eventloop.md',
                        '/Question-Bank/browser/from-url-input.md',
                        '/Question-Bank/browser/memory-or-disk-cache.md',
                    ]
                },
                {
                    text: '网络安全',
                    isGroup: true,
                    children: [
                        '/Question-Bank/security/fe-security.md',
                    ]
                },
                {
                    text: '正则表达式',
                    isGroup: true,
                    children: [
                        '/Question-Bank/regular-expression/reg-base.md',
                        '/Question-Bank/regular-expression/reg-example.md',
                    ]
                },
                {
                    text: '工程化',
                    isGroup: true,
                    children: [
                        '/Question-Bank/Engineering/js-module.md',
                        '/Question-Bank/Engineering/css-naming-standard.md',
                        '/Question-Bank/Engineering/repo-naming-standard.md',
                        '/Question-Bank/Engineering/design-patterns.md',
                        '/Question-Bank/Engineering/deploy.md',
                        '/Question-Bank/Engineering/eslintPrettier.md',
                        '/Question-Bank/Engineering/i18n.md',
                        '/Question-Bank/Engineering/SSR.md',
                        '/Question-Bank/Engineering/SSR-Imooc.md',
                        '/Question-Bank/Engineering/jsBridge.md',
                    ]
                },
                {
                    text: 'ES6+',
                    isGroup: true,
                    children: [
                        '/Question-Bank/ES6+/ES6.md',
                        '/Question-Bank/ES6+/class-method.md',
                    ]
                },
                {
                    text: 'TypeScript',
                    isGroup: true,
                    children: [
                        '/Question-Bank/typescript/typescript-base.md',
                        '/Question-Bank/typescript/type-difference.md',
                        '/Question-Bank/typescript/ts-compatibility.md',
                    ]
                },
                {
                    text: 'MVVM',
                    isGroup: true,
                    children: [
                        '/Question-Bank/MVVM/mvvm-base.md',
                    ]
                },
                {
                    text: 'React',
                    isGroup: true,
                    children: [
                        '/Question-Bank/react/element-component-instance-node.md',
                        '/Question-Bank/react/SFC.md',
                        '/Question-Bank/react/react-handle-this.md',
                        '/Question-Bank/react/component-classify.md',
                        '/Question-Bank/react/react-reuse.md',
                        '/Question-Bank/react/withClock.md',
                        '/Question-Bank/react/lifecycle.md',
                        '/Question-Bank/react/Student.md',
                        '/Question-Bank/react/jsx-render.md',
                        '/Question-Bank/react/react-event.md',
                        '/Question-Bank/react/setState.md',
                        '/Question-Bank/react/react-virtual-dom.md',
                        '/Question-Bank/react/refs.md',
                        '/Question-Bank/react/children.md',
                        '/Question-Bank/react/mobx.md',
                        '/Question-Bank/react/fiber.md',
                        '/Question-Bank/react/react-other-points.md',
                        '/Question-Bank/react/react-router-dom',
                        '/Question-Bank/react/declare-react-router.md',
                        '/Question-Bank/react/react-hooks.md',
                        '/Question-Bank/react/react-performance.md',
                        '/Question-Bank/react/function-vs-class.md',
                        '/Question-Bank/react/black-magic-of-hooks.md',
                        '/Question-Bank/react/time-console.md',
                        '/Question-Bank/react/hooks+context.md',
                    ]
                },
                {
                    text: 'Vue',
                    isGroup: true,
                    children: [
                        '/Question-Bank/vue/vue-base.md',
                        '/Question-Bank/vue/vue-router.md',
                        '/Question-Bank/vue/vuex.md',
                        '/Question-Bank/vue/watch.md',
                        '/Question-Bank/vue/listeners-and-attrs.md',
                        '/Question-Bank/vue/customized-v-model.md',
                        '/Question-Bank/vue/v-loadmore.md',
                        '/Question-Bank/vue/v-search-select.md',
                        '/Question-Bank/vue/v-infinite-scroll.md',
                    ]
                },
                {
                    text: '小程序',
                    isGroup: true,
                    children: [
                        '/Question-Bank/miniprogram/wx-base.md',
                        '/Question-Bank/miniprogram/taro3-practice.md',
                    ]
                },
                {
                    text: 'Nodejs',
                    isGroup: true,
                    children: [
                        '/Question-Bank/nodejs/nodejs-base.md',
                        '/Question-Bank/nodejs/eventEmitter.md',
                        '/Question-Bank/nodejs/bff.md',
                        '/Question-Bank/nodejs/rpc.md',
                        '/Question-Bank/nodejs/service-discovery.md',
                        '/Question-Bank/nodejs/benchmarking-tool.md',
                        '/Question-Bank/nodejs/nodejs-myblog-imooc.md',
                    ]
                },
                {
                    text: '包管理 Npm & Yarn',
                    isGroup: true,
                    children: [
                        '/Question-Bank/pkgmanage/package.lock.json.md',
                    ]
                },
                {
                    text: 'Webpack',
                    isGroup: true,
                    children: [
                        '/Question-Bank/webpack/babel.md',
                        '/Question-Bank/webpack/webpack-base.md',
                        '/Question-Bank/webpack/loader-sequence.md',
                        '/Question-Bank/webpack/source-map.md',
                        '/Question-Bank/webpack/chunkhash.md',
                        '/Question-Bank/webpack/code-splitting.md',
                        '/Question-Bank/webpack/watch.md',
                        '/Question-Bank/webpack/HMR.md',
                        '/Question-Bank/webpack/building-speed-up.md',
                        '/Question-Bank/webpack/webpack-tricks.md',
                    ]
                },
                {
                    text: 'Git',
                    isGroup: true,
                    children: [
                        '/Question-Bank/git/base.md',
                        '/Question-Bank/git/git-stash.md',
                        '/Question-Bank/git/git-bisect.md',
                    ]
                },
                {
                    text: '工作实践',
                    isGroup: true,
                    children: [
                        '/Question-Bank/work-practices/product-quality.md',
                        '/Question-Bank/work-practices/eleMessage.md',
                        '/Question-Bank/work-practices/mobx-cases.md',
                        '/Question-Bank/work-practices/windowInject.md',
                        '/Question-Bank/work-practices/deepcss.md',
                        '/Question-Bank/work-practices/css-module.md',
                        '/Question-Bank/work-practices/ceiling-style.md',
                        '/Question-Bank/work-practices/virtual-scroll.md',
                    ]
                },
                {
                    text: 'PWA',
                    isGroup: true,
                    children: [
                        '/Wanted/pwa.md',
                    ]
                },
                {
                    text: '了解后端',
                    isGroup: true,
                    children: [
                        '/Question-Bank/backend/database-&-instance.md',
                        '/Question-Bank/backend/docker-vs-VM.md',
                    ]
                },
                {
                    text: '运维相关',
                    isGroup: true,
                    children: [
                        '/Question-Bank/Ops/nginx.md',
                    ]
                },
            ],
            '/Wanted/': [
                {
                    text: '第一期 PWA',
                    isGroup: true,
                    children: ['/Wanted/pwa']
                },
                {
                    text: '第二期 WebAssembly',
                    isGroup: true,
                    children: ['/Wanted/webAssembly']
                }
            ],
            '/Quest-SC/': [
                {
                    text: '源码探秘',
                    isGroup: true,
                    children: ['/Quest-SC/']
                },
                {
                    text: '组件库源码',
                    isGroup: true,
                    children: [
                        '/Quest-SC/component-lib/antd-modal.md',
                    ]
                },
                {
                    text: '未分类',
                    isGroup: true,
                    children: [
                        '/Quest-SC/one/sc-1',
                        '/Quest-SC/one/sc-2',
                        '/Quest-SC/one/sc-3',
                    ]
                },
            ],
            '/Lets-Read/': [
                '/Lets-Read/',
                {
                    text: '第一期',
                    isGroup: true,
                    children: [
                        '/Lets-Read/one/read-1-1',
                        '/Lets-Read/one/read-2-1',
                        '/Lets-Read/one/read-3-1',
                        '/Lets-Read/one/read-3-2',
                        '/Lets-Read/one/read-4-1',
                    ]
                },
                {
                    text: '第二期',
                    isGroup: true,
                    children: [
                        '/Question-Bank/execution/asynchronous-async&await',
                        '/Question-Bank/browser/process-eventloop',
                    ]
                },
                {
                    text: '技术学院分享',
                    isGroup: true,
                    children: [
                        '/Lets-Read/bytedance/tech-college/web_performance_engineering.md'
                    ]
                }
            ],
            '/Algorithm/': [
                '/Algorithm/',
                {
                    text: '排序',
                    isGroup: true,
                    children: [
                        '/Algorithm/Sort/',
                        '/Algorithm/Sort/firstMissingPositive.md',
                        '/Algorithm/Sort/fast-sort.md',
                        '/Algorithm/Sort/selection-sort.md',
                        '/Algorithm/Sort/shell-sort.md',
                    ]
                },
                {
                    text: '链表',
                    isGroup: true,
                    children: [
                        '/Algorithm/Linked-List/',
                        '/Algorithm/Linked-List/sortList.md',
                        '/Algorithm/Linked-List/print-from-tail-to-head.md',
                        '/Algorithm/Linked-List/reverse-linked-list.md',
                        '/Algorithm/Linked-List/merge-two-sorted-link.md',
                        '/Algorithm/Linked-List/entry-node-of-loop.md',
                        '/Algorithm/Linked-List/find-first-common-node.md',
                        '/Algorithm/Linked-List/find-Kth-to-tail.md',
                        '/Algorithm/Linked-List/delete-repeat-node.md',
                        '/Algorithm/Linked-List/copy-complicated-linked-list.md',
                    ]
                },
                {
                    text: '树和二叉树',
                    isGroup: true,
                    children: [
                        '/Algorithm/Tree-and-Binary-Tree/',
                        '/Algorithm/Tree-and-Binary-Tree/inorder-traversal.md',
                        '/Algorithm/Tree-and-Binary-Tree/preorder-traversal.md',
                        '/Algorithm/Tree-and-Binary-Tree/postorder-traversal.md',
                        '/Algorithm/Tree-and-Binary-Tree/levelOrder-traversal.md',
                        '/Algorithm/Tree-and-Binary-Tree/reconstruct-binary-tree.md',
                        '/Algorithm/Tree-and-Binary-Tree/get-HRD.md',
                        '/Algorithm/Tree-and-Binary-Tree/is-symmetrical.md',
                        '/Algorithm/Tree-and-Binary-Tree/mirror.md',
                        '/Algorithm/Tree-and-Binary-Tree/generate-BST.md',
                        '/Algorithm/Tree-and-Binary-Tree/isValidBST.md',
                        '/Algorithm/Tree-and-Binary-Tree/kth-node.md',
                        '/Algorithm/Tree-and-Binary-Tree/verify-squence-of-BST.md',
                        '/Algorithm/Tree-and-Binary-Tree/max-depth.md',
                        '/Algorithm/Tree-and-Binary-Tree/min-depth.md',
                        '/Algorithm/Tree-and-Binary-Tree/is-balanced.md',
                    ]
                },
                {
                    text: '堆',
                    isGroup: true,
                    children: [
                        '/Algorithm/Heap/',
                        '/Algorithm/Heap/topK.md',
                    ]
                },
                {
                    text: '正则',
                    isGroup: true,
                    children: [
                        '/Algorithm/Reg/',
                        '/Algorithm/Reg/repeatedSubstringPattern.md',
                        '/Algorithm/Reg/isMatch.md',
                    ]
                },
                {
                    text: '字符串',
                    isGroup: true,
                    children: [
                        '/Algorithm/String/',
                        '/Algorithm/String/revertByWord.md',
                        // '/Algorithm/String/countBinarySubstrings.md',
                    ]
                },
                {
                    text: '数组',
                    isGroup: true,
                    children: [
                        '/Algorithm/Array/',
                        '/Algorithm/Array/letterCombinations.md',
                        '/Algorithm/Array/canPlaceFlowers.md',
                        '/Algorithm/Array/hasGroupsSizeX.md',
                        '/Algorithm/Array/grayCode.md',
                    ]
                },
                {
                    text: '栈',
                    isGroup: true,
                    children: [
                        '/Algorithm/Stack/',
                        '/Algorithm/Stack/calPoints.md',
                        '/Algorithm/Stack/maximalRectangle.md',
                        '/Algorithm/Stack/largestRectangleArea.md',
                    ]
                },
                {
                    text: '队列',
                    isGroup: true,
                    children: [
                        '/Algorithm/Queue/',
                        '/Algorithm/Queue/MyCircularQueue.md',
                        '/Algorithm/Queue/leastInterval.md',
                    ]
                },
                {
                    text: '递归',
                    isGroup: true,
                    children: [
                        '/Algorithm/Recursion/',
                        '/Algorithm/Recursion/hanota.md',
                        '/Algorithm/Recursion/restoreIpAddresses.md',
                    ]
                },
                {
                    text: '贪心算法',
                    isGroup: true,
                    children: [
                        '/Algorithm/Greedy/',
                        '/Algorithm/Greedy/maxProfit.md',
                        '/Algorithm/Greedy/maxProfit2.md',
                        '/Algorithm/Greedy/lemonadeChange.md',
                    ]
                },
                {
                    text: '动态规划',
                    isGroup: true,
                    children: [
                        '/Algorithm/DP/',
                        '/Algorithm/DP/uniquePaths.md',
                        '/Algorithm/DP/uniquePaths2.md',
                        '/Algorithm/DP/minimumTriangle.md',
                        '/Algorithm/DP/findCheapestPrice.md',
                    ]
                },
            ],
            '/FullStackDeveloper/': [
                '/FullStackDeveloper/',
                {
                    text: 'Vue',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/vue/1_pre_vue_componential.md',
                        '/FullStackDeveloper/vue/1_vue_componential.md',
                        '/FullStackDeveloper/vue/2_vue_family.md',
                        '/FullStackDeveloper/vue/3_make_vue.md',
                        '/FullStackDeveloper/vue/4_5_6_vue2_source.md',
                        '/FullStackDeveloper/vue/8_vue_ts.md',
                        '/FullStackDeveloper/vue/9_project_training.md',
                        '/FullStackDeveloper/vue/10_vue3_1.md',
                        '/FullStackDeveloper/vue/11_vue-hook_vs_react-hook.md',
                        '/FullStackDeveloper/vue/12_vite.md',
                    ]
                },
                {
                    text: 'React',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/react/1_react_componential.md',
                        '/FullStackDeveloper/react/2_redux.md',
                        '/FullStackDeveloper/react/3_react-redux.md',
                        '/FullStackDeveloper/react/4_react-router.md',
                        '/FullStackDeveloper/react/5_project_training.md',
                        '/FullStackDeveloper/react/6_project_training2.md',
                        '/FullStackDeveloper/react/7_react16_source_1.md',
                        '/FullStackDeveloper/react/8_react16_source_2.md',
                        '/FullStackDeveloper/react/9_react16_source_3.md',
                        '/FullStackDeveloper/react/10_react16_source_4.md',
                        '/FullStackDeveloper/react/11_react&vue.md',
                    ]
                },
                {
                    text: 'NodeJS',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/node/1_base.md',
                        '/FullStackDeveloper/node/1_1_Cli.md',
                        '/FullStackDeveloper/node/2_Koa.md',
                        '/FullStackDeveloper/node/3_network_program.md',
                        '/FullStackDeveloper/node/4_mysql.md',
                        '/FullStackDeveloper/node/5_MongoDB.md',
                        '/FullStackDeveloper/node/6_auth.md',
                        '/FullStackDeveloper/node/6_1_auth.md',
                        '/FullStackDeveloper/node/7_eggjs.md',
                        '/FullStackDeveloper/node/8_eggjs_project.md',
                        '/FullStackDeveloper/node/9_ts_decorate.md',
                        '/FullStackDeveloper/node/10_node_deploy_nginx_pm2_docker.md',
                        '/FullStackDeveloper/node/11_middle_tier.md',
                        '/FullStackDeveloper/node/12_serverless.md',
                        '/FullStackDeveloper/node/13_eventloop.md',
                    ]
                },
                {
                    text: 'Webpack',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/webpack/1_basic_conf.md',
                        '/FullStackDeveloper/webpack/2_advance_usage.md',
                        '/FullStackDeveloper/webpack/3_product_training.md',
                        '/FullStackDeveloper/webpack/4_performance_optimization.md',
                        '/FullStackDeveloper/webpack/5_webpack_principle.md',
                        '/FullStackDeveloper/webpack/6_make_loader.md',
                        '/FullStackDeveloper/webpack/7_writing-a-plugin.md',
                    ]
                },
                {
                    text: 'React Native',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/react-native/pre_1_rn.md',
                        '/FullStackDeveloper/react-native/pre_2_env_ios.md',
                        // '/FullStackDeveloper/react-native/pre_1_rn.md',
                        // '/FullStackDeveloper/react-native/1_xxx',
                    ]
                },
                {
                    text: '项目',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/project/project.md',
                        '/FullStackDeveloper/project/algorithm.md',
                    ]
                },
                {
                    text: '安全',
                    isGroup: true,
                    children: [
                        '/FullStackDeveloper/security/1_network_attack.md',
                    ]
                },
            ],
            '/Mark/': [
                {
                    text: 'Johninch',
                    isGroup: true,
                    children: [
                        '/Mark/johninch/base.md',
                        '/Mark/johninch/promise.md',
                        '/Mark/johninch/coding.md',
                        '/Mark/johninch/leetcode.md',
                        '/Mark/johninch/project.md',
                        '/Mark/johninch/lib/react.md',
                        '/Mark/johninch/lib/vue.md',
                    ]
                },
            ],
        },
    },
    plugins: [
    ],
})
