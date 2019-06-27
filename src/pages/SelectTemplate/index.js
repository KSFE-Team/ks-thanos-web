import React, { Component } from 'react';
import './index.scss';

export default class SelectTemplate extends Component {
    state = {  }
    render() {
        return (
            <div className="thanos-select-template-container">
                <div className="header">
                    <span className="title">灭霸&nbsp;&nbsp;</span>
                    <span className="sub-title">打个响指，页面就好了</span>
                    <span className="user">欢迎，每一位亲萌！</span>
                </div>
                <ul className="template-lib-wrapper">
                    <li>列表模板</li>
                    <li>表单模板</li>
                    <li>图表模板</li>
                    <li>H5活动模板</li>
                </ul>
            </div>
        );
    }
}