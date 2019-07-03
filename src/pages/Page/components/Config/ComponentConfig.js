import React, { Component } from 'react';
import { Drawer } from 'antd';

export default class ComponentConfig extends Component {

    /**
     * 获取显示配置的组件
     */
    getShowConfig = (components) => {
        if (!components) {
            const { pageJSON } = this.props.page;
            components = pageJSON.components;
        }
        let visible = false;
        components.forEach((component) => {
            if (!visible) {
                let childVisible = false;
                if (component.components) {
                    childVisible = this.getShowConfig(component.components).visible;
                }
                if (component.configVisible || childVisible) {
                    visible = true;
                }
            }
        })
        return {
            visible,
        }
    }

    onClose = () => {

    }

    render() {
        return (
            <Drawer
                title="组件配置"
                placement={'right'}
                mask={false}
                // closable={false}
                onClose={this.onClose}
                visible={this.getShowConfig().visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        );
    }
}
