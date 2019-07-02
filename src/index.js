import React from 'react';
import kredux from 'kredux';
import history from 'Src/utils/history'
import * as serviceWorker from './serviceWorker';
import operate from './model/operate';
import './index.scss';

const app = kredux({ history });

app.model(operate);

app.router([{
  path: '/',
  exact: true,
  component: () => import('./pages/SelectTemplate')
}, {
  path: '/generatePage',
  exact: true,
  modelList: [
    () => import('./pages/GeneratePage/model/generatePage')
  ],
  component: () => import('./pages/GeneratePage')
}]);

app.render(<div/>, '#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
