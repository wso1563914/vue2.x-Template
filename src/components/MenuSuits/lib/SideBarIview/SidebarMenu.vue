<template>
    <nav class="sidebar-menu" :style="menuCssVar">
        <Menu
            ref="menuRef"
            :active-name="defaultMenu"
            :open-names="openName"
            class="gem-sidebar-menu"
            @on-select="handleSelect"
            width="210px"
            accordion
        >
            <Submenu v-for="(item, i) in menuList" :key="i" :name="item.path">
                <template slot="title">
                    <!-- <i :class="['menuicon', 'iconfont', item.icon]"></i> -->
                    <img class="menuicon" :src="item.icon" :onerror="defaultIcon" />
                    <span slot="title">{{ item.title }}</span>
                </template>
                <MenuItem v-for="(el, j) in item.children" :key="j" :name="el.path">
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
    // import { Component, Vue, Prop } from 'vue-property-decorator';
    // interface menuItem {
    //     path: string; // 路由的path
    //     name: string; // 路由的name
    //     children: any[]; // 路由的children
    //     title: string; // 路由的名称
    //     [key: string]: any;
    // }
    export default {
        name: 'ISidebarMenu',
        data() {
            return {
                defaultMenu: '',
                isCollapse: false,
                openName: [],
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
                let { parentPath } = this.getCurrentMenuItem(this.defaultMenu);
                this.updateOpen(parentPath);
            },
        },
        created() {
            console.log(this.menuList);
            if (this.menuList.length == 0) {
                return;
            }
            this.initMenu();
        },
        methods: {
            initMenu() {
                let path = this.defaultActiveMenu ? this.defaultActiveMenu : this.menuList[0].children[0].path,
                    { parentPath, menuItem } = this.getCurrentMenuItem(path);

                this.updateOpen(parentPath);
                this.routerChange(path);
                this.$emit('click', { path, parentPath, menuItem });
            },
            handleSelect(path) {
                if (path === this.$route.path.substr(1)) {
                    return;
                }
                let { parentPath, menuItem } = this.getCurrentMenuItem(path);
                this.routerChange(path);
                // 输出的menuItem
                // interface outMenuItem {
                //     path: string; // 当前三级menu的path
                //     parentPath: string; // 当前二级的的path
                //     menuItem: menuItem; // 当前三级menu的menuItem
                // }
                this.$emit('click', { path, parentPath, menuItem });
            },
            hadleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            updateOpen(parentPath) {
                this.openName = [parentPath];
                this.$nextTick(() => {
                    this.$refs.menuRef.updateOpened();
                    this.$refs.menuRef.updateActiveName();
                });
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
</script>

<style lang="scss">
    .sidebar-menu {
        position: relative;
        height: 100%;
        padding-bottom: 40px;
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
