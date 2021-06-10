<template>
    <div class="main-top-menu reset">
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
                    :class="{ active: actived == item.name }"
                    v-for="(item, i) in topMenuList"
                    :key="i"
                    @click="firstRouteClick(item.name, item)"
                >
                    <span>{{ item.title }}</span>
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
        name: 'TopMenu',
        model: {
            prop: 'actived',
            event: 'on-active-change',
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

        methods: {
            logoClick() {
                this.$emit('logoClick');
            },
            // 一级导航点击
            firstRouteClick(path, menuItem) {
                this.$emit('on-active-change', path);
                this.$emit('on-menu-click', { path, menuItem });
            },
        },
    };
</script>

<style lang="scss">
    // reset styles
    .reset {
        ul li {
            list-style: none;
        }
    }

    .main-top-menu {
        display: flex;
        width: 100%;
        height: 56px;
        background: #fff;
        box-shadow: 0 2px 6px 0 rgba(158, 167, 180, 0.1);
        color: #61677a;
        // position: relative;
        // z-index: 1;
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
                        color: #222;
                    }
                    &.active {
                        opacity: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #222;
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
