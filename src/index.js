import React from 'react';
import kredux from 'kredux';
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker';
import './index.scss';

const history = createBrowserHistory();

const app = kredux({ history });

app.router([{
  path: '/',
  exact: true,
  component: () => import('./pages/SelectTemplate')
}])

app.render(<div/>, '#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
