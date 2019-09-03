import React, { Component } from 'react';
import { actions } from 'kredux';
import { Icon, Modal } from 'antd';
import { DND } from 'BizComponents';
import * as Components from 'Components';
import './style.scss';
const Confirm = Modal.confirm;

interface PageRenderProps{
    generatePage: {
        pageJSON: any
    },

}

export default class PageRender extends Component<PageRenderProps> {

    /**
     * 渲染组件
     */
    renderComponent = (component) => {
        const ComponentName = Components[component.componentName].component;
        if (!ComponentName) {
            console.error('thanos：no present component');
            return null;
        }
        const props = {
            ...(component.props || {})
        };
        return <ComponentName {...props} />;
    };

    /**
     * 显示配置界面
     */
    showConfig = (index) => {
        const { pageJSON } = this.props.generatePage;
        const { components } = pageJSON;
        components[index].configVisible = true;
        components.map((item, idx) => {
            if (idx === index) {
                item.configVisible = true;
            } else {
                item.configVisible = false;
            }
            return item;
        });
        this.setJSON({
            components
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
        const { pageJSON } = this.props.generatePage;
        this.setRedux({
            pageJSON: {
                ...pageJSON,
                ...json
            }
        });
    };

    render() {
        const { pageJSON } = this.props.generatePage;
        const { components: dataSource } = pageJSON;
        return (
            <div
                className='render-page'
            >
                <DND
                    onRender={(data, index) => {
                        return (

                            <div
                                onClick={() => {
                                    this.showConfig(index);
                                }}
                                className='page-item'
                            >
                                {this.renderComponent(data)}
                                <div className='item-close'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        Confirm({
                                            title: '请确认删除组件',
                                            content: '删除后其配置会消失，请谨慎操作',
                                            onOk: () => {
                                                this.setJSON({
                                                    components: dataSource.filter((record, idx) => idx !== index)
                                                });
                                            }
                                        });
                                    }}
                                >
                                    <Icon type='close-circle' className='item-close-icon' />
                                </div>
                            </div>
                        );
                    }}
                    dataSource={dataSource}
                    onDragStart={() => {}}
                    onDragEnd={(dataSource) => {
                        this.setJSON({
                            components: dataSource
                        });
                    }}
                />
            </div>
        );
    }
}
