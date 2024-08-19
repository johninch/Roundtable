(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{624:function(t,e,r){"use strict";r.r(e);var a=r(14),_=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"进阶算法-贪心算法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#进阶算法-贪心算法"}},[t._v("#")]),t._v(" 进阶算法-贪心算法")]),t._v(" "),r("p",[t._v("贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的是在某种意义上的局部最优解。")]),t._v(" "),r("p",[t._v("贪心算法不是对所有问题都能得到整体最优解，"),r("strong",[r("code",[t._v("关键是贪心策略的选择")])]),t._v("，选择的贪心策略**"),r("code",[t._v("必须具备无后效性")]),t._v("**，即某个状态以前的过程不会影响以后的状态，只与当前状态有关。")]),t._v(" "),r("p",[t._v("注意："),r("code",[t._v("贪心算法需要针对不同的case选择不同的策略，不一定你选择的策略就是最贪的，即使不是最贪策略，也不能说当前的贪心策略不对，贪心策略需要大量的数据去验证和迭代，逼近最优解。所以贪心，关键是一种算法思想。")])]),t._v(" "),r("h2",{attrs:{id:"_1、最大利润"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1、最大利润"}},[t._v("#")]),t._v(" 1、最大利润")]),t._v(" "),r("ol",[r("li",[t._v("策略1：从最低点买入，在最高点卖出（追求单次利益）；")]),t._v(" "),r("li",[t._v("策略2：从低点买入，只要可以赚钱就卖出；不断买卖（追求多次利益，单次利益不够）；")]),t._v(" "),r("li",[t._v("策略3：从低点买入，到价格高点卖出，不断买卖（在保证单次利益的基础上，实现多次交易）；")])]),t._v(" "),r("p",[t._v("前两种策略都不够贪，3最贪。")]),t._v(" "),r("ul",[r("li",[r("RouterLink",{attrs:{to:"/Algorithm/Greedy/maxProfit.html"}},[t._v("买卖股票的最佳时机")])],1),t._v(" "),r("li",[r("RouterLink",{attrs:{to:"/Algorithm/Greedy/maxProfit2.html"}},[t._v("买卖股票的最佳时机 II")])],1)]),t._v(" "),r("p",[t._v("股票买卖问题也可以参考动态规划公式来求解：\n"),r("a",{attrs:{href:"https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/yi-ge-fang-fa-tuan-mie-6-dao-gu-piao-wen-ti-by-l-3/",target:"_blank",rel:"noopener noreferrer"}},[t._v("动态规划 DP-table 公式"),r("OutboundLink")],1)]),t._v(" "),r("h2",{attrs:{id:"_2、找零钱"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2、找零钱"}},[t._v("#")]),t._v(" 2、找零钱")]),t._v(" "),r("ol",[r("li",[t._v("策略1：给钱找零，不区分金额直到找到足够的金钱（追求单次找零）；")]),t._v(" "),r("li",[t._v("策略2：给钱找零，优先给金额大的零钱，尽量把零钱放在手里（追求多次找零）；")])]),t._v(" "),r("p",[t._v("策略2更贪，因为可以保留更多零钱在手里。")]),t._v(" "),r("ul",[r("li",[r("RouterLink",{attrs:{to:"/Algorithm/Greedy/lemonadeChange.html"}},[t._v("柠檬水找零")])],1)])])}),[],!1,null,null,null);e.default=_.exports}}]);