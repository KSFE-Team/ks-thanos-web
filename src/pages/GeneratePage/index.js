import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { connect, actions } from 'kredux';
import Header from '../Header';
import { PageRender, PageConfig, ComponentConfig } from './components';
import './index.scss';

@connect(({ generatePage = {}, operate = {} }) => ({
    generatePage,
    operate
}))
class GeneratePage extends Component {
    state = {  }

    componentDidMount() {
        actions.operate.save({
            modelName: 'generatePage',
            data: {
                count: 0
            },
        });
    }

    render() {
        // const { count } = this.props.generatePage;
        const { undoDisable, redoDisable } = this.props.operate;

        return (
            <div className="thanos-generate-page-container">
                <Header showTopToolbar={true} />
                <div className="page-wrapper">
                    <div className="left-toolbar">
                        <Tooltip placement="right" title="撤销" >
                            <Icon type="undo" style={undoDisable ? { color: '#ccc', cursor: 'not-allowed' } : {}} onClick={undoDisable ? () => {} : () => {
                                actions.operate.undo()
                            }} />
                        </Tooltip>
                        <Tooltip placement="right" title="重做" >
                            <Icon type="redo" style={redoDisable ? { color: '#ccc', cursor: 'not-allowed' } : {}} onClick={redoDisable ? () => {} : () => {
                                actions.operate.redo()
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
                                <div className="thanos-page-container">
                                    <PageRender {...this.props}/>
                                </div>
                                {/*<div className="thanos-page-operation">*/}
                                    {/*<PageConfig {...this.props}/>*/}
                                {/*</div>*/}
                                <ComponentConfig {...this.props}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneratePage;