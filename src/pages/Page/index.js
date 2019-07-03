import React, { Component } from 'react';
import { connect } from 'kredux';
import PropTypes from 'prop-types';
import { PageRender, PageConfig, ComponentConfig } from './components';
import './index.scss';


export class Page extends Component {
    static propTypes = {
        page: PropTypes.object // 页面redux
    };

    /**
     * 关闭配置
     */
    onClose = () => {
        // this.setState({
        //     visible: false
        // });
    };

    render() {
        return (
            <div className="thanos-page">
                <div className="thanos-page-container">
                    <PageRender {...this.props}/>
                </div>
                <div className="thanos-page-operation">
                    <PageConfig {...this.props}/>
                </div>
                <ComponentConfig {...this.props}/>
            </div>
        );
    }
}

export default connect(({ page }) => ({
    page
}))(Page);
