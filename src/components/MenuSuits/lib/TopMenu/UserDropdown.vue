<template>
    <!-- 顶部菜单右边的用户名和下拉抽屉 -->
    <el-dropdown @command="dropDownClick" class="top-dropdown">
        <div class="username" v-if="userInfo.name">
            <img class="menu-user-head" :src="userInfo.img" :onerror="defaultAvater" />
            <span>{{ userInfo.name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="dr-photo">{{ userInfo.phone }}</el-dropdown-item>
            <template v-if="commandList.length > 0">
                <el-dropdown-item
                    class="dr-normal"
                    v-for="(item, i) in commandList"
                    :key="i"
                    :icon="'iconfont ' + item.icon"
                    :command="item.command"
                    >{{ item.name }}</el-dropdown-item
                >
            </template>

            <el-dropdown-item class="dr-out" divided icon="iconfont icondingbudaohang_tuichu2x" command="logout">
                <span>退出登录</span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    // interface CommandItem {
    //     name: string;
    //     icon: string;
    //     command: string;
    // }
    // interface UserInfoItem {
    //     name: '',
    //     phone: '',
    //     img: '',
    // }
    export default {
        data() {
            return {
                defaultAvater: `this.src="${require('./icon/avater.png')}";this.onerror=null`,
            };
        },
        props: {
            userInfo: {
                default: {
                    name: '',
                    phone: '',
                    img: '',
                },
            },
            commandList: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            dropDownClick(command) {
                this.$emit('click', command);
            },
        },
    };
</script>

<style lang="scss">
    .top-dropdown {
        height: 100%;
        .username {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            cursor: default;
            color: #fff;
            .menu-user-head {
                width: 20px;
                height: 20px;
                margin-right: 4px;
            }
        }
        .el-dropdown-menu {
            padding: 0;
        }
        .dr-photo {
            padding: 11px 12px;
            margin-bottom: 12px;
            color: #212121;
            border-bottom: 1px solid #f5f5f5;
        }
        .dr-normal {
            color: #61677a;
            margin-bottom: 12px;
        }
        .dr-out {
            padding: 11px 12px;
            border-top: 1px solid #f5f5f5;
            color: #61677a;
        }
    }
</style>
