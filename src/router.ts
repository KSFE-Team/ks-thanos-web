export default [
    {
        path: '/',
        exact: true,
        component: () => import('./pages/SelectTemplate')
    },
    {
        path: '/generatePage',
        exact: true,
        modelList: [
            () => import('./pages/GeneratePage/model/generatePage'),
            () => import('./model/operate'),
        ],
        component: () => import('./pages/GeneratePage')
    }
]