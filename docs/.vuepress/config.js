module.exports = {
    title: 'Roundtable Coders',  // 设置网站标题
    description: 'A knowledge base created by ESOP-FED',
    base: '/Roundtable/',
    head: [
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.ico` }],
        ['script', { src: './js/search.js' }],
        ['script', { src: './js/main.js' }],
        // 在移动端, 搜索框在获得焦点时会放大, 并且在失去焦点后可以左右滚动, 这可以通过设置元来优化
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    serviceWorker: true,
    smoothScroll: true,
    themeConfig: {
        logo: '/logo.png',
        sidebar: 'auto',
        sidebarDepth: 2,
        activeHeaderLinks: true,
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Home', link: '/' },
            { text: '题库', link: '/Question-Bank/' },
            { text: '共读', link: '/Lets-Read/' },
            { text: '通缉令', link: '/Wanted/' },
            { text: '源码探秘', link: '/Quest-SC/' },
            { text: '算法', link: '/Algorithm/' },
            { text: 'Ani-Css', link: 'https://esop-fed.github.io/ani-css/' },
            { text: '项目复盘', link: '/Replay/' },
            {
                text: '进阶全栈',
                link: '/FullStackDeveloper/'
            },
            {
                text: '个人备忘',
                items: [
                    { text: 'johninch', link: '/Mark/johninch/' },
                ]
            },
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
                        '/Question-Bank/basic-grammar/print-all-directory-file',
                        '/Question-Bank/basic-grammar/type-judge',
                        '/Question-Bank/basic-grammar/li-index',
                        '/Question-Bank/basic-grammar/football-people',
                        '/Question-Bank/basic-grammar/back-to-top',
                        '/Question-Bank/basic-grammar/curry',
                        '/Question-Bank/basic-grammar/js-querySelector',
                        '/Question-Bank/basic-grammar/js-tricks',
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
                    title: 'JS的执行机制',
                    children: [
                        '/Question-Bank/execution/interpreter',
                        '/Question-Bank/execution/context',
                        '/Question-Bank/execution/event-loop',
                        '/Question-Bank/execution/asynchronous-cb',
                        '/Question-Bank/execution/asynchronous-promise',
                        '/Question-Bank/execution/asynchronous-gen',
                        '/Question-Bank/execution/asynchronous-async&await'
                    ]
                },
                {
                    title: 'CSS相关',
                    children: [
                        '/Question-Bank/css/layout-3-col',
                        '/Question-Bank/css/layout-block-center',
                        '/Question-Bank/css/box-sizing&margin-collapse&BFC',
                        '/Question-Bank/css/layout-method',
                        '/Question-Bank/css/css-base',
                        '/Question-Bank/css/css-tricks',
                        '/Question-Bank/css/flex-box.md',
                        '/Question-Bank/css/circle-loading.md',
                    ]
                },
                {
                    title: 'HTML & DOM',
                    children: [
                        '/Question-Bank/dom/dom-event',
                    ]
                },
                {
                    title: 'BOM',
                    children: [
                        '/Question-Bank/bom/bom-base',
                        '/Question-Bank/bom/router',
                    ]
                },
                {
                    title: '通信',
                    children: [
                        '/Question-Bank/communication/http',
                        '/Question-Bank/communication/internet-base',
                        '/Question-Bank/communication/cross-domain',
                        '/Question-Bank/communication/cors',
                        '/Question-Bank/communication/upload',
                        '/Question-Bank/communication/download',
                        '/Question-Bank/communication/preview',
                        '/Question-Bank/communication/json',
                        '/Question-Bank/communication/axios',
                    ]
                },
                {
                    title: '浏览器及前端性能',
                    children: [
                        '/Question-Bank/browser/browser-mechanism',
                        '/Question-Bank/browser/render',
                        '/Question-Bank/browser/performance',
                        '/Question-Bank/browser/process-eventloop',
                        '/Question-Bank/browser/from-url-input',
                        '/Question-Bank/browser/memory-or-disk-cache',
                    ]
                },
                {
                    title: '网络安全',
                    children: [
                        '/Question-Bank/security/fe-security',
                    ]
                },
                {
                    title: '正则表达式',
                    children: [
                        '/Question-Bank/regular-expression/reg-base',
                        '/Question-Bank/regular-expression/reg-example',
                    ]
                },
                {
                    title: '工程化',
                    children: [
                        '/Question-Bank/Engineering/js-module',
                        '/Question-Bank/Engineering/css-naming-standard',
                        '/Question-Bank/Engineering/repo-naming-standard',
                        '/Question-Bank/Engineering/design-patterns',
                        '/Question-Bank/Engineering/deploy',
                        '/Question-Bank/Engineering/eslintPrettier',
                        '/Question-Bank/Engineering/i18n',
                        '/Question-Bank/Engineering/SSR',
                        '/Question-Bank/Engineering/SSR-Imooc',
                        '/Question-Bank/Engineering/jsBridge',
                    ]
                },
                {
                    title: 'ES6+',
                    children: [
                        '/Question-Bank/ES6+/ES6',
                        '/Question-Bank/ES6+/class-method',
                    ]
                },
                {
                    title: 'TypeScript',
                    children: [
                        '/Question-Bank/typescript/typescript-base',
                        '/Question-Bank/typescript/type-difference',
                        '/Question-Bank/typescript/ts-compatibility.md',
                    ]
                },
                {
                    title: 'MVVM',
                    children: [
                        '/Question-Bank/MVVM/mvvm-base.md',
                    ]
                },
                {
                    title: 'React',
                    children: [
                        '/Question-Bank/react/element-component-instance-node',
                        '/Question-Bank/react/SFC',
                        '/Question-Bank/react/react-handle-this',
                        '/Question-Bank/react/component-classify.md',
                        '/Question-Bank/react/react-reuse.md',
                        '/Question-Bank/react/withClock',
                        '/Question-Bank/react/lifecycle',
                        '/Question-Bank/react/Student',
                        '/Question-Bank/react/jsx-render',
                        '/Question-Bank/react/react-event.md',
                        '/Question-Bank/react/setState.md',
                        '/Question-Bank/react/react-virtual-dom.md',
                        '/Question-Bank/react/refs.md',
                        '/Question-Bank/react/children.md',
                        '/Question-Bank/react/mobx.md',
                        '/Question-Bank/react/fiber.md',
                        '/Question-Bank/react/react-other-points.md',
                        '/Question-Bank/react/react-router-dom',
                        '/Question-Bank/react/declare-react-router',
                        '/Question-Bank/react/react-hooks.md',
                        '/Question-Bank/react/react-performance.md',
                        '/Question-Bank/react/function-vs-class.md',
                        '/Question-Bank/react/black-magic-of-hooks.md',
                        '/Question-Bank/react/time-console',
                    ]
                },
                {
                    title: 'Vue',
                    children: [
                        '/Question-Bank/vue/vue-base',
                        '/Question-Bank/vue/vue-router',
                        '/Question-Bank/vue/vuex',
                        '/Question-Bank/vue/watch',
                        '/Question-Bank/vue/listeners-and-attrs',
                        '/Question-Bank/vue/customized-v-model',
                        '/Question-Bank/vue/v-loadmore',
                        '/Question-Bank/vue/v-search-select',
                        '/Question-Bank/vue/v-infinite-scroll',
                    ]
                },
                {
                    title: 'Nodejs',
                    children: [
                        '/Question-Bank/nodejs/eventEmitter',
                        '/Question-Bank/nodejs/nodejs-base',
                        '/Question-Bank/nodejs/nodejs-myblog-imooc',
                    ]
                },
                {
                    title: '包管理 Npm & Yarn',
                    children: [
                        '/Question-Bank/pkgmanage/package.lock.json',
                    ]
                },
                {
                    title: 'Webpack',
                    children: [
                        '/Question-Bank/webpack/babel',
                        '/Question-Bank/webpack/webpack-base',
                        '/Question-Bank/webpack/loader-sequence',
                        '/Question-Bank/webpack/source-map',
                        '/Question-Bank/webpack/chunkhash',
                        '/Question-Bank/webpack/code-splitting',
                        '/Question-Bank/webpack/watch',
                        '/Question-Bank/webpack/HMR',
                        '/Question-Bank/webpack/building-speed-up',
                        '/Question-Bank/webpack/webpack-tricks',
                    ]
                },
                {
                    title: 'Git',
                    children: [
                        '/Question-Bank/git/base',
                        '/Question-Bank/git/git-stash',
                        '/Question-Bank/git/git-bisect',
                    ]
                },
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
                        '/Question-Bank/work-practices/product-quality',
                        '/Question-Bank/work-practices/eleMessage',
                        '/Question-Bank/work-practices/mobx-cases',
                        '/Question-Bank/work-practices/windowInject',
                        '/Question-Bank/work-practices/deepcss',
                        '/Question-Bank/work-practices/css-module',
                        '/Question-Bank/work-practices/virtual-scroll',
                    ]
                },
                {
                    title: 'PWA',
                    children: [
                        '/Wanted/pwa',
                    ]
                }
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
                        '/Question-Bank/execution/asynchronous-async&await',
                        '/Question-Bank/browser/process-eventloop',
                    ]
                }
            ],
            '/Algorithm/': [
                '/Algorithm/',
                {
                    title: '链表',
                    children: [
                        '/Algorithm/Linked-List/',
                        '/Algorithm/Linked-List/sortList.md',
                        '/Algorithm/Linked-List/print-from-tail-to-head',
                        '/Algorithm/Linked-List/reverse-linked-list',
                        '/Algorithm/Linked-List/merge-two-sorted-link',
                        '/Algorithm/Linked-List/entry-node-of-loop',
                        '/Algorithm/Linked-List/find-first-common-node',
                        '/Algorithm/Linked-List/find-Kth-to-tail',
                        '/Algorithm/Linked-List/delete-repeat-node',
                        '/Algorithm/Linked-List/copy-complicated-linked-list',
                    ]
                },
                {
                    title: '树和二叉树',
                    children: [
                        '/Algorithm/Tree-and-Binary-Tree/',
                        '/Algorithm/Tree-and-Binary-Tree/inorder-traversal',
                        '/Algorithm/Tree-and-Binary-Tree/preorder-traversal',
                        '/Algorithm/Tree-and-Binary-Tree/postorder-traversal',
                        '/Algorithm/Tree-and-Binary-Tree/levelOrder-traversal',
                        '/Algorithm/Tree-and-Binary-Tree/reconstruct-binary-tree',
                        '/Algorithm/Tree-and-Binary-Tree/get-HRD',
                        '/Algorithm/Tree-and-Binary-Tree/is-symmetrical',
                        '/Algorithm/Tree-and-Binary-Tree/mirror',
                        '/Algorithm/Tree-and-Binary-Tree/generate-BST',
                        '/Algorithm/Tree-and-Binary-Tree/isValidBST',
                        '/Algorithm/Tree-and-Binary-Tree/kth-node',
                        '/Algorithm/Tree-and-Binary-Tree/verify-squence-of-BST',
                        '/Algorithm/Tree-and-Binary-Tree/max-depth',
                        '/Algorithm/Tree-and-Binary-Tree/min-depth',
                        '/Algorithm/Tree-and-Binary-Tree/is-balanced',
                    ]
                },
                {
                    title: '排序',
                    children: [
                        '/Algorithm/Sort/',
                        '/Algorithm/Sort/firstMissingPositive.md',
                        '/Algorithm/Sort/fast-sort.md',
                        '/Algorithm/Sort/selection-sort.md',
                        '/Algorithm/Sort/shell-sort.md',
                    ]
                },
                {
                    title: '正则',
                    children: [
                        '/Algorithm/Reg/',
                        '/Algorithm/Reg/repeatedSubstringPattern.md',
                        '/Algorithm/Reg/isMatch.md',
                    ]
                },
                {
                    title: '字符串',
                    children: [
                        '/Algorithm/String/',
                        '/Algorithm/String/revertByWord.md',
                        // '/Algorithm/String/countBinarySubstrings.md)',
                    ]
                },
                {
                    title: '数组',
                    children: [
                        '/Algorithm/Array/',
                        '/Algorithm/Array/letterCombinations.md',
                        '/Algorithm/Array/canPlaceFlowers.md',
                        '/Algorithm/Array/hasGroupsSizeX.md',
                        '/Algorithm/Array/grayCode.md',
                    ]
                },
                {
                    title: '栈',
                    children: [
                        '/Algorithm/Stack/',
                        '/Algorithm/Stack/calPoints.md',
                        '/Algorithm/Stack/maximalRectangle.md',
                        '/Algorithm/Stack/largestRectangleArea.md',
                    ]
                },
                {
                    title: '队列',
                    children: [
                        '/Algorithm/Queue/',
                        '/Algorithm/Queue/MyCircularQueue.md',
                        '/Algorithm/Queue/leastInterval.md',
                    ]
                },
                {
                    title: '递归',
                    children: [
                        '/Algorithm/Recursion/',
                        '/Algorithm/Recursion/hanota.md',
                        '/Algorithm/Recursion/restoreIpAddresses.md',
                    ]
                },
                {
                    title: '贪心算法',
                    children: [
                        '/Algorithm/Greedy/',
                        '/Algorithm/Greedy/maxProfit',
                        '/Algorithm/Greedy/maxProfit2',
                        '/Algorithm/Greedy/lemonadeChange',
                    ]
                },
                {
                    title: '动态规划',
                    children: [
                        '/Algorithm/DP/',
                        '/Algorithm/DP/uniquePaths',
                        '/Algorithm/DP/uniquePaths2',
                        '/Algorithm/DP/minimumTriangle',
                        '/Algorithm/DP/findCheapestPrice',
                    ]
                },
            ],
            '/Replay/': [
                '/Replay/',
                {
                    title: 'H5改版复盘',
                    children: [
                        '/Replay/H5-revision/',
                        '/Replay/H5-revision/wyk',
                    ]
                },
                {
                    title: '汇盛保险系统一期复盘',
                    children: [
                        '/Replay/Horizonus-1/',
                        '/Replay/Horizonus-1/sjb',
                        '/Replay/Horizonus-1/johninch',
                    ]
                },
            ],
            '/FullStackDeveloper/': [
                '/FullStackDeveloper/',
                {
                    title: 'Vue',
                    children: [
                        '/FullStackDeveloper/vue/1_pre_vue_componential',
                        '/FullStackDeveloper/vue/1_vue_componential',
                        '/FullStackDeveloper/vue/2_vue_family',
                        '/FullStackDeveloper/vue/3_make_vue',
                    ]
                },
                {
                    title: 'NodeJS',
                    children: [
                        '/FullStackDeveloper/node/1_base',
                        '/FullStackDeveloper/node/1_1_Cli',
                        '/FullStackDeveloper/node/2_Koa',
                        '/FullStackDeveloper/node/3_network_program',
                        '/FullStackDeveloper/node/4_mysql',
                        '/FullStackDeveloper/node/5_MongoDB',
                        '/FullStackDeveloper/node/6_auth',
                        '/FullStackDeveloper/node/6_1_auth',
                        '/FullStackDeveloper/node/7_eggjs',
                        '/FullStackDeveloper/node/8_eggjs_project',
                        '/FullStackDeveloper/node/9_ts_decorate',
                        '/FullStackDeveloper/node/10_node_deploy_nginx_pm2_docker',
                        '/FullStackDeveloper/node/11_middle_tier',
                        '/FullStackDeveloper/node/12_serverless',
                        '/FullStackDeveloper/node/13_eventloop',
                    ]
                },
                {
                    title: 'Webpack',
                    children: [
                        '/FullStackDeveloper/webpack/1_basic_conf',
                        '/FullStackDeveloper/webpack/2_advance_usage',
                        '/FullStackDeveloper/webpack/3_product_training',
                        '/FullStackDeveloper/webpack/4_performance_optimization',
                        '/FullStackDeveloper/webpack/5_webpack_principle',
                        '/FullStackDeveloper/webpack/6_make_loader',
                        '/FullStackDeveloper/webpack/7_writing-a-plugin',
                    ]
                },
                {
                    title: '项目',
                    children: [
                        '/FullStackDeveloper/project/1',
                    ]
                },
            ],
            '/Mark/': [
                {
                    title: 'Johninch',
                    children: [
                        '/Mark/johninch/base',
                        '/Mark/johninch/promise',
                        '/Mark/johninch/coding',
                        '/Mark/johninch/leetcode',
                        '/Mark/johninch/project',
                        '/Mark/johninch/lib/react',
                        '/Mark/johninch/lib/vue',
                        '/Mark/johninch/lib/webpack',
                    ]
                },
            ],
        }
    },
    plugins: [
        ['flowchart'],  // 支持流程图
        // [
        //     '@vuepress-reco/vuepress-plugin-bgm-player',  // BGM播放器
        //     {
        //         audios: [
        //             {name: 'Faster Than Light',artist: 'Andreas Waldetoft / Mia Stegmar',url: 'https://cdn-image.tsanfer.xyz/music/Andreas%20Waldetoft%2CMia%20Stegmar%20-%20Faster%20Than%20Light.mp3',cover: 'https://p1.music.126.net/Gxv6d9W4Yd9q9WNHPpi8rw==/1379887104073348.jpg'},
        //             {name: 'Dawn',artist: 'DDRKirby(ISQ)',url: 'https://cdn-image.tsanfer.xyz/music/Dawn%20-%20DDRKirby%28ISQ%29.mp3',cover: 'https://p2.music.126.net/IPnqMCk8YaN9inwYV2bdgQ==/18774161044446693.jpg'},
        //             {name: 'TRON Legacy (End Titles)',artist: 'Daft Punk',url: 'https://cdn-image.tsanfer.xyz/music/Daft%20Punk%20-%20TRON%20Legacy%20%28End%20Titles%29.mp3',cover: 'https://p2.music.126.net/qOOTIykbSLw9RHB0vI83GA==/737772302281958.jpg'},
        //             {name: 'Broken Boy',artist: 'Tonspender',url: 'https://cdn-image.tsanfer.xyz/music/Tonspender%20-%20Broken%20Boy.flac',cover: 'https://p2.music.126.net/4TnTRyHqa3-D2H1UnOa00w==/109951163666994621.jpg'},
        //             {name: 'Life Of Sin Pt. 4',artist: 'MitiS',url: 'https://cdn-image.tsanfer.xyz/music/MitiS%20-%20Life%20Of%20Sin%20Pt.%204.mp3',cover: 'https://p2.music.126.net/LmjTrSwvSLSNBsfFsQFO6g==/2533274793491743.jpg'},
        //             {name: 'Sea Of Voices (RAC Mix)',artist: 'Porter Robinson',url: 'https://cdn-image.tsanfer.xyz/music/Porter%20Robinson%20-%20Sea%20Of%20Voices%20%28RAC%20Mix%29.mp3',cover: 'https://p1.music.126.net/zjQROkEUokU7iS5eUvnVZQ==/3264450027161111.jpg'},
        //             {name: 'New Lipstick',artist: 'The Kissaway Trail',url: 'https://cdn-image.tsanfer.xyz/music/The%20Kissaway%20Trail%20-%20New%20Lipstick.flac',cover: 'https://p2.music.126.net/VjN74c1hoYgPCEZ9DngeQw==/109951163772624643.jpg'},
        //         ],
        //         floatPosition: 'left'
        //     },
        // ],
        [
            'vuepress-plugin-container',
            {
                type: 'right',
                defaultTitle: '',
            },
        ],
        [
            'vuepress-plugin-container',
            {
                type: 'theorem',
                before: info => `<div class="theorem"><p class="title">${info}</p>`,
                after: '</div>',
            },
        ],
        [
            'vuepress-plugin-helper-live2d', {
                live2d: {
                    // 是否启用(关闭请设置为false)(default: true)
                    enable: true,
                    // 模型名称(default: hibiki)>>>取值请参考：
                    // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
                    model: 'hijiki',
                    display: {
                        position: "right", // 显示位置：left/right(default: 'right')
                        width: 290, // 模型的长度(default: 135)
                        height: 400, // 模型的高度(default: 300)
                        hOffset: 10, //  水平偏移(default: 65)
                        vOffset: -20, //  垂直偏移(default: 0)
                    },
                    mobile: {
                        show: false // 是否在移动设备上显示(default: false)
                    },
                    react: {
                        opacity: 0.9 // 模型透明度(default: 0.8)
                    }
                }
            }
        ],
        ['@vuepress/back-to-top'],
        ['vuepress-plugin-smooth-scroll'],  // 平滑滚动
        ['@vuepress/nprogress'],  // 加载进度条
        ['reading-progress'],  // 阅读进度条
        ['@vuepress/plugin-medium-zoom', { // Note: This is not @vuepress/medium-zoom
            selector: '.theme-default-content img',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        }],
        ['@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        }]

    ]
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@public': 'docs/.vuepress/public'
    //         }
    //     }
    // }
}