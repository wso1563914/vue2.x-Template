export default [
    {
        path: '/mid',
        component: () => import('@/layout/menuRouter.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
            },
        ],
    },
];
