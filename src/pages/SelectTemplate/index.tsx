import React, { Component } from 'react';
import Header from '../components/Header';
import { goto } from 'Src/utils/commonFunc';
import './index.scss';

const titles = ['列表模板', '表单模板', '图表模板', 'H5活动模板'];

export default class SelectTemplate extends Component {
    render() {
        return (
            <div className="thanos-select-template-container">
                <Header />
                <ul className="template-lib-wrapper">
                    {
                        titles.map((title, index) => {
                            return (
                                <li onClick={() => goto('generatePage')} key={index}>
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
