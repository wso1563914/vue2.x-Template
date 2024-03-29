export default {
    code: 0,
    msg: null,
    data: [
        {
            id: 11000,
            parentId: -1,
            code: null,
            name: 'home',
            children: [],
            hasChildren: false,
            icon: '',
            spread: false,
            path: 'home',
            keepAlive: '0',
            permission: null,
            type: '0',
            title: '首页',
            sort: 3,
        },
        {
            id: 12000,
            parentId: -1,
            code: null,
            name: 'managementCenter',
            children: [
                {
                    id: 12100,
                    parentId: 12000,
                    code: null,
                    name: 'peopleManagement',
                    children: [
                        {
                            id: 20004,
                            parentId: 12100,
                            code: null,
                            name: 'personnelTrack',
                            children: [],
                            hasChildren: false,
                            icon: null,
                            spread: false,
                            path: 'personnelTrack',
                            keepAlive: '0',
                            permission: null,
                            type: '0',
                            title: '人员轨迹',
                            sort: 2,
                        },
                        {
                            id: 20002,
                            parentId: 12100,
                            code: null,
                            name: 'home',
                            children: [],
                            hasChildren: false,
                            icon: 'icondelete2x',
                            spread: false,
                            path: 'home',
                            keepAlive: '0',
                            permission: null,
                            type: '0',
                            title: '人员动态',
                            sort: 0,
                        },
                    ],
                    hasChildren: true,
                    icon: 'icondelete2x',
                    isFont: true,
                    spread: false,
                    path: 'peopleManagement',
                    keepAlive: '0',
                    permission: null,
                    type: '0',
                    title: '人员管理',
                    sort: 0,
                },
                {
                    id: 12200,
                    parentId: 12000,
                    code: null,
                    name: 'scheduleManagement',
                    children: [
                        {
                            id: 20005,
                            parentId: 12200,
                            code: null,
                            name: 'scheduleIndex',
                            children: [],
                            hasChildren: false,
                            icon: null,
                            spread: false,
                            path: 'scheduleIndex',
                            keepAlive: '0',
                            permission: null,
                            type: '0',
                            title: '排班管理',
                            sort: 0,
                        },
                    ],
                    hasChildren: true,
                    icon: 'icon-navicon-zdgl',
                    spread: false,
                    path: 'scheduleManagement',
                    keepAlive: '0',
                    permission: null,
                    type: '0',
                    title: '排班管理',
                    sort: 1,
                },
            ],
            hasChildren: true,
            icon: '',
            spread: false,
            path: 'managementCenter',
            keepAlive: '0',
            permission: null,
            type: '0',
            title: '管理中心',
            sort: 4,
        },

        {
            id: 13000,
            parentId: -1,
            code: null,
            name: 'managementCenter1111',
            children: [
                {
                    id: 13100,
                    parentId: 13000,
                    code: null,
                    name: 'travelManagement',
                    children: [
                        {
                            id: 30002,
                            parentId: 13100,
                            code: null,
                            name: 'peopleDynamics',
                            children: [],
                            hasChildren: false,
                            icon: 'icondelete2x',
                            spread: false,
                            path: 'peopleDynamics',
                            keepAlive: '0',
                            permission: null,
                            type: '0',
                            title: '旅游人员动态',
                            sort: 0,
                            isFont: true,
                        },
                    ],
                    hasChildren: true,
                    icon: 'icondelete2x',
                    spread: false,
                    path: 'travelManagement',
                    keepAlive: '0',
                    permission: null,
                    type: '0',
                    title: '旅游管理',
                    sort: 0,
                },
            ],
            hasChildren: true,
            icon: '',
            spread: false,
            path: 'managementCenter1111',
            keepAlive: '0',
            permission: null,
            type: '0',
            title: '旅游中心',
            sort: 4,
        },
    ],
};
