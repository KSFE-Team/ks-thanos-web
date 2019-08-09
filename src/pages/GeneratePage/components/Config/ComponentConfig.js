import React, { Component } from 'react';
import { actions } from 'kredux';
import { Drawer } from 'antd';
import TableConfig from '../../../../components/Table/config';

export default class ComponentConfig extends Component {

    /**
     * 获取显示配置的组件
     */
    getShowConfig = (components) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
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
        });
        return {
            visible,
        }
    };

    onClose = (components) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
            components = pageJSON.components;
        }
        components.forEach((component) => {
            if ('configVisible' in component) {
                component['configVisible'] = false;
                if (component.components) {
                    this.onClose(component.components);
                }
            }
        });
        this.setJSON({
            components
        })
    };

    /**
     * 设置redux
     */
    setRedux = (redux) => {
        actions.generatePage.setReducers(redux);
    };

    /**
     * 设置页面配置
     */
    setJSON = (json) => {
        const {pageJSON} = this.props.generatePage;
        this.setRedux({
            pageJSON: {
                ...pageJSON,
                ...json
            }
        });
    };

    render() {

        return (
            <Drawer
                width={700}
                title="组件配置"
                placement={'right'}
                mask={false}
                onClose={() => {
                    this.onClose();
                }}
                visible={this.getShowConfig().visible}
            >
                <TableConfig dataSource={this.props.generatePage} />
            </Drawer>
        );
    }
}
