module.exports = {
    title: 'Roundtable Coders',  // 设置网站标题
    description: 'A knowledge base created by ESOP-FED',
    base: '/Roundtable/',
    head: [
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.ico` }],
        // 在移动端, 搜索框在获得焦点时会放大, 并且在失去焦点后可以左右滚动, 这可以通过设置元来优化
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    serviceWorker: true,
    themeConfig: {
        sidebar: 'auto',
        sidebarDepth: 2,
        activeHeaderLinks: false,
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Home', link: '/' },
            { text: '题库', link: '/Question-Bank/' },
            { text: '共读', link: '/Lets-Read/' },
            { text: '通缉令', link: '/Wanted/' },
            { text: '源码探秘', link: '/Quest-SC/' },
            { text: '算法', link: '/Algorithm/' },
            { text: 'Ani-Css', link: 'https://esop-fed.github.io/ani-css/' },
            {
                text: 'blog',
                items: [
                    { text: 'johninch', link: 'https://johninch.github.io/' },
                    { text: 'Caleb', link: 'https://dannisi.github.io/' },
                    { text: 'niannings', link: 'https://niannings.github.io/' },
                    { text: 'Xmtd', link: 'https://Xmtd.github.io/' },
                    { text: 'febcat', link: 'https://febcat.github.io/' }
                ]
            },
            {
                text: 'github',
                items: [
                    { text: 'Roundtable', link: 'https://github.com/johninch/Roundtable' },
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
                    title: '基本语法',
                    children: [
                        '/Question-Bank/basic-grammar/variablesAndTypes1',
                        '/Question-Bank/basic-grammar/variablesAndTypes2',
                        '/Question-Bank/basic-grammar/number',
                        '/Question-Bank/basic-grammar/variablesAndTypes3',
                        '/Question-Bank/basic-grammar/variablesAndTypes4',
                        '/Question-Bank/basic-grammar/variablesAndTypes5',
                        '/Question-Bank/basic-grammar/async-await',
                        '/Question-Bank/basic-grammar/deep-clone',
                        '/Question-Bank/basic-grammar/deep-query',
                        '/Question-Bank/basic-grammar/chain-methods',
                        '/Question-Bank/basic-grammar/callback-hell',
                        '/Question-Bank/basic-grammar/flatten-array',
                        '/Question-Bank/basic-grammar/to-2D-array',
                        '/Question-Bank/basic-grammar/duplicate-remove',
                        '/Question-Bank/basic-grammar/is-array',
                        '/Question-Bank/basic-grammar/create-array',
                        '/Question-Bank/basic-grammar/odd-even-print',
                        '/Question-Bank/basic-grammar/bind-implementation',
                        '/Question-Bank/basic-grammar/debounce',
                        '/Question-Bank/basic-grammar/fibonacci',
                        '/Question-Bank/basic-grammar/upload',
                        '/Question-Bank/basic-grammar/print-all-directory-file',
                        '/Question-Bank/basic-grammar/type-judge',
                        '/Question-Bank/basic-grammar/li-index',
                        '/Question-Bank/basic-grammar/football-people',
                    ]
                },
                {
                    title: '面向对象与原型链',
                    children: [
                        '/Question-Bank/object-oriented/prototype-chain',
                        '/Question-Bank/object-oriented/class-declaration',
                        '/Question-Bank/object-oriented/class-extends',
                    ]
                },
                {
                    title: 'CSS相关',
                    children: [
                        '/Question-Bank/css/layout-3-col',
                        '/Question-Bank/css/layout-block-center',
                        '/Question-Bank/css/box-sizing&margin-collapse&BFC'
                    ]
                },
                {
                    title: 'HTML & DOM',
                    children: [
                        '/Question-Bank/dom/dom-event',
                    ]
                },
                {
                    title: '通信',
                    children: [
                        '/Question-Bank/communication/http',
                    ]
                },
                {
                    title: '前端性能',
                    children: [
                        '/Question-Bank/performance/memory-or-disk-cache',
                        '/Question-Bank/performance/process-eventloop',
                    ]
                },
                {
                    title: '正则表达式',
                    children: [
                        '/Question-Bank/regular-expression/upper-camel-case',
                        '/Question-Bank/regular-expression/code-to-market',
                        '/Question-Bank/regular-expression/Chinese-ID-card',
                    ]
                },
                {
                    title: 'ES6 & ESnext',
                    children: [
                        '/Question-Bank/ES6/deconstruction',
                        '/Question-Bank/ES6/deconstruction-function',
                        '/Question-Bank/ES6/class-method',
                    ]
                },
                // {
                //     title: 'TypeScript',
                //     children: [
                //         '/Question-Bank/typescript/查找',
                //         '/Question-Bank/typescript/二维数组查找',
                //         '/Question-Bank/typescript/旋转数组的最小数字',
                //         '/Question-Bank/typescript/在排序数组中查找数字',
                //     ]
                // },
                {
                    title: 'React',
                    children: [
                        '/Question-Bank/react/element-component-instance-node',
                        '/Question-Bank/react/Student',
                        '/Question-Bank/react/time-console',
                        '/Question-Bank/react/calling',
                        '/Question-Bank/react/declare-react-router',
                        '/Question-Bank/react/router-component-render-children',
                        '/Question-Bank/react/withClock',
                        '/Question-Bank/react/lifecycle',
                    ]
                },
                {
                    title: 'Vue',
                    children: [
                        '/Question-Bank/vue/customized-v-model',
                        '/Question-Bank/vue/listeners-and-attrs',
                        '/Question-Bank/vue/v-loadmore',
                        '/Question-Bank/vue/v-search-select',
                        '/Question-Bank/vue/v-infinite-scroll',
                        '/Question-Bank/vue/watch'
                    ]
                },
                {
                    title: 'Nodejs',
                    children: [
                        '/Question-Bank/nodejs/eventEmitter',
                    ]
                },
                {
                    title: '包管理',
                    children: [
                        '/Question-Bank/pkgmanage/package.lock.json',
                    ]
                },
                // {
                //     title: 'Webpack & Babel',
                //     children: [
                //         '/Question-Bank/webpack-babel/查找',
                //         '/Question-Bank/webpack-babel/二维数组查找',
                //         '/Question-Bank/webpack-babel/旋转数组的最小数字',
                //         '/Question-Bank/webpack-babel/在排序数组中查找数字',
                //     ]
                // },
                // {
                //     title: 'Git',
                //     children: [
                //         '/Question-Bank/git/查找',
                //         '/Question-Bank/git/二维数组查找',
                //         '/Question-Bank/git/旋转数组的最小数字',
                //         '/Question-Bank/git/在排序数组中查找数字',
                //     ]
                // },
                // {
                //     title: 'Npm & Yarn',
                //     children: [
                //         '/Question-Bank/npm-yarn/查找',
                //         '/Question-Bank/npm-yarn/二维数组查找',
                //         '/Question-Bank/npm-yarn/旋转数组的最小数字',
                //         '/Question-Bank/npm-yarn/在排序数组中查找数字',
                //     ]
                // },
                // {
                //     title: 'ESlint',
                //     children: [
                //         '/Question-Bank/eslint/查找',
                //         '/Question-Bank/eslint/二维数组查找',
                //         '/Question-Bank/eslint/旋转数组的最小数字',
                //         '/Question-Bank/eslint/在排序数组中查找数字',
                //     ]
                // },
                {
                    title: '运维相关',
                    children: [
                        '/Question-Bank/Ops/nginx',
                    ]
                },
                {
                    title: '工作实践',
                    children: [
                        '/Question-Bank/work-practices/deploy',
                        '/Question-Bank/work-practices/eleMessage',
                        '/Question-Bank/work-practices/mobx-cases',
                        '/Question-Bank/work-practices/windowInject',
                        '/Question-Bank/work-practices/deepcss',
                        '/Question-Bank/work-practices/css-module',
                        '/Question-Bank/work-practices/eslintPrettier',
                        '/Question-Bank/work-practices/i18n',
                        '/Question-Bank/work-practices/range-download',
                        '/Question-Bank/work-practices/range-breakpoint-download',
                    ]
                },
                {
                    title: 'PWA',
                    children: [
                        '/Wanted/pwa',
                    ]
                },
                // {
                //     title: '待分类',
                //     children: [
                //         '/Question-Bank/eslint/查找',
                //         '/Question-Bank/eslint/二维数组查找',
                //         '/Question-Bank/eslint/旋转数组的最小数字',
                //         '/Question-Bank/eslint/在排序数组中查找数字',
                //     ]
                // },
            ],
            '/Wanted/': [
                {
                    title: 'Wanted首页',
                    path: '/Wanted/'
                },
                {
                    title: '第一期 PWA',
                    path: '/Wanted/pwa'
                },
                {
                    title: '第二期 WebAssembly',
                    path: '/Wanted/webAssembly'
                }
            ],
            '/Quest-SC/': [
                {
                    title: '源码探索',
                    path: '/Quest-SC/'
                },
                {
                    title: '第一期',
                    children: [
                        '/Quest-SC/one/sc-1',
                        '/Quest-SC/one/sc-2',
                        '/Quest-SC/one/sc-3',
                    ]
                },
            ],
            '/Lets-Read/': [
                {
                    title: 'Lets-Read',
                    path: '/Lets-Read/'
                },
                {
                    title: '第一期',
                    children: [
                        '/Lets-Read/one/read-1-1',
                        '/Lets-Read/one/read-2-1',
                        '/Lets-Read/one/read-3-1',
                        '/Lets-Read/one/read-3-2',
                        '/Lets-Read/one/read-4-1',
                    ]
                },
                {
                    title: '第二期',
                    children: [
                        '/Question-Bank/basic-grammar/async-await',
                        '/Question-Bank/performance/process-eventloop',
                    ]
                }
            ],
            '/Algorithm/': [
                '/Algorithm/',
                {
                    title: '链表',
                    children: [
                        '/Algorithm/Linked-List/',
                        '/Algorithm/Linked-List/print-from-tail-to-head',
                        '/Algorithm/Linked-List/delete-repeat-node',
                        '/Algorithm/Linked-List/reverse-linked-list',
                        '/Algorithm/Linked-List/merge-two-sorted-link',
                        '/Algorithm/Linked-List/copy-complicated-linked-list',
                        '/Algorithm/Linked-List/entry-node-of-loop',
                        '/Algorithm/Linked-List/find-first-common-node',
                        '/Algorithm/Linked-List/find-Kth-to-tail',
                    ]
                },
            ]
        }
    },
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@alias': 'path/to/some/dir'
    //         }
    //     }
    // }
}