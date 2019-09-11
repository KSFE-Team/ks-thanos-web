import React, { Component } from 'react';
import { connect } from 'kredux';
import { Button, Modal, message } from 'antd';
import { formatJSON } from './utils';
import { request } from 'Src/utils';
import { API } from 'Src/api';
import './index.scss';
const confirm = Modal.confirm;

interface HeaderProps {
    generatePage?: any;
    showTopToolbar?: boolean;
}

@connect(({ generatePage = {}, operate = {} }) => ({
    generatePage,
    operate
}))
class Header extends Component<HeaderProps> {
    render() {
        const { showTopToolbar = false, generatePage } = this.props;
        const { pageJSON } = generatePage;
        return (
            <div className="thanos-common">
                <div className="header">
                    <span className="title">灭霸&nbsp;&nbsp;</span>
                    <span className="sub-title">打个响指，页面就好了</span>
                    {
                        showTopToolbar && <span className="user">
                            <Button
                                type='primary'
                                onClick={() => {
                                    confirm({
                                        title: '确认提交配置？',
                                        content: '请确认提交所写配置，页面名称重复则会覆盖之前的配置，请谨慎。',
                                        onOk: async() => {
                                            const response = await request(API.page.save, {
                                                method: 'post',
                                                body: {
                                                    pageData: JSON.stringify(formatJSON(pageJSON)),
                                                    pageName: 'demo'
                                                }
                                            });
                                            if (response && response.errcode === 0) {
                                                message.success('提交配置成功');
                                            }
                                        }
                                    });
                                }}
                            >
                                打响指
                            </Button>
                        </span>
                    }
                </div>
            </div>
        );
    }
}

export default Header;
