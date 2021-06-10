<template>
    <!-- 带有顶部和侧边菜单的Router -->
    <div class="gem-container">
        <TopMenu :topMenuList="menuArr" v-model="topActiveMenu" @on-menu-click="topMenuClick" :logo="img">
            <span style="height: 100%" slot="otherIcon">
                <svg class="bell-icon" aria-hidden="true" style="width: 18px; height: 100%; margin-right: 32px">
                    <use xlink:href="#iconsousuo2x"></use>
                </svg>
            </span>
            <!-- <UserDropdown slot="otherIcon" :userInfo="userInfo" :commandList="commandList" @click="commandClick"></UserDropdown> -->
            <UserDropdownIView slot="otherIcon" :userInfo="userInfo" :commandList="commandList" @click="commandClick"></UserDropdownIView>
        </TopMenu>
        <main>
            <SidebarMenu
                :menuList="sidebarMenuList"
                active-text-color="#26bee6"
                active-bg="rgba(40, 230, 40, 0.1)"
                v-if="isShowSidebarMenu"
            >
            </SidebarMenu>
            <div class="main-container">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
    import { TopMenu, ISidebarMenu, UserDropdown, SidebarMenu, UserDropdownIView } from '@/components/MenuSuits';
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
            UserDropdownIView,
        },
    })
    export default class MenuRouter extends Vue {
        menuArr: any[] = [];
        userInfo: any = {};
        topActiveMenu = '';
        defaultActiveMenu = '';
        commandList: any[] = [];
        sidebarMenuList: any[] = [];
        isShowSidebarMenu = false;

        img: any = require('../assets/images/logo.png');

        created(): void {
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
            const { menuItem } = obj;
            if (menuItem && menuItem.children.length > 0) {
                this.sidebarMenuList = menuItem.children;
                this.isShowSidebarMenu = true;
            } else {
                this.isShowSidebarMenu = false;
                this.sidebarMenuList = [];
                this.$router.push({ name: menuItem.name });
            }
        }
        commandClick(command: string): void {
            if (command === 'linkUs') {
                // console.log(111);
            }
        }
        // sideClick({ path }) {
        //     // console.log(menu);
        //     this.$router.push({ name: path });
        // }
        getFirstTopMenu(list) {
            let path = this.$route.name;
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                if (item.children && item.children.length > 0) {
                    for (let j = 0; j < item.children.length; j++) {
                        const ele = item.children[j];
                        if (ele.children && ele.children.length > 0) {
                            for (let k = 0; k < ele.children.length; k++) {
                                const el = ele.children[k];
                                if (el.name === path) {
                                    this.topMenuClick({ menuItem: item });
                                    this.topActiveMenu = item.name;
                                    break;
                                }
                            }
                        }
                    }
                } else if (item.name === path) {
                    this.topActiveMenu = item.name;
                    break;
                }
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
