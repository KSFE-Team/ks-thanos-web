import React from 'react';
import kredux from 'kredux';
import history from 'Src/utils/history';
import 'antd/dist/antd.css';
import './index.scss';
import router from './router';
import { PROJECT_NAME } from './utils/constants';

const app = kredux({ history });

app.router(router.map((item) => {
    item.path = PROJECT_NAME + item.path;
    return item;
}));

app.render(<div />, '#root');
