import React, { Component } from 'react';
import { actions, connect } from 'kredux';
import { Icon, Modal } from 'antd';
import { DND } from 'Src/bizComponents';
import { ALL_TOOLS } from 'Src/components';
import { changeConfig } from 'Src/utils';
import './style.scss';
const Confirm = Modal.confirm;

interface PageRenderProps{
    generatePage: {
        pageJSON: any
    },
    dataSource?: any[]
    selectedComponentId: string
    chooseTabName: string
}

class PageRender extends Component<PageRenderProps> {

    /**
     * 渲染组件
     */
    renderComponent = (component) => {
        const ComponentName = ALL_TOOLS[component.componentName].component;
        if (!ComponentName) {
            console.error('thanos：no present component');
            return null;
        }

        const { props, ...otherProps } = component;

        const componentProps = {
            ...(props || {}),
            config: otherProps,
            generatePage: this.props.generatePage
        };
        return <ComponentName {...componentProps} />;
    };

    /**
     * 点击事件
     */
    handleClick = (item: any, e: any) => {
        e.stopPropagation();
        const { id } = item;
        const { pageJSON } = this.props.generatePage;
        const { components } = pageJSON;
        // const config = {
        //     configVisible: true
        // };
        this.setJSON({
            components: changeConfig(id, components, true)
        });
        actions.generatePage.selectComponent({
            id
        });
    }

    /**
     * 删除组件
     */
    filterComponent = (id: string, components: any[]) => {
        return components.filter((item) => {
            if (id === item.id) {
                return false;
            } else if (item.components) {
                item.components = this.filterComponent(id, item.components);
            }
            return true;
        });
    }

    /**
     * 设置redux
     */
    setRedux = (redux: any) => {
        actions.generatePage.setReducers(redux);
    };

    /**
     * 设置页面配置
     */
    setJSON = (json: any) => {
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
        const {chooseTabName} = this.props;
        const { components } = pageJSON;
        const dataSource = this.props.dataSource || components;
        return (
            <div
                className='render-page'
            >
                <DND
                    onRender={(data) => {
                        return (
                            <div
                                onClick={(e) => {
                                    this.handleClick(data, e);
                                }}
                                className={this.props.selectedComponentId === data.id ? 'page-item component-selected' : 'page-item'}
                            >
                                {this.renderComponent(data)}
                                {
                                    (chooseTabName === 'RelationTable' && data.componentName !== 'Table' && data.componentName !== 'Form') || chooseTabName !== 'RelationTable'
                                        ? <div className='item-close' onClick={(e) => {
                                            e.stopPropagation();
                                            Confirm({
                                                title: '请确认删除组件',
                                                content: '删除后其配置会消失，请谨慎操作',
                                                onOk: () => {
                                                    this.setJSON({
                                                        components: this.filterComponent(data.id, components)
                                                    });
                                                }
                                            });
                                        }}
                                        >
                                            <Icon type='close-circle' className='item-close-icon' />
                                        </div> : ''
                                }
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

export default connect(({ generatePage }) => ({
    selectedComponentId: generatePage.selectedComponentId,
    chooseTabName: generatePage.chooseTabName
}))(PageRender);
