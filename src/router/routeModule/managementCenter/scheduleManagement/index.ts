export default [
    {
        path: 'scheduleIndex',
        name: 'scheduleIndex',
        meta: {
            breadcrumb: ['排班管理', '人员动态'],
            topRoute: 'managementCenter',
            besideRoute: 'scheduleIndex',
        },
        component: () => import('@/views/scheduleIndex.vue'),
    },
];
