import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Button, Modal } from 'antd';
import { formatComponents, findParamKey } from './utils';
import './index.scss';
import { goto, clearAllData } from 'Src/utils/commonFunc';

const confirm = Modal.confirm;
const error = Modal.error;

interface HeaderProps {
    generatePage?: any;
    showTopToolbar?: boolean;
}

@connect(({ generatePage = {}, operate = {} }) => ({
    generatePage,
    operate
}))
class Header extends Component<HeaderProps> {

    /**
     * 清空数据
     */
    clearAllData = () => {
        confirm({
            title: '清空全部配置',
            content: '确认是否清空全部配置，谨慎操作',
            onOk: () => {
                const { generatePage } = this.props;
                const { pageJSON } = generatePage;
                clearAllData(pageJSON.components);
            }
        });
    }

    handleSubmit = () => {
        const { generatePage } = this.props;
        const { pageJSON, pageName } = generatePage;
        if (!pageName) {
            error({
                title: '配置错误',
                content: '请填写页面模板名称！'
            });
            return;
        }
        confirm({
            title: '确认提交配置？',
            content: '请确认提交所写配置，页面名称重复则会覆盖之前的配置，请谨慎。',
            onOk: async() => {
                let components = pageJSON.components;
                if (generatePage.chooseTabName === 'RelationTable') {
                    components = [
                        {
                            componentName: 'RelationTable',
                            components: components
                        }
                    ];
                }
                actions.generatePage.addTemplateItem({
                    pageData: JSON.stringify({
                        components: formatComponents(components),
                        paramKey: findParamKey(pageJSON.components),
                    }),
                    pageName
                });
            }
        });
    }

    render() {
        const { showTopToolbar = false } = this.props;
        return (
            <div className="thanos-common">
                <div className="header">
                    <span className="title">灭霸&nbsp;&nbsp;</span>
                    <span className="sub-title">打个响指，页面就好了</span>
                    {
                        showTopToolbar && <span className="user">
                            <Button className='mar-l-4' onClick={() => {
                                goto('');
                            }}>
                                返回
                            </Button>
                            <Button className='mar-l-4' onClick={() => {
                                this.clearAllData();
                            }}>
                                清空全部配置
                            </Button>
                            <Button
                                className='mar-l-4'
                                type='primary'
                                onClick={this.handleSubmit}
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
