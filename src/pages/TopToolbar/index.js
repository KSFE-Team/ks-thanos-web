import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.scss';

export default class TopToolbar extends Component {
    state = {  }
    render() {
        return (
            <ul className="thanos-top-toolbar">
                <li style={{}}>
                    <Icon type="form" />
                    <div>表单</div>
                </li>
            </ul>
        );
    }
}

