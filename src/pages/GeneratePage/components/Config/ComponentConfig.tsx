import React, {Component} from 'react';
import {actions} from 'kredux';
import { Drawer } from 'antd';
import { ALL_TOOLS } from 'Src/components';
import { changeConfig } from 'Src/utils';

interface ComponentConfigProps{
    generatePage: {
        pageJSON: any;
        selectedComponentId: string;
    };
}
export default class ComponentConfig extends Component<ComponentConfigProps> {
    /**
     * 获取显示配置的组件
     */
    getShowConfig = (components?) => {
        const {pageJSON, selectedComponentId} = this.props.generatePage;
        if (!components) {
            components = pageJSON.components;
        }
        let visible = false,
            component;
        components.forEach((item: any) => {
            if (!visible) {
                if (item.id === selectedComponentId) {
                    visible = true;
                    component = item;
                    return;
                }
                if (item.components) {
                    const config = this.getShowConfig(item.components);
                    if (config.visible) {
                        visible = true;
                        component = config.component;
                    }
                }
            }
        });
        return {
            visible,
            component
        };
    };

    onClose = (components?) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
            components = pageJSON.components;
        }
        const { component } = this.getShowConfig();
        this.setJSON({
            components: changeConfig(component.id, components, {
                configVisible: false
            })
        });
        actions.generatePage.selectComponent({
            id: ''
        });
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

    handleSave = (pageJSON) => {
        this.setRedux(pageJSON);
        this.onClose();
    };

    /**
     * 组件配置渲染
     */
    renderConfig = () => {
        const { pageJSON } = this.props.generatePage;
        const { component } = this.getShowConfig();
        const Component = ALL_TOOLS[(component || {}).componentName];
        if (Component) {
            const Config = Component.config;
            const commonProps = {
                pageJSON,
                onSave: this.handleSave
            };

            return <Config
                {...commonProps}
            />;
        } else {
            return null;
        }
    };

    render() {
        const { selectedComponentId } = this.props.generatePage;
        return (
            <Drawer
                width={700}
                title="组件配置"
                placement="right"
                mask={false}
                onClose={() => {
                    this.onClose();
                }}
                visible={!!selectedComponentId}
            >
                {this.renderConfig()}
            </Drawer>
        );
    }
}
