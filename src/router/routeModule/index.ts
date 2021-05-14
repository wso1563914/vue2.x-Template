import Home from './home/index';
export default [
    {
        path: '/',
        // component: () => import('@/layout/menuRouter.vue')
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
    },
    ...Home,
];
