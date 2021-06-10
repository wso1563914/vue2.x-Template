import Login from './login';
import Home from './home';
import managementCenter from './managementCenter';
export default [
    {
        path: '/',
        // component: () => import('@/layout/menuRouter.vue')
        redirect: '/login',
    },
    {
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: '404' */ '@/views/404/index.vue'),
    },
    ...Home,
    ...Login,
    ...managementCenter,
];

// import DataManagement from './dataManagement';
// const MenuLayout: any = () => import('@/layout/menuRouter.vue');

// let routers: any = [
//     {
//         path: '/',
//         redirect: '/home',
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: Login,
//     },
//     {
//         path: '/',
//         name: 'layout',
//         component: MenuLayout,
//         children: [Home, DataManagement],
//     },
//     {
//         path: '*',
//         name: '404',
//         component: () => import(/* webpackChunkName: '404' */ '@/views/404/index.vue'),
//     },
// ];

// export default routers;
