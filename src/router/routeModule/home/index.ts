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
            {
                path: '/personnelTrack',
                name: 'personnelTrack',
                component: () => import('@/views/personnelTrack.vue'),
            },
            {
                path: '/peopleDynamics',
                name: 'peopleDynamics',
                component: () => import('@/views/peopleDynamics.vue'),
            },
            {
                path: '/scheduleIndex',
                name: 'scheduleIndex',
                component: () => import('@/views/scheduleIndex.vue'),
            },
        ],
    },
];
