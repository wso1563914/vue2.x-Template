<template>
  <nav class="sidebar-menu" :style="menuCssVar">
    <Menu
      ref="menuRef"
      :active-name="defaultMenu"
      :open-names="openName"
      class="gem-sidebar-menu"
      @on-select="handleSelect"
      width="210px"
      :accordion="accordion"
    >
      <Submenu v-for="(item, i) in menuList" :key="i" :name="item.name">
        <template slot="title">
          <i
            :class="['menuicon', 'iconfont', item.icon]"
            v-if="item.isFont"
          ></i>
          <img
            class="menuicon"
            :src="item.icon ? item.icon : defaultIcon"
            v-else
          />
          <span slot="title">{{ item.title }}</span>
        </template>
        <MenuItem v-for="(el, j) in item.children" :key="j" :name="el.name">
          <span>{{ el.title }}</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <!-- 收缩 -->
    <!-- <div class="menu-collapse">
            <span class="mc-icon" @click="hadleCollapse">
                <img src="./icon/collapse.png" v-if="!isCollapse" />
                <img src="./icon/expand.png" v-else />
            </span>
        </div> -->
  </nav>
</template>

<script>
// interface menuItem {
//     path: string; // 路由的path
//     name: string; // 路由的name
//     children: any[]; // 路由的children
//     title: string; // 路由的名称
//     [key: string]: any;
// }
import PlaceholderImg from "./icon/placeholder.png";
export default {
  name: "SideBarIView",
  data() {
    return {
      defaultMenu: "",
      isCollapse: false,
      openName: [],
      // defaultIcon: `this.src="${require()}";this.onerror=null`,
    };
  },
  computed: {
    defaultIcon() {
      return PlaceholderImg;
    },
    // 设置css变量
    menuCssVar() {
      return {
        "--elmenu-background": this.activeBg
          ? this.activeBg
          : "rgba(28,155,255,1)",
        "--elmenu-active-text-color": this.activeTextColor
          ? this.activeTextColor
          : "#1C9BFF;",
      };
    },
  },
  props: {
    defaultActiveMenu: {
      // 默认激活的菜单
      type: String,
      default: "",
    },
    menuList: {
      type: Array,
      default: () => [],
    },
    accordion: {
      type: Boolean,
      default: true,
    },
    activeTextColor: String,
    activeBg: String,
    autoPush: {
      // 点击菜单的时候，是否通过菜单组件自动跳转页面
      type: Boolean,
      default: true,
    },
  },
  watch: {
    menuList(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initMenu(newVal[0].children[0].name);
      }
    },
  },
  created() {
    if (this.menuList.length == 0) {
      return;
    }
    let path = this.defaultActiveMenu
      ? this.defaultActiveMenu
      : this.$route.name;
    this.initMenu(path);
  },
  methods: {
    initMenu(path) {
      let { parentPath, menuItem } = this.getCurrentMenuItem(path);
      this.defaultMenu = path;
      this.updateOpen(parentPath);
      if (this.autoPush) {
        this.routerChange(path);
      }
      // replace 'click' event with 'init-menu'
      // this.emitClick(path, parentPath, menuItem);
      this.$emit("init-menu", { path, parentPath, menuItem });
    },
    handleSelect(path) {
      if (path === this.$route.name) {
        return;
      }
      let { parentPath, menuItem } = this.getCurrentMenuItem(path);
      if (this.autoPush) {
        this.routerChange(path);
      }
      this.emitClick(path, parentPath, menuItem);
    },
    hadleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 更新当前高亮
    updateOpen(parentPath) {
      this.openName = [parentPath];
      this.$nextTick(() => {
        if (this.$refs.menuRef) {
          this.$refs.menuRef.updateOpened();
          this.$refs.menuRef.updateActiveName();
        }
      });
    },

    updateDefaultMenu(menuKey) {
      this.defaultMenu = menuKey;
      let { parentPath } = this.getCurrentMenuItem(this.defaultMenu);
      this.updateOpen(parentPath);
    },

    getCurrentMenuItem(path) {
      let m = null,
        p = "";

      this.menuList.forEach((item) => {
        if (item.children && item.children.length > 0) {
          item.children.forEach((ele) => {
            if (ele.name === path) {
              p = item.name;
              m = ele;
            }
          });
        }
      });
      return { parentPath: p, menuItem: m };
    },
    routerChange(path, cb) {
      if (path === this.$route.name) {
        return;
      }
      this.$router.push(path);
      if (cb && typeof cb === "function") {
        cb();
      }
    },
    /**
     * 输出的menuItem
     *  interface outMenuItem {
     *      path: string; 当前三级menu的path
     *      parentPath: string; 当前二级的的path
     *      menuItem: menuItem; 当前三级menu的menuItem
     * }
     */
    emitClick(path, parentPath, menuItem) {
      this.$emit("click", { path, parentPath, menuItem });
    },
  },
};
</script>

<style lang="scss">
.sidebar-menu {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  box-shadow: 2px 0 6px 0 rgba(6, 25, 41, 0.07);

  .gem-sidebar-menu {
    position: relative;
    width: 210px;
    height: 100%;
    overflow: auto;
    border-right: 0;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 1px;
      z-index: 3;
      height: 6px;
      background-image: linear-gradient(0deg, #ffffff 0%, #f0f4f8 100%);
    }
    // margin-top: 10px;

    .ivu-menu-submenu {
      &.ivu-menu-item-active {
        // 配置文字颜色
        .ivu-menu-submenu-title {
          .menuicon {
            color: var(--elmenu-active-text-color);
          }
          & > span {
            color: var(--elmenu-active-text-color);
          }
        }
      }
      .ivu-menu-submenu-title {
        display: flex;
        align-items: center;
        height: 50px;
      }
    }
    .ivu-menu-submenu-title:hover {
      background: var(--elmenu-background);
    }
    .menuicon {
      margin-right: 8px;
      // vertical-align: bottom;
    }
    .ivu-menu {
      .ivu-menu-item {
        height: 40px;
        line-height: 40px;
        padding: 0 24px 0 48px;
        padding-left: 50px !important;
        color: #61677a;

        &:hover {
          background: var(--elmenu-background);
          span {
            color: var(--elmenu-active-text-color);
          }
        }
        &.ivu-menu-item-active {
          background: var(--elmenu-background);
          span {
            color: var(--elmenu-active-text-color);
          }
        }
        span {
          font-weight: 700;
        }
      }

      .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        width: 0;
      }
    }

    &.el-menu--collapse {
      width: 48px;
      .el-submenu__title {
        padding-left: 16px !important;
        padding-right: 16px;
      }
    }
  }

  .menu-collapse {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 0 18px;
    border-top: 1px solid #eaeef2;
    box-sizing: border-box;
    background: #fff;
    .mc-icon {
      display: inline-block;
      margin: 12px 0;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
