import React, { Component } from 'react';
import TopToolbar from '../TopToolbar';
import { connect } from 'kredux';
import { Button } from 'antd';
import './index.scss';

@connect(({ generatePage = {}, operate = {} }) => ({
    generatePage,
    operate
}))
class Header extends Component {
    render() {
        const { showTopToolbar = false, generatePage } = this.props;
        const { pageJSON } = generatePage;
        return (
            <div className="thanos-common">
                <div className="header">
                    <span className="title">灭霸&nbsp;&nbsp;</span>
                    <span className="sub-title">打个响指，页面就好了</span>
                    {
                        showTopToolbar ? <TopToolbar /> : null
                    }
                    <span className="user" style={showTopToolbar ? { flex: 'none' } : {}}>
                        <Button
                            type='primary'
                            onClick={() => {
                                console.log('pageJSON', JSON.parse(JSON.stringify(pageJSON)));
                            }}
                        >
                            打响指
                        </Button>
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;
