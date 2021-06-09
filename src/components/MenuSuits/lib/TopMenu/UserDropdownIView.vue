<template>
    <!-- 顶部菜单右边的用户名和下拉抽屉 -->
    <Dropdown @on-click="dropDownClick" class="top-dropdown" transfer>
        <div class="username">
            <img class="menu-user-head" :src="avaSrc" />
            <span>{{ userInfo.name }}</span>
        </div>
        <DropdownMenu slot="list" class="top-dropdown-menu">
            <DropdownItem class="dr-photo" v-if="userInfo.phone">{{ userInfo.phone }}</DropdownItem>
            <template v-if="commandList.length > 0">
                <DropdownItem class="dr-normal" v-for="(item, i) in commandList" :key="i" :name="item.command">
                    <!-- <slot name="commandIcon" v-if="item.isFont"></slot> -->
                    <i :class="[item.icon, 'ic']" v-if="item.isFont"></i>
                    <img :src="getIconSrc(item)" v-else />
                    <span>{{ item.name }}</span>
                </DropdownItem>
            </template>

            <DropdownItem class="dr-out" name="logout">
                <img :src="exitIconSrc" />
                <span>退出登录</span>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
    // interface CommandItem {
    //     name: string;
    //     icon: string;
    //     command: string;
    //     isFont: Boolean; // 是否用iconfont， 用iconfont的需要自己在外部用slot=commandIcon的插槽添加
    // }
    // interface UserInfoItem {
    //     name: '',
    //     phone: '',
    //     img: '',
    // }
    import defaultAva from './icon/avater.png';
    import defaultPh from './icon/placeholder.png';
    import exitIcon from './icon/exit.png';

    export default {
        name: 'UserDropdown',
        computed: {
            avaSrc() {
                return this.userInfo.img ? this.userInfo.img : defaultAva;
            },
            exitIconSrc() {
                return exitIcon;
            },
            placeholderSrc() {
                return defaultPh;
            },
        },
        props: {
            userInfo: {
                type: Object,
                default: () => {
                    return {
                        name: '欢迎',
                        phone: '',
                        img: '',
                    };
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
            getIconSrc(item) {
                return item.icon ? item.icon : defaultPh;
            },
        },
    };
</script>

<style lang="scss">
    .top-dropdown {
        height: 100%;
        .ivu-dropdown-rel {
            height: 100%;
        }
        .username {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            cursor: default;
            color: #61677a;
            .menu-user-head {
                width: 20px;
                height: 20px;
                margin-right: 4px;
            }
        }
    }
    .top-dropdown-menu {
        padding: 0;
        .ivu-dropdown-item {
            line-height: 1;
            img {
                width: 16px;
                height: 16px;
                vertical-align: text-bottom;
                margin-right: 8px;
            }
        }
        .dr-photo {
            padding: 11px 12px;
            color: #212121;
            border-bottom: 1px solid #f5f5f5;
            cursor: default;
        }
        .dr-normal {
            color: #61677a;
            padding: 12px 12px;
            // margin-bottom: 12px;
            .ic {
                margin-right: 8px;
                color: #61677a;
            }
        }
        .dr-out {
            padding: 11px 12px;
            border-top: 1px solid #f5f5f5;
            color: #61677a;
        }
    }
</style>
