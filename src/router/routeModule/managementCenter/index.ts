import peopleManagement from './peopleManagement';
import scheduleManagement from './scheduleManagement';

export default [
    {
        path: '/managementCenter',
        name: 'managementCenter',
        children: [...peopleManagement, ...scheduleManagement],
        component: () => import('@/layout/menuRouter.vue'),
    },
];
