import React, { Component } from 'react';
import Header from '../Header';
import history from 'Src/utils/history';
import './index.scss';

const titles = ['列表模板', '表单模板', '图表模板', 'H5活动模板'];

export default class SelectTemplate extends Component {
    state = {}
    render() {
        return (
            <div className="thanos-select-template-container">
                <Header />
                <ul className="template-lib-wrapper">
                    {
                        titles.map((title, index) => {
                            return (
                                <li onClick={() => history.push('/h5/ks-thanos/generatePage')} key={index}>
                                    <div className="title">{title}</div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}