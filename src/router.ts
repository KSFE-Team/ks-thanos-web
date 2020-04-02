export default [
    {
        path: '/',
        exact: true,
        title: '现有页面',
        modelList: [
            () => import('./pages/ExistingPage/model/existingPage'),
            () => import('./pages/TempLateMgt/model/myTemplate')
        ],
        component: () => import('./pages/ExistingPage')
    },
    {
        path: '/myTemplate',
        exact: true,
        title: '现有模版',
        modelList: [
            () => import('./pages/TempLateMgt/model/myTemplate')
        ],
        component: () => import('./pages/TempLateMgt')
    },
    {
        path: '/generatePage/:name',
        exact: true,
        modelList: [
            () => import('./pages/GeneratePage/model/generatePage'),
            () => import('./pages/GeneratePage/model/operate'),
        ],
        component: () => import('./pages/GeneratePage')
    }
];
