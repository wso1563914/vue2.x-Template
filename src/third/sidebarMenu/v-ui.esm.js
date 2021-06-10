function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".sidebar-menu {\n  position: relative;\n  height: 100%;\n  padding-bottom: 40px;\n  box-sizing: border-box;\n  overflow: hidden;\n  box-shadow: 2px 0 6px 0 rgba(6, 25, 41, 0.07); }\n  .sidebar-menu .gem-sidebar-menu {\n    position: relative;\n    width: 210px;\n    height: 100%;\n    overflow: auto;\n    border-right: 0; }\n    .sidebar-menu .gem-sidebar-menu .el-submenu.is-active .el-submenu__title .menuicon {\n      color: var(--elmenu-active-text-color); }\n    .sidebar-menu .gem-sidebar-menu .el-submenu.is-active .el-submenu__title > span {\n      color: var(--elmenu-active-text-color); }\n    .sidebar-menu .gem-sidebar-menu .el-submenu .el-submenu__title {\n      height: 50px;\n      line-height: 50px; }\n    .sidebar-menu .gem-sidebar-menu .el-submenu__title:hover {\n      background: var(--elmenu-background); }\n    .sidebar-menu .gem-sidebar-menu .menuicon {\n      font-size: 16px;\n      margin-right: 8px; }\n    .sidebar-menu .gem-sidebar-menu .el-menu .el-menu-item {\n      height: 40px;\n      line-height: 40px;\n      padding-left: 48px !important; }\n      .sidebar-menu .gem-sidebar-menu .el-menu .el-menu-item:hover {\n        background: var(--elmenu-background); }\n      .sidebar-menu .gem-sidebar-menu .el-menu .el-menu-item.is-active {\n        background: var(--elmenu-background); }\n      .sidebar-menu .gem-sidebar-menu .el-menu .el-menu-item span {\n        font-weight: 700; }\n    .sidebar-menu .gem-sidebar-menu.el-menu--collapse {\n      width: 48px; }\n      .sidebar-menu .gem-sidebar-menu.el-menu--collapse .el-submenu__title {\n        padding-left: 16px !important;\n        padding-right: 16px; }\n  .sidebar-menu .menu-collapse {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 40px;\n    padding: 0 18px;\n    border-top: 1px solid #eaeef2;\n    box-sizing: border-box;\n    background: #fff; }\n    .sidebar-menu .menu-collapse .mc-icon {\n      display: inline-block;\n      margin: 12px 0; }\n      .sidebar-menu .menu-collapse .mc-icon img {\n        width: 16px;\n        height: 16px; }\n";
styleInject(css);

// import { Component, Vue, Prop } from 'vue-property-decorator';
    // interface menuItem {
    //     path: string; // 路由的path
    //     name: string; // 路由的name
    //     children: any[]; // 路由的children
    //     title: string; // 路由的名称
    //     [key: string]: any;
    // }
    var SidebarMenu = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"sidebar-menu",style:(_vm.menuCssVar)},[_c('el-menu',{ref:"sidebarMenuRef",staticClass:"gem-sidebar-menu",attrs:{"default-active":_vm.defaultMenu,"collapse":_vm.isCollapse,"router":false,"active-text-color":_vm.activeTextColor,"text-color":"#61677A","unique-opened":""},on:{"select":_vm.handleSelect}},_vm._l((_vm.menuList),function(item,i){return _c('el-submenu',{key:i,attrs:{"index":item.path}},[_c('template',{slot:"title"},[_c('img',{staticClass:"menuicon",attrs:{"src":item.icon,"onerror":_vm.defaultIcon}}),_vm._v(" "),_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(item.title))])]),_vm._v(" "),_vm._l((item.children),function(el,j){return _c('el-menu-item',{key:j,attrs:{"index":el.path}},[_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(el.title))])])})],2)}),1)],1)},
staticRenderFns: [],
        name: 'SidebarMenu',
        data() {
            return {
                defaultMenu: '',
                isCollapse: false,
                defaultIcon: `this.src="${require('./icon/placeholder.png')}";this.onerror=null`,
            };
        },
        computed: {
            // 设置css变量
            menuCssVar() {
                return {
                    '--elmenu-background': this.activeBg,
                    '--elmenu-active-text-color': this.activeTextColor,
                };
            },
        },
        props: {
            defaultActiveMenu: {
                // 默认激活的菜单
                type: String,
                default: '',
            },
            menuList: {
                type: Array,
                default: () => [],
            },
            activeTextColor: String,
            activeBg: String,
        },
        watch: {
            menuList(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.initMenu();
                }
            },
            $route(val) {
                this.defaultMenu = val.path.substr(1);
            },
        },
        created() {
            this.initMenu();
        },
        methods: {
            initMenu() {
                let path = this.defaultActiveMenu ? this.defaultActiveMenu : this.menuList[0].children[0].path,
                    { parentPath, menuItem } = this.getCurrentMenuItem(path);
                this.routerChange(path);
                this.$emit('click', { path: path, parentPath, menuItem });
            },
            handleSelect(path) {
                if (path === this.$route.path.substr(1)) {
                    return;
                }
                let { parentPath, menuItem } = this.getCurrentMenuItem(path);
                this.$router.push(path);

                // 输出的menuItem
                // interface menuItem {
                //     path: string; // 当前三级menu的path
                //     parentPath: string; // 当前二级的的path
                //     menuItem: menuItem; // 当前三级menu的menuItem
                // }
                this.$emit('click', { path, parentPath, menuItem });
            },
            hadleCollapse() {
                this.isCollapse = !this.isCollapse;
            },

            getCurrentMenuItem(path) {
                let m = null,
                    p = '';
                this.menuList.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(ele => {
                            if (ele.path === path) {
                                p = item.path;
                                m = ele;
                            }
                        });
                    }
                });
                return { parentPath: p, menuItem: m };
            },

            routerChange(path, cb) {
                if (path !== this.$route.path.substr(1)) {
                    this.$router.push(path);
                    if (cb && typeof cb === 'function') {
                        cb();
                    }
                }
            },
        },
    };

SidebarMenu.install = function (Vue) {
  Vue.component(SidebarMenu.name, SidebarMenu);
};

// import TopMenu from './lib/TopMenu/index';
// import UserDropdown from './lib/TopMenu/index2';

var components = [SidebarMenu // ISidebarMenu,
// TopMenu,
// UserDropdown,
],
    install = function install(Vue) {
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
};
var index = {
  install: install
};

export default index;
export { SidebarMenu };
