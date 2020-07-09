# johninch：汇盛保险系统一期复盘

```
$ tree -CI "node_modules"

.
├── README.md
├── app
│   ├── assets
│   │   └── css
│   │       ├── _button.scss
│   │       ├── _dropdown.scss
│   │       ├── _form.scss
│   │       ├── _functions.scss
│   │       ├── _modal.scss
│   │       ├── _table.scss
│   │       ├── _tabs.scss
│   │       └── index.scss
│   ├── common // common目录到底应该承载哪些东西，如果像当前只有一个tools的话，可以直接放在utils中
│   │   └── tools
│   │       ├── index.tsx // 只有一个downloadSuccess工具函数
│   │       └── map.tsx // 列出了系统部分使用的 对象映射，是否可以考虑使用 Map数据结构来替换
│   ├── components
│   │   ├── AnimatedRouter
│   │   │   └── index.ts
│   │   ├── AntdDate
│   │   │   ├── Calendar.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── TimePicker.tsx
│   │   │   └── index.tsx
│   │   ├── Charts
│   │   │   ├── index.tsx
│   │   │   ├── style.scss
│   │   │   └── theme
│   │   │       └── tiger.theme.json
│   │   ├── ConfirmWithIcon
│   │   │   └── index.tsx
│   │   ├── Debug
│   │   │   └── index.tsx
│   │   ├── ErrorBox
│   │   │   └── index.tsx
│   │   ├── FileList
│   │   │   ├── index.tsx
│   │   │   └── styles.module.scss
│   │   ├── HTML
│   │   │   └── index.tsx
│   │   ├── HostSwitch
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── Icomoon
│   │   │   └── index.tsx
│   │   ├── Loading
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── Memo
│   │   │   └── index.tsx
│   │   ├── ModalFilter
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── MyDrawer
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── MyForm
│   │   │   └── index.tsx
│   │   ├── MyUpload
│   │   │   └── index.tsx
│   │   ├── NiceButton
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── Nodata
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── Notes
│   │   │   ├── index.tsx
│   │   │   └── styles.module.scss
│   │   ├── Portal
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── PreviewBox
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── Select
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   ├── TextButton
│   │   │   ├── index.tsx
│   │   │   └── styles.module.scss
│   │   ├── Title
│   │   │   └── index.tsx
│   │   ├── Toast
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   ├── TodoList
│   │   │   ├── index.tsx
│   │   │   └── style.scss
│   │   └── Transition
│   │       ├── Collspse.tsx
│   │       ├── index.tsx
│   │       ├── transition.scss
│   │       └── withTransition.tsx
│   ├── hooks
│   │   ├── useAsyncBase
│   │   │   └── index.ts
│   │   ├── useFormUnion
│   │   │   └── index.ts
│   │   ├── useMount
│   │   │   └── index.ts
│   │   ├── useStates
│   │   │   └── index.ts
│   │   ├── useTable
│   │   │   └── index.ts
│   │   ├── useUpdate
│   │   │   └── index.ts
│   │   └── useUpdateFlag
│   │       └── index.ts
│   ├── index.tsx
│   ├── modules
│   │   └── App
│   │       ├── About
│   │       │   └── index.tsx
│   │       ├── Home
│   │       │   ├── charts
│   │       │   │   ├── config.ts
│   │       │   │   ├── useIncomesChart.ts
│   │       │   │   └── useOrderChart.ts
│   │       │   ├── components
│   │       │   │   └── Summary
│   │       │   │       ├── index.tsx
│   │       │   │       └── style.scss
│   │       │   ├── index.tsx
│   │       │   ├── panel
│   │       │   │   ├── PanelCalendar
│   │       │   │   │   ├── index.tsx
│   │       │   │   │   └── style.scss
│   │       │   │   └── PanelNotice
│   │       │   │       └── index.tsx
│   │       │   └── style.scss
│   │       ├── Login
│   │       │   ├── index.tsx
│   │       │   └── style.scss
│   │       ├── OpenCover
│   │       │   ├── Appointment
│   │       │   │   ├── index.tsx
│   │       │   │   ├── modal
│   │       │   │   │   ├── ModalAppointmen.tsx
│   │       │   │   │   ├── ModalEditor.tsx
│   │       │   │   │   └── ModalSupplement.tsx
│   │       │   │   ├── panel
│   │       │   │   │   └── PanelButtonMore.tsx
│   │       │   │   ├── styles.module.scss
│   │       │   │   └── tableConfiger.tsx
│   │       │   ├── Management
│   │       │   │   ├── index.tsx
│   │       │   │   ├── modal
│   │       │   │   │   ├── ModalApprove.tsx
│   │       │   │   │   └── ModalBackfill.tsx
│   │       │   │   └── tableConfiger.tsx
│   │       │   ├── components
│   │       │   │   ├── Label.tsx
│   │       │   │   └── PanelUploadNote.tsx
│   │       │   ├── config.ts
│   │       │   └── modal
│   │       │       ├── DrawerOpenCover
│   │       │       │   ├── config.tsx
│   │       │       │   ├── index.tsx
│   │       │       │   ├── panel
│   │       │       │   │   ├── BeneficiaryInfoList.tsx
│   │       │       │   │   ├── ContactInfo.tsx
│   │       │       │   │   ├── HealthReport.tsx
│   │       │       │   │   ├── InsuredInfo.tsx
│   │       │       │   │   ├── PolicyInfo.tsx
│   │       │       │   │   ├── RelatedQuestions.tsx
│   │       │       │   │   ├── TrustInfo.tsx
│   │       │       │   │   ├── UserFinance.tsx
│   │       │       │   │   ├── UserOtherInfo.tsx
│   │       │       │   │   └── config.ts
│   │       │       │   └── style.scss
│   │       │       ├── ModalConfirmWithNote.tsx
│   │       │       └── ModalFileList.tsx
│   │       ├── ProgramManage
│   │       │   ├── Backfill
│   │       │   │   ├── config.tsx
│   │       │   │   ├── index.tsx
│   │       │   │   └── modal
│   │       │   │       ├── ModalUploadProgram.tsx
│   │       │   │       └── style.scss
│   │       │   ├── Design
│   │       │   │   ├── index.tsx
│   │       │   │   ├── modal
│   │       │   │   │   ├── ModalAddCustomer.tsx
│   │       │   │   │   ├── ModalAppointment.tsx
│   │       │   │   │   └── ModalDownload.tsx
│   │       │   │   ├── panel
│   │       │   │   │   ├── PanelConfirmed.tsx
│   │       │   │   │   └── PanelNotConfirm.tsx
│   │       │   │   ├── styles.module.scss
│   │       │   │   └── table
│   │       │   │       ├── tableConfirmedConfiger.tsx
│   │       │   │       └── tableNotConfirmConfiger.tsx
│   │       │   └── config.tsx
│   │       ├── Root.tsx
│   │       ├── Routes.tsx // 路由单独搞个文件夹出来
│   │       ├── config.ts
│   │       ├── index.tsx
│   │       ├── layout
│   │       │   ├── footer
│   │       │   │   ├── Copyright
│   │       │   │   │   ├── index.tsx
│   │       │   │   │   └── style.scss
│   │       │   │   └── FooterInfo.tsx
│   │       │   ├── header
│   │       │   │   ├── Breadcrumb
│   │       │   │   │   ├── index.tsx
│   │       │   │   │   └── style.scss
│   │       │   │   ├── HeaderMenu
│   │       │   │   │   └── index.tsx
│   │       │   │   └── modal
│   │       │   │       └── UpdatePassword
│   │       │   │           └── index.tsx
│   │       │   ├── index.tsx
│   │       │   ├── sider
│   │       │   │   └── Menus // Menus这一层就是多余的
│   │       │   │       ├── index.tsx
│   │       │   │       └── style.scss
│   │       │   └── style.scss
│   │       └── style.scss
│   ├── stores
│   │   ├── config.ts
│   │   ├── db.ts
│   │   ├── index.tsx
│   │   ├── ui
│   │   │   └── index.ts
│   │   └── user
│   │       └── index.ts
│   ├── types
│   │   ├── MenuItem.ts
│   │   ├── Table.ts
│   │   └── index.ts
│   └── utils
│       ├── API
│       │   ├── API.test.ts
│       │   ├── apis
│       │   │   └── ESOP.js
│       │   └── index.ts
│       ├── MyValidator
│       │   ├── index.ts
│       │   ├── patterns.ts
│       │   └── validators.ts
│       ├── TableConfiger
│       │   └── index.tsx
│       ├── URL
│       │   ├── URL.test.ts
│       │   └── index.ts
│       ├── classlist
│       │   ├── classlist.test.ts
│       │   └── index.ts
│       ├── copyMe
│       │   └── copyMe.ts
│       ├── dom
│       │   └── scroll.ts
│       ├── format
│       │   └── index.ts
│       ├── http
│       │   └── index.ts
│       ├── i18n
│       │   └── index.ts
│       ├── indexeddb
│       │   └── index.ts
│       ├── service
│       │   ├── comment.ts
│       │   ├── file.ts
│       │   ├── model
│       │   │   ├── BeneficiaryInfoModel.ts
│       │   │   ├── HealthReportModel.ts
│       │   │   ├── InsuredInfoModel.ts
│       │   │   ├── PolicyInfoModel.ts
│       │   │   ├── UserOtherInfoModel.ts
│       │   │   ├── models.ts
│       │   │   └── types.ts
│       │   ├── model.ts
│       │   ├── openCover.ts
│       │   ├── programManage.ts
│       │   └── user.ts
│       ├── serviceWorker
│       │   ├── index.js
│       │   ├── register.js
│       │   ├── style.scss
│       │   └── unregister.js
│       ├── withLoadable
│       │   └── index.tsx
│       └── withPreload
│           └── index.tsx
├── build
│   ├── index.html
│   ├── service-worker.js
│   └── static
│       ├── css
│       │   ├── 5.6e2b1ca9.css
│       │   ├── 6.1fbf68a3.css
│       │   ├── 7.411cb6f1.css
│       │   ├── 8.b4b9b77a.css
│       │   ├── index.1a5497c2.css
│       │   └── vendor.d9bb52e6.css
│       ├── images
│       │   ├── avatar.8eb2e876.png
│       │   ├── calendar-success.8a0a7e4b.png
│       │   ├── icomoon.68f8ef54.ttf
│       │   ├── icomoon.92bd1b3a.woff
│       │   ├── icomoon.acc203ca.eot
│       │   ├── icomoon.db584137.svg
│       │   ├── icon-TP.88472c3c.png
│       │   ├── icon-appointment.766c0dcc.png
│       │   ├── icon-piece.a5855b0b.png
│       │   ├── icon-plan.b1071268.png
│       │   ├── login-left-bg.df7614f0.png
│       │   ├── logo.b4dc1488.png
│       │   └── no-data.d43b3e28.png
│       └── js
│           ├── 5.ed49b128.js
│           ├── 6.a419fc1e.js
│           ├── 7.9db04bd2.js
│           ├── 8.4e081c5a.js
│           ├── _vendor_.dc30a003.js
│           ├── i18n.e8c0692a.js
│           ├── index.995d1678.js
│           ├── runtime.62bbee1a.js
│           └── vendor.897ee238.js
├── global.d.ts
├── json2service.json
├── locals
│   ├── en_US.json
│   └── zh_CN.json
├── package.json
├── public
│   ├── index.html
│   └── service-worker.js
├── report.20200623.162840.35677.0.001.json
├── report.20200623.163109.35771.0.001.json
├── report.20200623.163335.35862.0.001.json
├── report.20200623.163646.36189.0.001.json
├── report.20200623.164038.36249.0.001.json
├── report.20200623.164903.36432.0.001.json
├── report.20200623.165542.36508.0.001.json
├── report.20200623.165847.36556.0.001.json
├── scripts
│   ├── build.js
│   ├── cdn.js
│   ├── config
│   │   ├── checkMissDependencies.js
│   │   ├── env.js
│   │   ├── eslintrc.js
│   │   ├── helper.js
│   │   ├── htmlAttrsOptions.js
│   │   ├── jest
│   │   │   ├── cssTransform.js
│   │   │   └── fileTransform.js
│   │   ├── jest.config.js
│   │   ├── paths.js
│   │   ├── polyfills.js
│   │   └── webpack.config.js
│   ├── count.js
│   ├── i18n.js
│   ├── serve.js
│   ├── start.js
│   └── test.js
├── setupTests.ts
├── static
│   ├── css
│   │   ├── modules
│   │   │   ├── antd-custom.less
│   │   │   ├── antd-variables.less
│   │   │   ├── color
│   │   │   │   ├── colors.less
│   │   │   │   └── colors.scss
│   │   │   ├── effect
│   │   │   │   └── effect.scss
│   │   │   ├── size
│   │   │   │   ├── size.less
│   │   │   │   └── size.scss
│   │   │   └── variables.scss
│   │   └── vendor.less
│   ├── icons
│   │   ├── fonts
│   │   │   ├── icomoon.eot
│   │   │   ├── icomoon.svg
│   │   │   ├── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   ├── selection.json
│   │   └── style.css
│   └── img
│       ├── avatar.png
│       ├── calendar-success.png
│       ├── icon-TP.png
│       ├── icon-appointment.png
│       ├── icon-piece.png
│       ├── icon-plan.png
│       ├── login-left-bg.png
│       ├── logo.png
│       ├── no-data.png
│       ├── todo-pending.png
│       └── todo-success.png
├── static.config.json
├── tests
│   └── __mocks__
│       └── axios
│           ├── data
│           │   └── someApiData.ts
│           ├── delete.mock.ts
│           ├── get.mock.ts
│           ├── head.mock.ts
│           ├── index.ts
│           ├── patch.mock.ts
│           ├── post.mock.ts
│           ├── put.mock.ts
│           └── request.mock.ts
└── tsconfig.json
```


- 类名定义，组件定义：比如ourLogo，MyUpload，不要出现our、My这种形容方式，就是描述对象的实际意义即可


