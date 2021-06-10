# 使用方法

+ 分为三部分：
    + 左边logo
    + 中间menuList
    + 右边其他按钮和用户名

## demo
```
    <TopMenu :topMenuList="menuArr" v-model="topActiveMenu" @on-menu-click="topMenuClick" :active="activeMenu" :logo="logoImg" :alt="alt">
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
            :commandList="commandList"
            @click="commandClick"
        ></UserDropdown>
    </TopMenu>
```
## logo
logo可以传:logo="require(图片地址)"， 或者用slot="logo"自己上传

可以通过内部emit出的logoClick方法响应对logo的点击
`@logoClick="abc"`

## menu
```
// 数组数据
:topMenuList="arr"

arr: topMenuItem = {
    path: '/abc',
    name: '首页‘
}

TopMenuItem {
    path: string; // 这里可以填路由中的path或者name
    name: string;
}

// 当前高亮菜单名称
v-model="路由的name"
```

## right button group

通过slot去添加按钮
`<button slot="otherIcon">按钮</button>`

# drapdown组件

## demo
```
    <UserDropdown
        slot="otherIcon"
        :userInfo="userInfo"
        :commandList="commandList"
        @click="commandClick"
    ></UserDropdown>
```

### props
    // 抽屉选项列表
    commandList: [
        {
            name: '联系我们',
            icon: 'iconlianxi2x',
            command: 'linkUs',
            isFont: false // 是否用iconfont， 用iconfont的需要自己在外部用slot=commandIcon的插槽添加
        },
    ];

    // 用户信息
    userInfo: {
        name: '张三',
        phone: '1234566344',
        img: ''
    };

### method
click: 指令点击事件

userInfoIcon: 用户名字旁边的icon require进来的图片

commandClick(command: string): void {
    if (command === 'linkUs') {
        console.log(111);
    }
}
