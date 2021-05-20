<template>
    <nav class="sidebar-menu" :style="menuCssVar">
        <!-- <Menu :active-name="defaultMenu" :open-names="openName" class="gem-sidebar-menu" @onSelect="handleSelect" :width="menuWidth">
            <Submenu v-for="(item, i) in menuList" :key="i" :name="item.path">
                <template slot="title">
                    <i :class="['menuicon', 'iconfont', item.icon]"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <MenuItem v-for="(el, j) in item.children" :key="j" :name="el.path">
                    <span>{{ el.title }}</span>
                </MenuItem>
            </Submenu>
        </Menu> -->

        <Menu :active-name="defaultMenu" :open-names="openName" width="auto" class="gem-sidebar-menu" accordion>
            <template v-for="(item, componentIndex) in menuList">
                <!-- 展开并且有子菜单 -->
                <Submenu v-if="!isCollapse && item.children.length" v-bind:key="componentIndex" :name="componentIndex">
                    <template slot="title">
                        <i :class="['menuicon', 'iconfont', item.icon]"></i>
                        <span>{{ item.name }}</span>
                    </template>
                    <MenuItem v-for="(children, index) in item.children" :key="index" :name="children.path" :to="children.path">
                        {{ children.name }}
                    </MenuItem>
                </Submenu>

                <!-- 展开但没有子菜单 -->
                <MenuItem v-else-if="!isCollapse" :name="item.path" :to="item.path" v-bind:key="componentIndex">
                    <i :class="['menuicon', 'iconfont', item.icon]"></i>
                    <span>{{ item.name }}</span>
                </MenuItem>

                <!-- 不展开有子菜单 -->
                <Dropdown
                    v-else-if="isCollapse && item.children.length"
                    v-bind:key="componentIndex"
                    placement="right-start"
                    class="menu-dropdown"
                >
                    <MenuItem :name="item.path" :to="item.path">
                        <i :class="['menuicon', 'iconfont', item.icon]"></i>
                        <span>{{ item.name }}</span>
                    </MenuItem>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(children, index) in item.children" :key="index">
                            <MenuItem :name="children.to" :to="children.to">{{ children.name }}</MenuItem>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <!-- 不展开无子菜单 -->
                <Tooltip v-else-if="isCollapse" :content="item.name" placement="right" v-bind:key="componentIndex">
                    <MenuItem :name="item.path" :to="item.path">
                        <i :class="['menuicon', 'iconfont', item.icon]"></i>
                        <span>{{ item.name }}</span>
                    </MenuItem>
                </Tooltip>
            </template>
        </Menu>
        <div class="menu-collapse">
            <span class="mc-icon" @click="hadleCollapse">
                <img src="./icon/collapse.png" v-if="!isCollapse" />
                <img src="./icon/expand.png" v-else />
            </span>
        </div>
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
        data() {
            return {
                defaultMenu: '',
                isCollapse: false,
                menuWidth: '210px',
                openName: [],
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
        created() {
            this.initMenu();
        },
        methods: {
            initMenu() {
                this.defaultMenu = this.defaultActiveMenu ? this.defaultActiveMenu : this.menuList[0].children[0].path;
                this.openName = [this.menuList[0].path];

                this.$emit('click', { path: this.defaultMenu, parentPath: '', menuItem: this.getCurrentMenuItem(this.defaultMenu) });
            },
            handleSelect(index, indexPath) {
                console.log(index);
                let citem = this.getCurrentMenuItem(index);

                // 输出的menuItem
                // interface outMenuItem {
                //     path: string; // 当前三级menu的path
                //     parentPath: string; // 当前二级的的path
                //     menuItem: menuItem; // 当前三级menu的menuItem
                // }
                this.$emit('click', { path: index, parentPath: indexPath[0], menuItem: citem });
            },
            hadleCollapse() {
                this.isCollapse = !this.isCollapse;
                this.menuWidth = this.isCollapse ? '64px' : '210px';
            },

            getCurrentMenuItem(path) {
                let m = null;
                this.menuList.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(ele => {
                            if (ele.path === path) {
                                m = ele;
                            }
                        });
                    }
                });
                return m;
            },
        },
        // updated() {
        //     this.initMenu();
        // },
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
            color: #61677a;
            .el-submenu.is-active {
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
            .el-submenu__title:hover {
                background: var(--elmenu-background);
            }
            .menuicon {
                font-size: 16px;
                margin-right: 8px;
            }
            .el-menu {
                .el-menu-item {
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

            .el-menu-item,
            .el-submenu__title {
                height: 40px;
                line-height: 40px;
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
