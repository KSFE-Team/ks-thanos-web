export default [
    {
        path: '/',
        exact: true,
        title: '我的模版',
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
