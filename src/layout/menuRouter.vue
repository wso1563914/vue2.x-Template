<template>
    <!-- 带有顶部和侧边菜单的Router -->
    <div class="gem-container">
        <TopMenu :topMenuList="menuArr" :actived="topActiveMenu" @on-menu-click="topMenuClick" :logo="img">
            <UserDropdown slot="otherIcon" :userInfo="userInfo" :commandList="commandList" @click="commandClick"></UserDropdown>
        </TopMenu>
        <main>
            <SidebarMenu
                class="sidebar"
                :menuList="sidebarMenuList"
                v-if="isShowSidebarMenu"
                :defaultActiveMenu="sidebarDefault"
                :autoPush="false"
                @click="sidebarClick"
            >
            </SidebarMenu>

            <div class="main-container">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
    import { TopMenu, UserDropdown } from '@/third/MenuSuits/lib/TopMenu/index.js';
    import { SidebarMenu } from '@/third/MenuSuits/lib/SideBar/index.js';
    import { State, Mutation } from 'vuex-class';
    import { Component, Vue } from 'vue-property-decorator';

    import menuList from '@/menu.js';

    @Component({
        components: {
            TopMenu,
            UserDropdown,
            SidebarMenu,
        },
    })
    export default class MenuRouter extends Vue {
        @State defaultTopMenu;
        @State defaultSidebarMenu;
        @State defaultSidebarMenuItem;
        @Mutation setDatas;

        menuArr: any[] = [];
        userInfo: any = {};
        commandList: any[] = [];
        sidebarMenuList: any = [];
        isShowSidebarMenu = false;

        img: any = require('../assets/images/logo.png');

        get topActiveMenu() {
            return this.defaultTopMenu;
        }
        get sidebarDefault() {
            return this.defaultSidebarMenu;
        }

        created(): void {
            // getMenu({
            //     tenantId: 1,
            // }).then((res: any) => {
            //     this.menuArr = res.data;
            //     if (this.defaultSidebarMenuItem.length > 0) {
            //         this.sidebarMenuList = this.defaultSidebarMenuItem;
            //         this.isShowSidebarMenu = true;
            //     } else {
            //         this.getFirstTopMenu(this.menuArr);
            //     }
            // });
            setTimeout(() => {
                this.menuArr = menuList.data.map(item => {
                    if (item.parentId == -1) {
                        return {
                            title: item.title,
                            path: item.path,
                            name: item.name,
                            children: item.children,
                        };
                    }
                    if (this.defaultSidebarMenuItem.length > 0) {
                        this.sidebarMenuList = this.defaultSidebarMenuItem;
                        this.isShowSidebarMenu = true;
                    } else {
                        this.getFirstTopMenu(this.menuArr);
                    }
                });

                this.userInfo = {
                    name: '张三',
                    phone: '1234566344',
                    img: '',
                };

                this.commandList = [
                    {
                        name: '联系我们',
                        icon: 'iconfont iconlianxi2x',
                        command: 'linkUs',
                        isFont: true,
                    },
                    {
                        name: '联系我们2',
                        icon: 'iconfont iconxiaozhang2x',
                        command: 'linkUs2',
                        isFont: true,
                    },
                ];

                this.getFirstTopMenu(this.menuArr);
            }, 300);
        }

        topMenuClick(obj: any): void {
            const { path, menuItem } = obj;
            let menuFirstRoute = '';

            if (menuItem && menuItem.children.length > 0) {
                this.sidebarMenuList = menuItem.children.map(item => {
                    item.isFont = true;
                    return item;
                });

                menuFirstRoute = this.sidebarMenuList[0].children[0].name;
                console.log(this.sidebarMenuList[0]);

                this.setDefault(path, menuFirstRoute, this.sidebarMenuList);

                if (menuFirstRoute === this.$route.name) {
                    return;
                }

                this.$router.push({ name: menuFirstRoute });

                this.isShowSidebarMenu = true;
            } else {
                this.isShowSidebarMenu = false;
                this.sidebarMenuList = [];
                if (path === this.$route.name) {
                    return;
                }

                this.setDefault(path, '', []);
                this.$router.push({ name: path });
            }
        }

        sidebarClick({ path }): void {
            this.$router.push({ name: path });
        }

        commandClick(command: string): void {
            console.log(command);
            if (command === 'linkUs') {
                // console.log(111);
            }
        }

        setDefault(top, sidebar, sidebarMenuArr = []) {
            this.setDatas([
                { name: 'defaultTopMenu', val: top },
                { name: 'defaultSidebarMenu', val: sidebar },
                { name: 'defaultSidebarMenuItem', val: sidebarMenuArr },
            ]);
        }
        getFirstTopMenu(list: any[]): void {
            let path = this.defaultTopMenu;
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                if (item.children && item.children.length > 0) {
                    for (let j = 0; j < item.children.length; j++) {
                        const ele = item.children[j];
                        if (ele.children && ele.children.length > 0) {
                            for (let k = 0; k < ele.children.length; k++) {
                                const el = ele.children[k];
                                if (el.name === path) {
                                    this.topMenuClick({ path, menuItem: item });
                                    // this.topActiveMenu = item.name;
                                    break;
                                }
                            }
                        }
                    }
                }
                // else if (item.name === path) {
                //     this.topActiveMenu = item.name;
                //     break;
                // }
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
                padding: 18px 16px;
                box-sizing: border-box;
            }
        }
        .logo-icon {
            padding-top: 6px;
            height: 100%;
            box-sizing: border-box;
        }
    }
</style>
