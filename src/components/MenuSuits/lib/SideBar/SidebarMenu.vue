<template>
    <nav class="sidebar-menu">
        <el-menu
            :default-active="defaultMenu"
            class="el-sidebar-menu"
            :collapse="isCollapse"
            :router="false"
            active-text-color="#26BEE6"
            text-color="#61677A"
            @select="handleSelect"
        >
            <el-submenu v-for="(item, i) in menuList" :key="i" :index="item.path">
                <template slot="title">
                    <i :class="['menuicon', 'iconfont', item.icon]"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(el, j) in item.children" :key="j" :index="el.path">
                    <span slot="title">{{ el.title }}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
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
            };
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
        },
        created() {
            this.defaultMenu = this.defaultActiveMenu ? this.defaultActiveMenu : this.menuList[0].children[0].path;
        },
        methods: {
            handleSelect(index, indexPath) {
                let citem = null;
                // this.sidebarActive = index;
                this.menuList.forEach(item => {
                    if (indexPath[0] === item.path && item.children.length > 0) {
                        citem = item.children.filter(ele => {
                            if (index === ele.path) {
                                return true;
                            }
                        })[0];
                    }
                });
                this.$emit('click', { path: index, parentPath: indexPath[0], menuItem: citem });
            },
            hadleCollapse() {
                this.isCollapse = !this.isCollapse;
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
        .el-sidebar-menu {
            position: relative;
            width: 200px;
            height: 100%;
            overflow: auto;
            border-right: 0;
            .el-submenu.is-active {
                // 配置文字颜色
                .el-submenu__title {
                    .menuicon {
                        color: #26bee6;
                        margin-right: 8px;
                    }
                    & > span {
                        color: #26bee6;
                    }
                }
            }
            .menuicon {
                font-size: 16px;
            }
            .el-menu {
                .el-menu-item {
                    height: 40px;
                    line-height: 40px;
                    padding-left: 48px !important;
                    &:hover {
                        background: rgba(40, 189, 230, 0.1);
                    }
                    &.is-active {
                        background: rgba(40, 189, 230, 0.1);
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
