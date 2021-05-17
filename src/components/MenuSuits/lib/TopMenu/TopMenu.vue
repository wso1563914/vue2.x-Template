<template>
    <div class="main-top-menu">
        <div class="logo-box" @click="logoClick">
            <img :src="logo" alt="" v-if="logo" />
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

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    interface TopMenuItem {
        path: string;
        name: string;
        children: any[];
        [key: string]: any;
    }
    @Component
    export default class TopMenu extends Vue {
        @Prop({ type: String }) logo!: string; // logo 图片的路径
        @Prop({ type: Array }) topMenuList!: TopMenuItem[];
        @Prop({ type: String, default: '' }) actived!: string; // 当前选择的菜单的path

        currentMenuPath = '';

        created(): void {
            this.currentMenuPath = this.actived;
        }

        logoClick(): void {
            this.$emit('logoClick');
        }
        // 一级导航点击
        firstRouteClick(path: string, menuItem: TopMenuItem): void {
            this.currentMenuPath = path;
            this.$emit('menuClick', { path, menuItem });
        }
    }
</script>

<style lang="scss">
    .main-top-menu {
        display: flex;
        height: 56px;
        background: #131e27;
        color: #fff;
        .logo-box {
            min-width: 200px;
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
                width: 200px;
                height: 200px;
            }
        }

        .menu-box {
            flex: 1;
            display: flex;
            min-width: 500px;
            max-width: 900px;
            margin: 0 100px;
            ul {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                li {
                    flex: 1;
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
                        }
                    }
                }
            }
        }
        .info-box {
            height: 100%;
            padding: 0 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            .o-icon {
                margin-right: 32px;
            }
        }
    }
</style>
