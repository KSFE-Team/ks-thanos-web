import React, { Component } from 'react';
import { Icon } from 'antd';
import './index.scss';
import { actions } from 'kredux';
import * as Components from 'Components';

/**
 * 组件库
 */
const TOOLS = [
    {
        name: 'Table',
        icon: 'table',
        componentName: 'Table'
    }
];

export default class TopToolbar extends Component {
    state = {  }
    render() {
        return (
            <ul className="thanos-top-toolbar">
                {
                    TOOLS.map(({name, icon, componentName}, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    actions.generatePage.insertComponent(Components[componentName].getInitJson())
                                }}
                            >
                                <Icon type={icon} />
                                <div>{name}</div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

