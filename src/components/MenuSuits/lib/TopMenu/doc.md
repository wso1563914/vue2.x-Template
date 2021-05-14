# 使用方法

+ 分为三部分：
    + 左边logo
    + 中间menuList
    + 右边其他按钮和用户名

## logo
logo可以传:logo="图片地址"， 或者用slot="logo"自己上传

可以通过内部emit出的logoClick方法响应对logo的点击
`@logoClick="abc"`

## menu
```
:topMenuList="arr"

arr: topMenuItem = {
    path: '/abc',
    name: '首页‘
}

TopMenuItem {
    path: string; // 这里可以填路由中的path或者name
    name: string;
}
```


## right button group

通过slot去添加按钮
`<button slot="otherIcon">按钮</button>`
