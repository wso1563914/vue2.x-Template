<template>
  <nav class="sidebar-menu" :style="menuCssVar">
    <el-menu
      :default-active="defaultMenu"
      class="gem-sidebar-menu"
      ref="sidebarMenuRef"
      :collapse="isCollapse"
      :router="false"
      :active-text-color="activeTextColor"
      @select="handleSelect"
      :unique-opened="accordion"
    >
      <el-submenu v-for="item in menuList" :key="item.name" :index="item.name">
        <template slot="title">
          <!-- 图片是iconfont的图片,UI出图，后台配置 -->
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
        <el-menu-item
          v-for="el in item.children"
          :key="el.name"
          :index="el.name"
        >
          <span slot="title">{{ el.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
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
// import { Component, Vue, Prop } from 'vue-property-decorator';
// interface menuItem {
//     path: string; // 路由的path
//     name: string; // 路由的name
//     children: any[]; // 路由的children
//     title: string; // 路由的名称
//     [key: string]: any;
// }
import PlaceholderImg from "./icon/placeholder.png";
export default {
  name: "SidebarMenu",
  data() {
    return {
      defaultMenu: "",
      isCollapse: false,
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
          : "rgba(28,155,255,0.1)",
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
        this.$nextTick(() => {
          this.initMenu(newVal[0].children[0].name);
        });
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
      if (this.autoPush) {
        this.defaultMenu = path;
        this.routerChange(path);
      }
      //   this.emitClick(path, parentPath, menuItem);
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

    // 获取当前菜单的对象和父级菜单name
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

    updateOpen(key) {
      this.$refs.sidebarMenuRef.open(key);
    },

    updateDefaultMenu(defaultKey) {
      this.defaultMenu = defaultKey;
    },

    // 路由改变时push
    routerChange(path, cb) {
      if (path === this.$route.name) {
        return;
      }

      this.$router.push({ name: path });
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
  // background-image: linear-gradient(0deg, #fff 0%, #f0f4f8 100%);
  box-shadow: 2px 0 6px 0 rgba(6, 25, 41, 0.07);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    height: 6px;
    background-image: linear-gradient(0deg, #ffffff 0%, #f0f4f8 100%);
  }
  .gem-sidebar-menu {
    position: relative;
    width: 210px;
    height: 100%;
    overflow: auto;
    border-right: 0;
    .el-submenu {
      &.is-active {
        // 配置文字颜色
        .el-submenu__title {
          .menuicon {
            color: var(--elmenu-active-text-color);
          }
          & > span {
            color: var(--elmenu-active-text-color);
          }
        }
      }
      .el-submenu__title {
        height: 50px;
        line-height: 50px;
        color: #61677a;
      }
    }
    .el-submenu__title:hover {
      background: var(--elmenu-background);
      .el-submenu__icon-arrow {
        color: var(--elmenu-active-text-color);
      }
    }
    .menuicon {
      font-size: 16px;
      margin-right: 8px;
    }
    .el-menu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        padding-left: 48px !important;
        color: #61677a;

        &:hover {
          background: var(--elmenu-background);
        }
        &.is-active {
          background: var(--elmenu-background);
        }
        span {
          font-weight: 700;
        }
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
