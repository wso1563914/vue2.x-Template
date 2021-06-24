!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.publib=e():t.publib=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";function o(t,e,n,o,r,s,i,c){var a,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),o&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),i?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=a):r&&(a=c?function(){r.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:r),a)if(u.functional){u._injectStyles=a;var l=u.render;u.render=function(t,e){return a.call(e),l(t,e)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,a):[a]}return{exports:t,options:u}}n.d(e,"a",(function(){return o}))},,function(t,e,n){"use strict";n.r(e),n.d(e,"TopMenu",(function(){return c})),n.d(e,"UserDropdown",(function(){return m})),n.d(e,"UserDropdownIView",(function(){return v}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-top-menu reset"},[n("div",{staticClass:"logo-box",on:{click:t.logoClick}},[t.logo?n("img",{attrs:{src:t.logo,alt:t.alt}}):[t._t("logo")]],2),n("div",{staticClass:"menu-box"},[n("ul",t._l(t.topMenuList,(function(e,o){return n("li",{key:o,class:{active:t.actived==e.name},on:{click:function(n){return t.firstRouteClick(e.name,e)}}},[n("span",[t._v(t._s(e.title))])])})),0)]),n("div",{staticClass:"info-box"},[t._t("otherIcon")],2)])};o._withStripped=!0;var r={name:"TopMenu",model:{prop:"actived",event:"on-active-change"},props:{logo:{type:String||Object},alt:{type:String,default:""},topMenuList:{type:Array,default:function(){return[]}},actived:{type:String,default:""}},methods:{logoClick:function(){this.$emit("logoClick")},firstRouteClick:function(t,e){this.$emit("on-active-change",t),this.$emit("on-menu-click",{path:t,menuItem:e})}}},s=n(0),i=Object(s.a)(r,o,[],!1,null,null,null);i.options.__file="packages/MenuSuits/src/TopMenu/TopMenu.vue";var c=i.exports,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dropdown",{staticClass:"top-dropdown",on:{command:t.dropDownClick}},[n("div",{staticClass:"username"},[n("img",{staticClass:"menu-user-head",attrs:{src:t.avaSrc}}),n("span",[t._v(t._s(t.userInfo.name))])]),n("el-dropdown-menu",{staticClass:"top-dropdown-menu",attrs:{slot:"dropdown"},slot:"dropdown"},[t.userInfo.phone?n("el-dropdown-item",{staticClass:"dr-photo"},[t._v(t._s(t.userInfo.phone))]):t._e(),t.commandList.length>0?t._l(t.commandList,(function(e,o){return n("el-dropdown-item",{key:o,staticClass:"dr-normal",attrs:{command:e.command}},[e.isFont?n("i",{class:[e.icon,"ic"]}):n("img",{attrs:{src:t.getIconSrc(e)}}),n("span",[t._v(t._s(e.name))])])})):t._e(),n("el-dropdown-item",{staticClass:"dr-out",attrs:{command:"logout"}},[n("img",{attrs:{src:t.exitIconSrc,alt:""}}),n("span",[t._v("退出登录")])])],2)],1)};a._withStripped=!0;var u="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAslJREFUOBGtVUtPE1EUvvfOtEqhxRYrlUdRimTKa1NJjBqNUbowkhgXiC7cuPVH8BdM3LpxI3ZlIokRRSUGKCChCRpqfIFQHiItFDt0ysxc75lw25kJRI3Ooudxz/fl3HPPOcVojy8WiwmyelBCgiBRSmsQRm4jjKItjPES0rSkS8wne3p6NDsc2x0P+gfCGqJRnSKv/cxsE4wyAsKDt3qvzJr9RcK+vj5SL0UuIYpOmwN+q2M0upCcesHwOsSKHLAfGSEEBWurq50O0TmfWllWlB2VYwzJEmBYUAfhx8gQrrlD6XVwmD+vx+3qOt95o9xVVsNqqWqaroxNzcQ+zaUWzXGgOzB+BNfH8AA5vezOXjXrjp69dsDhdD97He+X89uFi2c6u474fS0PHz+/q2kaNZNCTcvJ9j0Cr7kXGQSzDJtmP8692crJCsPT4XhiyCEKntrAYb+ZDHTgAC4CrWE/5Laq67LbXVbJbW9lhYe1Df7J0uU+i2RcotFnFm/JmF9YmmhuDEYFIjoURZFPHK87t57ZnE1nNrdKUSUNuESjaS3VKAWMTM5M6LquBWsDEUIE53p648PweOJVKcKmsQEoto3tCPm8le5j9YEgu7b2hWXKzzvCoZbVtfTKt9Tqd+4zS5E1MqRfZXZKoYaGU5HWm6xP8qqqWepFMBbapVDV56+poeHx6REzDrhEYzYptRC2tYQurP7IzDx9OTZgAewaJzuktvZw6Gp8+n1cKRSK8wxcBAbdDhIJccrb+U27n9vZbG6DgdlTEWvJGJcIW4M1dsbci3OLK2/ZtS8f8lQcLeyoMicCKbDX8Xk9zWvpjXe5XF7hZ9DYLiGf3Hf0WqXGUF3A38Rm2cFBhqRIz2Szy5OJZMI8LcXR48H3+59E/3rTcDDbOLd7u43lQLgPVhDryVFu/7HcXV88vrgPueO/LVhOCPJf/gJ+AS+fRsnmttClAAAAAElFTkSuQmCC",l="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATAQMAAABInqSPAAAAAXNSR0IArs4c6QAAAANQTFRF5+3ys7TlbgAAAAxJREFUCNdjYKAeAAAATAABn0wXMwAAAABJRU5ErkJggg==",d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsklEQVQ4T6WTv0scURDHv7MLR/4AQQsLOzEIFl6pFoII7jtERPStIu7eGZLKQiwsgrYhpBELQe9WNLcrhBD19g781ahFClMINpYBCxXtg3BvZDdsOC/nueA0D+bH531n3jzCK43q1WfzhcUgnh5PhWctewLIeoUhKHREBdUAxysuAPhtSWM9gv0DOJ7fzUCJCLY1Jr4FCdWAtS2/nZgPNdCIJcVJkBMCgoDOtA3i+ai4FiDw5dxSL0htKkJ/ZkxchICcW/jEOt2mR8WXyj6fm0HW9WcBJNOmkH8Bnv+TmD5apnEQ51Ect9jHxPu2FBQB7stcfjttDt7EAay6O4066deVgOtEQktODA9cxQF8/V5qfnhQZ7YUTaECxyvugXitcoD1QM6WPwKmjCWN/qiFzwRqtKQxGUeB4xU3GHxjSzEXAly30PCH6JII719SEdzOjJU3zK2mmbqrXqRjTSE5NS5+1VKynvc7lYYzAnqeLFKUnPV2pwjaMoC8gjrVUQ63rQy9W4PWBeAdQDO2NJb+W+XI4Xg/WpgSHwhoY+ZOADqBzhXzJRPvZGTqqFJd3d8YZ6CPXCW1EcOahc4AAAAASUVORK5CYII=",p={name:"UserDropdown",computed:{avaSrc:function(){return this.userInfo.img?this.userInfo.img:u},exitIconSrc:function(){return d}},props:{userInfo:{type:Object,default:function(){return{name:"欢迎",phone:"",img:""}}},commandList:{type:Array,default:function(){return[]}}},methods:{dropDownClick:function(t){this.$emit("click",t)},getIconSrc:function(t){return t.icon?t.icon:l}}},f=Object(s.a)(p,a,[],!1,null,null,null);f.options.__file="packages/MenuSuits/src/TopMenu/UserDropdown.vue";var m=f.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Dropdown",{staticClass:"top-dropdown",attrs:{transfer:""},on:{"on-click":t.dropDownClick}},[n("div",{staticClass:"username"},[n("img",{staticClass:"menu-user-head",attrs:{src:t.avaSrc}}),n("span",[t._v(t._s(t.userInfo.name))])]),n("DropdownMenu",{staticClass:"top-dropdown-menu",attrs:{slot:"list"},slot:"list"},[t.userInfo.phone?n("DropdownItem",{staticClass:"dr-photo"},[t._v(t._s(t.userInfo.phone))]):t._e(),t.commandList.length>0?t._l(t.commandList,(function(e,o){return n("DropdownItem",{key:o,staticClass:"dr-normal",attrs:{name:e.command}},[e.isFont?n("i",{class:[e.icon,"ic"]}):n("img",{attrs:{src:t.getIconSrc(e)}}),n("span",[t._v(t._s(e.name))])])})):t._e(),n("DropdownItem",{staticClass:"dr-out",attrs:{name:"logout"}},[n("img",{attrs:{src:t.exitIconSrc}}),n("span",[t._v("退出登录")])])],2)],1)};A._withStripped=!0;var g={name:"UserDropdown",computed:{avaSrc:function(){return this.userInfo.img?this.userInfo.img:u},exitIconSrc:function(){return d},placeholderSrc:function(){return l}},props:{userInfo:{type:Object,default:function(){return{name:"欢迎",phone:"",img:""}}},commandList:{type:Array,default:function(){return[]}}},methods:{dropDownClick:function(t){this.$emit("click",t)},getIconSrc:function(t){return t.icon?t.icon:l}}},h=Object(s.a)(g,A,[],!1,null,null,null);h.options.__file="packages/MenuSuits/src/TopMenu/UserDropdownIView.vue";var v=h.exports}])}));