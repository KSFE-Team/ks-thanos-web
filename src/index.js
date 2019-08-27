import React from 'react';
import kredux from 'kredux';
import history from 'Src/utils/history';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
// import operate from './model/operate';
import './index.scss';
import router from './router';



const app = kredux({ history });

const env = process.env.NODE_ENV;

const projectName = env === 'production' ? '/h5/ks-thanos' : '';



app.router(router.map((item) => {
    item.path = projectName + item.path;
    return item
}));

app.render(<div />, '#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
