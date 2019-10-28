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
                        '/Question-Bank/basic-grammar/flatten-array',
                        '/Question-Bank/basic-grammar/deep-clone',
                        '/Question-Bank/basic-grammar/deep-query',
                        '/Question-Bank/basic-grammar/chain-methods',
                        '/Question-Bank/basic-grammar/callback-hell'
                    ]
                },
                {
                    title: '前端性能',
                    children: [
                        '/Question-Bank/performance/memory-or-disk-cache',
                    ]
                },
                // {
                //     title: '正则表达式',
                //     children: [
                //         '/Question-Bank/regular-expression/查找',
                //         '/Question-Bank/regular-expression/二维数组查找',
                //         '/Question-Bank/regular-expression/旋转数组的最小数字',
                //         '/Question-Bank/regular-expression/在排序数组中查找数字',
                //     ]
                // },
                // {
                //     title: '类与继承',
                //     children: [
                //         '/Question-Bank/class-extends/查找',
                //         '/Question-Bank/class-extends/二维数组查找',
                //         '/Question-Bank/class-extends/旋转数组的最小数字',
                //         '/Question-Bank/class-extends/在排序数组中查找数字',
                //     ]
                // },
                // {
                //     title: 'ES6 & ESnext',
                //     children: [
                //         '/Question-Bank/ESnext/查找',
                //         '/Question-Bank/ESnext/二维数组查找',
                //         '/Question-Bank/ESnext/旋转数组的最小数字',
                //         '/Question-Bank/ESnext/在排序数组中查找数字',
                //     ]
                // },
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
                        '/Question-Bank/react/element-component-instance-node'
                    ]
                },
                {
                    title: 'Vue',
                    children: [
                        '/Question-Bank/vue/customized-v-model',
                        '/Question-Bank/vue/v-loadmore',
                    ]
                },
                {
                    title: 'Nodejs',
                    children: [
                        '/Question-Bank/nodejs/eventEmitter',
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
                    title: '第二期 待定',
                    path: '/Wanted/pending'
                }
            ],
            '/Quest-SC': [
                {
                    title: '第一期'
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
                }
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