import React, { Component } from 'react';
import TopToolbar from '../TopToolbar';
import './index.scss';

export default class Header extends Component {
    render() {
        const { showTopToolbar = false } = this.props;

        return (
            <div className="thanos-common">
                <div className="header">
                    <span className="title">灭霸&nbsp;&nbsp;</span>
                    <span className="sub-title">打个响指，页面就好了</span>
                    {
                        showTopToolbar ? <TopToolbar /> : null
                    }
                    <span className="user" style={showTopToolbar ? { flex: 'none' } : {}}>欢迎，每一位亲萌！</span>
                </div>
            </div>
        );
    }
}
