# 使用方法

```
<SidebarMenu
    :menuList="sidebarMenuList"
    :defaultActiveMenu="home"
    active-text-color="#26bee6"
    active-bg="rgba(40, 230, 40, 0.1)"
    @click="handleSidebarClick"
>
</SidebarMenu>
```

## Props
menuList: 二级菜单数组

defaultActiveMenu: String 默认高亮的菜单的name

accordion: 是否手风琴模式

active-text-color：String 选中字的颜色

active-bg: String 选中菜单的背景色

autoPush: Boolean 点击菜单的时候，是否通过菜单组件自动跳转页面

## mehotd
click: 点击菜单的方法，
```
// 输出的menuItem
// interface outMenuItem {
//     path: string; // 当前三级menu的path
//     parentPath: string; // 当前二级的的path
//     menuItem: menuItem; // 当前三级menu的menuItem
// }

handleSidebarClick(path, parentPath, menuItem) {}
```
