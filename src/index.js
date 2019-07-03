import React from 'react';
import kredux from 'kredux';
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './index.scss';

const history = createBrowserHistory();

const app = kredux({ history });

app.router([
    {
        path: '/',
        exact: true,
        component: () => import('./pages/SelectTemplate'),
    },
    {
        path: '/page',
        exact: true,
        component: () => import('./pages/Page'),
        modelList: [
            () => import('./pages/Page/model'),
        ]
    }
]);

app.render(<div/>, '#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
