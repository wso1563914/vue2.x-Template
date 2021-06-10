export default [
    {
        path: 'personnelTrack',
        name: 'personnelTrack',
        meta: {
            breadcrumb: ['人员管理', '人员轨迹'],
            topRoute: 'managementCenter',
            besideRoute: 'personnelTrack',
        },
        component: () => import('@/views/personnelTrack.vue'),
    },
];
