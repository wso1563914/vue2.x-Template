<template>
    <div class="main-top-menu">
        <div class="logo-box" @click="logoClick">
            <img :src="logo" :alt="alt" v-if="logo" />
            <!-- svg需要用slot -->
            <template v-else>
                <slot name="logo"></slot>
            </template>
        </div>
        <div class="menu-box">
            <ul>
                <li
                    :class="{ active: currentMenuPath == item.path }"
                    v-for="(item, i) in topMenuList"
                    :key="i"
                    @click="firstRouteClick(item.path, item)"
                >
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="info-box">
            <!-- 菜单右侧的按钮组 -->
            <slot name="otherIcon"></slot>
        </div>
    </div>
</template>

<script>
    // interface TopMenuItem {
    //     path: string;
    //     name: string;
    //     children: any[];
    //     [key: string]: any;
    // }
    export default {
        model: {
            props: 'actived',
            event: 'on-active-change',
        },
        data() {
            return {
                currentMenuPath: '',
            };
        },
        props: {
            logo: {
                // 外面require()的logo图片对象, 可选
                type: String || Object,
            },
            alt: {
                type: String,
                default: '',
            },
            topMenuList: {
                type: Array, // TopMenuItem[];
                default: () => [],
            },
            actived: {
                // 当前选择的菜单的path
                type: String,
                default: '',
            },
        },

        created() {
            this.currentMenuPath = this.actived;
        },
        methods: {
            logoClick() {
                this.$emit('logoClick');
            },
            // 一级导航点击
            firstRouteClick(path, menuItem) {
                this.currentMenuPath = path;
                this.$emit('on-active-change', path);
                this.$emit('on-menu-click', { path, menuItem });
            },
        },
    };
</script>

<style lang="scss">
    .main-top-menu {
        display: flex;
        width: 100%;
        height: 56px;
        background: #131e27;
        color: #fff;
        .logo-box {
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-right: 50px;
            margin-left: 20px;
            img {
                width: 200px;
            }
        }

        .menu-box {
            flex: 1;
            // display: flex;
            min-width: 500px;
            // max-width: 900px;
            // margin: 0 100px;
            ul {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                li {
                    padding: 0 20px;
                    font-size: 16px;
                    line-height: 50px;
                    height: 50px;
                    opacity: 0.6;
                    cursor: pointer;
                    text-align: center;
                    &.hover {
                        color: #fff;
                    }
                    &.active {
                        opacity: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        span {
                            line-height: 50px;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
        .info-box {
            min-width: 200px;
            height: 100%;
            padding: 0 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            .o-icon {
                margin-right: 32px;
            }
        }
    }
</style>
