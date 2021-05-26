<template>
    <!-- 带有顶部和侧边菜单的Router -->
    <div class="gem-container">
        <TopMenu :topMenuList="menuArr" v-model="topActiveMenu" @on-menu-click="topMenuClick" :logo="img">
            <span style="height: 100%" slot="otherIcon">
                <svg class="bell-icon" aria-hidden="true" style="width: 18px; height: 100%; margin-right: 32px">
                    <use xlink:href="#iconsousuo2x"></use>
                </svg>
            </span>
            <UserDropdown slot="otherIcon" :userInfo="userInfo" :commandList="commandList" @click="commandClick"></UserDropdown>
        </TopMenu>
        <main>
            <SidebarMenu
                :menuList="sidebarMenuList"
                active-text-color="#26bee6"
                active-bg="rgba(40, 230, 40, 0.1)"
                v-if="isShowSidebarMenu"
            >
            </SidebarMenu>
            <!-- <ISidebarMenu
                :menuList="sidebarMenuList"
                active-text-color="#26bee6"
                active-bg="rgba(40, 230, 40, 0.1)"
                v-if="isShowSidebarMenu"
            >
            </ISidebarMenu> -->

            <div class="main-container">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
    import { TopMenu, ISidebarMenu, UserDropdown, SidebarMenu } from '@/components/MenuSuits';
    // import { TopMenu, UserDropdown } from '@/components/MenuSuits/';
    import { Component, Vue } from 'vue-property-decorator';
    // import TopMenu from '@/third/topMenu/TopMenu.js';
    // import UserDropdown from '@/third/topMenu/UserDropdown.js';

    import menuList from '@/menu.js';
    // Vue.use(TopMenu);
    // Vue.use(UserDropdown);
    @Component({
        components: {
            TopMenu,
            SidebarMenu,
            ISidebarMenu,
            UserDropdown,
        },
    })
    export default class MenuRouter extends Vue {
        menuArr: any[] = [];
        userInfo: any = {};
        topActiveMenu = 'home';
        commandList: any[] = [];
        sidebarMenuList: any[] = [];
        isShowSidebarMenu = false;

        img: any = require('../assets/images/logo.png');

        created(): void {
            this.menuArr = menuList.data.map(item => {
                if (item.parentId == -1) {
                    return {
                        path: item.path,
                        title: item.title,
                        children: item.children,
                    };
                }
            });
            setTimeout(() => {
                this.userInfo = {
                    name: '张三',
                    phone: '1234566344',
                    img: '',
                };

                this.commandList = [
                    {
                        name: '联系我们',
                        icon: 'iconlianxi2x',
                        command: 'linkUs',
                    },
                ];

                this.topActiveMenu = 'managementCenter';
            }, 2000);
        }

        topMenuClick(obj: any): void {
            const { menuItem } = obj;
            // this.topActiveMenu = path;
            if (menuItem && menuItem.children.length > 0) {
                this.sidebarMenuList = menuItem.children;
                this.isShowSidebarMenu = true;
            } else {
                this.isShowSidebarMenu = false;
                this.sidebarMenuList = [];
            }
        }
        commandClick(command: string): void {
            if (command === 'linkUs') {
                console.log(111);
            }
        }
    }
</script>

<style lang="scss">
    .gem-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        main {
            display: flex;
            width: 100%;
            height: 100%;
            overflow: auto;
            .main-container {
                flex: 1;
            }
        }
        .logo-icon {
            padding-top: 6px;
            height: 100%;
            box-sizing: border-box;
        }
    }
</style>
