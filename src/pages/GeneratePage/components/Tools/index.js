import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './index.scss';

export default class Tools extends Component {
    static propTypes = {
        tool: PropTypes.object, // 工具操作对象
    }

    render() {
        const { tool } = this.props;
        return (
            <div
                title={tool.title}
                key={tool.icon}
                className="thanos-page-config-tools-icon"
            >
                <Icon type={tool.icon} />
            </div>
        );
    }
}
