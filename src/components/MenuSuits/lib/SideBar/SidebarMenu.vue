<template>
    <nav class="sidebar-menu" :style="menuCssVar">
        <el-menu
            :default-active="defaultMenu"
            class="gem-sidebar-menu"
            ref="sidebarMenuRef"
            :collapse="isCollapse"
            :router="false"
            :active-text-color="activeTextColor"
            text-color="#61677A"
            @select="handleSelect"
            unique-opened
        >
            <el-submenu v-for="(item, i) in menuList" :key="i" :index="item.path">
                <template slot="title">
                    <!-- 图片是iconfont的图片,UI出图，后台配置 -->
                    <!-- <i :class="['menuicon', 'iconfont', item.icon]"></i> -->
                    <img class="menuicon" :src="item.icon" :onerror="defaultIcon" />
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(el, j) in item.children" :key="j" :index="el.path">
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
    export default {
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
                    this.initMenu(this.menuList[0].children[0].name);
                }
            },
            $route(val) {
                this.defaultMenu = val.name;
            },
        },
        created() {
            if (this.menuList.length == 0) {
                return;
            }
            let path = this.defaultActiveMenu ? this.defaultActiveMenu : this.$route.name;
            this.initMenu(path);
        },
        methods: {
            initMenu(path) {
                let { parentPath, menuItem } = this.getCurrentMenuItem(path);
                this.defaultMenu = path;
                console.log(this.defaultMenu);

                this.routerChange(path);
                this.emitClick(path, parentPath, menuItem);
            },
            handleSelect(path) {
                if (path === this.$route.name) {
                    return;
                }
                let { parentPath, menuItem } = this.getCurrentMenuItem(path);
                this.routerChange(path);

                this.emitClick(path, parentPath, menuItem);
            },
            hadleCollapse() {
                this.isCollapse = !this.isCollapse;
            },

            // 获取当前菜单的对象和父级菜单name
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

            // 路由改变时push
            routerChange(path, cb) {
                if (path === this.$route.name) {
                    return;
                }
                if (path.indexOf('/') === -1) {
                    this.$router.push({ name: path });
                } else {
                    this.$router.push(path);
                }
                if (cb && typeof cb === 'function') {
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
                this.$emit('click', { path, parentPath, menuItem });
            },
        },
    };
</script>

<style lang="scss">
    .sidebar-menu {
        position: relative;
        height: 100%;
        // padding-bottom: 40px;
        box-sizing: border-box;
        // background: #fff;
        overflow: hidden;
        box-shadow: 2px 0 6px 0 rgba(6, 25, 41, 0.07);
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
                }
            }
            .el-submenu__title:hover {
                background: var(--elmenu-background);
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
