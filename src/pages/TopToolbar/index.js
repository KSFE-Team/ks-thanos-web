import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.scss';
import { actions } from 'kredux';

export default class TopToolbar extends Component {
    state = {  }
    render() {
        return (
            <ul className="thanos-top-toolbar">
                <li onClick={() => {
                    actions.generatePage.insertComponent()
                }}>
                    <Icon type="form" />
                    <div>表单</div>
                </li>
            </ul>
        );
    }
}

