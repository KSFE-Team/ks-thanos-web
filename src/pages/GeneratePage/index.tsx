import React, { Component } from 'react';
// import { Icon, Tooltip } from 'antd';
import { connect, actions } from 'kredux';
import Header from '../components/Header';
import { PageRender, ComponentConfig, ComponentsLib } from './components';
import { STATE } from './model/generatePage';
import './index.scss';
import PageConfig from 'Src/pages/GeneratePage/components/Config/PageConfig';
import {Icon, Modal} from 'antd';

const Confirm = Modal.confirm;

interface GeneratePageProps {
    generatePage: {
        pageJSON: any;
        selectedComponentId: string;
        chooseTabName: string,
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
                pageJSON: STATE.pageJSON,
                pageName: STATE.pageName
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
        // const { undoDisable, redoDisable } = this.props.operate;
        const visible = this.getShowConfig().visible;
        const {generatePage} = this.props;
        return (
            <div className="thanos-generate-page-container">
                <Header showTopToolbar={true} />
                <div className="page-wrapper">
                    {/* <div className="left-toolbar">
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
                    </div> */}
                    <div className="page-shower">
                        <div className="canvas">
                            <div className="thanos-page">
                                <div className="thanos-page-operation">
                                    <PageConfig />
                                    <ComponentsLib {...this.props} />
                                </div>
                                <div className="thanos-page-container">
                                    {
                                        generatePage.chooseTabName === 'RelationTable'
                                            ? <div className='item-close-box'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    Confirm({
                                                        title: '请确认删除所有组件',
                                                        content: '删除后其配置会消失，请谨慎操作',
                                                        onOk: () => {
                                                            actions.generatePage.setReducers({
                                                                pageJSON: {
                                                                    name: '', // 页面名称
                                                                    components: [] // 子组件
                                                                }
                                                            });
                                                        }
                                                    });
                                                }}
                                            >
                                                <Icon type='close-circle' className='item-close-icon'/>
                                            </div> : ''
                                    }
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
