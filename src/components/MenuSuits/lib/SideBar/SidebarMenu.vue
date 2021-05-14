<template>
    <el-menu
        :key="menuKey"
        :default-active="sidebarActive"
        ref="sidebar"
        class="sidebar-menu"
        :collapse="isCollapse"
        :router="true"
        active-text-color="#627AD8"
        :collapse-transition="false"
        @select="handleSelect"
    >
        <el-submenu v-for="(item, i) in menuList" :key="i" :index="item.path">
            <template slot="title">
                <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(el, j) in item.children" :key="j" :index="el.path" :route="{ name: el.path }">
                <span slot="title">{{ el.name }}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SidebarMenu extends Vue {}
</script>

<style lang="scss">
    .sidebar-menu {
        background: #ffffff;
        box-shadow: 2px 0 6px 0 rgba(6, 25, 41, 0.07);
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        .el-submenu__icon-arrow {
            font-size: 14px;
            color: $regular-text;
        }
        > .el-submenu {
            margin-top: 10px;
            .el-submenu__title {
                span {
                    font-weight: 600;
                }
            }
        }
        .el-menu-item.is-active {
            background: #eff1fb;
            span {
                color: $default-color;
            }
        }
        .el-submenu.is-active {
            .el-submenu__title {
                span {
                    color: $default-color;
                }
            }
        }
        &:not(.el-menu--collapse) {
            width: 200px;
            min-width: 200px;
        }
        &.el-menu--collapse {
            width: 0;
            overflow: hidden;
        }
        &.el-menu {
            text-align: left;
            border-right: 0;

            .el-submenu__title {
                padding-left: 32px !important;
                line-height: 40px;
                height: 40px;
            }
            .el-menu-item {
                padding-left: 45px !important;
                line-height: 40px;
                height: 40px;
                color: $regular-text;
                // &.is-active {
                //     color: $default-color;
                // }
            }
        }

        .collpase-box {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40px;
            padding: 10px 18px;
            border-top: 1px solid #eaeef2;
            box-sizing: border-box;
            .icon {
                font-size: 16px;
            }
        }
    }
</style>
