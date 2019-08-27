import React from 'react';
import kredux from 'kredux';
import history from 'Src/utils/history';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
// import operate from './model/operate';
import './index.scss';

const app = kredux({ history });

app.router([
    {
        path: '/',
        exact: false,
        component: () => import('./pages/SelectTemplate')
    },
    {
        path: '/generatePage',
        exact: false,
        modelList: [
            () => import('./pages/GeneratePage/model/generatePage'),
            () => import('./model/operate'),
        ],
        component: () => import('./pages/GeneratePage')
    }
]);

app.render(<div />, '#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
