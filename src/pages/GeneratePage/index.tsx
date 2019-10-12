import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { connect, actions } from 'kredux';
import Header from '../components/Header';
import { PageRender, ComponentConfig, ComponentsLib } from './components';
import './index.scss';
import PageConfig from 'Src/pages/GeneratePage/components/Config/PageConfig';

interface GeneratePageProps {
    generatePage: {
        pageJSON: any;
        selectedComponentId: string;
     };
    operate: {
        undoDisable: any;
        redoDisable: any;
    };
    match: {
        params: {
            name: string;
        }
    }
}

@connect(({ generatePage = {}, operate = {} }) => ({
    generatePage,
    operate
}))
class GeneratePage extends Component<GeneratePageProps> {

    componentDidMount() {
        actions.operate.save({
            modelName: 'generatePage',
            data: {
                count: 0
            },
        });
        if (this.props.match.params.name !== '-1') {
            actions.generatePage.getTemplateItem({
                pageName: this.props.match.params.name
            });
        } else {
            actions.generatePage.setReducers({
                pageName: ''
            });
        }
    }

    componentWillUnmount() {
        actions.generatePage.selectComponent({
            id: ''
        });
    }

    /**
     * 获取显示配置的组件
     */
    getShowConfig = (components?) => {
        if (!components) {
            const { pageJSON } = this.props.generatePage;
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

    render() {
        const { undoDisable, redoDisable } = this.props.operate;
        const visible = this.getShowConfig().visible;
        return (
            <div className="thanos-generate-page-container">
                <Header showTopToolbar={true} />
                <div className="page-wrapper">
                    <div className="left-toolbar">
                        <Tooltip placement="right" title="撤销" >
                            <Icon type="undo" style={undoDisable ? { color: '#ccc', cursor: 'not-allowed' } : {}} onClick={undoDisable ? () => { } : () => {
                                actions.operate.undo();
                            }} />
                        </Tooltip>
                        <Tooltip placement="right" title="重做" >
                            <Icon type="redo" style={redoDisable ? { color: '#ccc', cursor: 'not-allowed' } : {}} onClick={redoDisable ? () => { } : () => {
                                actions.operate.redo();
                            }} />
                        </Tooltip>
                        <Tooltip placement="right" title="放大" >
                            <Icon type="plus" />
                        </Tooltip>
                        <span className="scale-percent">100%</span>
                        <Tooltip placement="right" title="缩小" >
                            <Icon type="minus" />
                        </Tooltip>
                    </div>
                    <div className="page-shower">
                        <div className="canvas">
                            <div className="thanos-page">
                                <div className="thanos-page-operation">
                                    <PageConfig />
                                    <ComponentsLib {...this.props} />
                                </div>
                                <div className="thanos-page-container">
                                    <PageRender {...this.props} />
                                </div>
                                {
                                    visible && <ComponentConfig {...this.props} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneratePage;
