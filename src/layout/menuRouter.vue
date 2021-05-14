<template>
    <!-- 带有顶部和侧边菜单的Router -->
    <div class="gem-container">
        <TopMenu :topMenuList="menuArr" :actived="topActiveMenu" @menuClick="topMenuClick">
            <svg class="logo-icon" slot="logo">
                <use xlink:href="#iconjuhelogo2x"></use>
            </svg>
            <span style="height: 100%" slot="otherIcon">
                <svg class="bell-icon" aria-hidden="true" style="width: 18px; height: 100%; margin-right: 32px">
                    <use xlink:href="#iconsousuo2x"></use>
                </svg>
            </span>
            <UserDropdown
                slot="otherIcon"
                :userInfo="userInfo"
                userInfoIcon="iconguanliyuan2x"
                :commandList="commandList"
                @click="commandClick"
            ></UserDropdown>
        </TopMenu>
        <main>
            <nav></nav>
            <div class="main-container">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
    import { TopMenu, SidebarMenu, UserDropdown } from '@/components/MenuSuits';
    import { Component, Vue } from 'vue-property-decorator';

    import menuList from '@/menu.js';
    @Component({
        components: {
            TopMenu,
            SidebarMenu,
            UserDropdown,
        },
    })
    export default class MenuRouter extends Vue {
        menuArr: any[] = [];
        userInfo: any = {
            realname: '张三',
            phone: '1234566344',
        };
        topActiveMenu = 'home';
        commandList: any[] = [];
        created(): void {
            this.menuArr = menuList.data.map(item => {
                if (item.parentId == -1) {
                    return {
                        path: item.path,
                        name: item.label,
                    };
                }
            });

            this.commandList = [
                {
                    name: '联系我们',
                    icon: 'iconlianxi2x',
                    command: 'linkUs',
                },
            ];
        }

        topMenuClick(obj: any): void {
            const { path, menuItem } = obj;
            console.log(path, menuItem);
            this.topActiveMenu = path;
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
            nav {
                width: 300px;
                background: #9f9;
            }
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
