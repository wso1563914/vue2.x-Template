<template>
    <!-- 顶部菜单右边的用户名和下拉抽屉 -->
    <el-dropdown @command="dropDownClick" class="top-dropdown">
        <span class="username" v-if="userInfo">
            <i :class="['iconfont', userInfoIcon]"></i>

            <!-- <svg class="head-icon" aria-hidden="true">
                <use xlink:href="#iconyijidaohang_touxiang2x"></use>
            </svg> -->
            {{ userInfo.realname }}
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="dr-photo">{{ userInfo.phone }}</el-dropdown-item>
            <el-dropdown-item
                class="dr-photo"
                v-for="(item, i) in commandList"
                :key="i"
                :icon="'iconfont ' + item.icon"
                :command="item.command"
                >{{ item.name }}</el-dropdown-item
            >

            <el-dropdown-item class="dr-out" divided icon="iconfont icondingbudaohang_tuichu2x" command="logout">
                <span>退出</span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    interface CommandItem {
        name: string;
        icon: string;
        command: string;
    }
    @Component
    export default class UserDropdown extends Vue {
        @Prop({ type: Object }) userInfo!: any;
        @Prop({ type: String }) userInfoIcon!: string;
        @Prop({ type: Array, default: () => [] }) commandList?: CommandItem[];

        dropDownClick(command) {
            this.$emit('click', command);
        }
    }
</script>

<style lang="scss">
    .top-dropdown {
        margin-right: 24px;

        .username {
            cursor: default;
        }
        .el-dropdown-menu.top-dropdown {
            padding: 0;
            .dr-photo {
                padding: 11px 12px;
                margin-bottom: 12px;
                color: #222222;
                // border-bottom: 1px solid #F5F5F5;
            }
            .dr-normal {
                color: #222222;
                margin-bottom: 12px;
            }
            .dr-out {
                padding: 11px 12px;
                border-top: 1px solid #f5f5f5;
                color: #222222;
            }
        }
    }
</style>
