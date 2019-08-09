import React, {Component} from 'react';
import {actions} from 'kredux';
import { Drawer } from 'antd';
import * as Components from 'Components';

export default class ComponentConfig extends Component {

    state = {
        dataSource: [],
        count: 0,
        api: ''
    };

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
        })
        return {
            visible,
        }
    }

    onClose = (components) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
            components = pageJSON.components;
        }
        components.forEach((component) => {
            if ('configVisible' in component) {
                component['configVisible'] = false;
            }
        });
        this.setJSON({
            components
        })
    }

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

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    renderConfig = () => {
        const {pageJSON: {components}} = this.props.generatePage;
        const Component = Components[(components.find(({configVisible}) => configVisible) || {}).name];
        if (Component) {
            const Config = Component.config;
            const commonProps = {
                onSave: this.handleSave
            }
            
            return <Config
                {...commonProps}
            />;
        } else {
            return null;
        }
    }

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
                {this.renderConfig()}
            </Drawer>
        );
    }
}
