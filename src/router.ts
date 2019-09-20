export default [
    {
        path: '/',
        exact: true,
        component: () => import('./pages/TempLateMgt')
    },
    {
        path: '/generatePage',
        exact: true,
        modelList: [
            () => import('./pages/GeneratePage/model/generatePage'),
            () => import('./pages/GeneratePage/model/operate'),
        ],
        component: () => import('./pages/GeneratePage')
    }
];
