import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import Header from '../Header';
import './index.scss';

export default class GeneratePage extends Component {
    state = {  }
    render() {
        return (
            <div className="thanos-generate-page-container">
                <Header showTopToolbar={true} />
                <div className="page-wrapper">
                    <div className="left-toolbar">
                        <Tooltip placement="right" title="撤销" >
                            <Icon type="undo" />
                        </Tooltip>
                        <Tooltip placement="right" title="重做" >
                            <Icon type="redo" />
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

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
