import React, {Component} from 'react';
import {actions} from 'kredux';
import { Drawer } from 'antd';
import { ALL_TOOLS } from 'Src/components';
import { changeConfig } from 'Src/utils';

interface ComponentConfigProps{
    generatePage: {pageJSON: any};
}
export default class ComponentConfig extends Component<ComponentConfigProps> {

    state = {
        visible: false,
        component: {
            id: '',
            componentName: ''
        }
    }

    componentDidMount() {
        this.setState({
            ...this.getShowConfig()
        });
    }

    /**
     * 获取显示配置的组件
     */
    getShowConfig = (components?) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
            components = pageJSON.components;
        }
        let visible = false,
            component;
        components.forEach((item: any) => {
            if (!visible) {
                if (item.configVisible) {
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
        const { component } = this.state;
        this.setJSON({
            components: changeConfig(component.id, components, {
                configVisible: false
            })
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

    renderConfig = () => {
        const { pageJSON } = this.props.generatePage;
        const { component } = this.state;
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
        const { visible } = this.state;
        return (
            <Drawer
                width={700}
                title="组件配置"
                placement="right"
                mask={false}
                onClose={() => {
                    this.onClose();
                }}
                visible={visible}
            >
                {this.renderConfig()}
            </Drawer>
        );
    }
}
