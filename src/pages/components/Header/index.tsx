import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Button, Modal } from 'antd';
import { formatComponents, findParamKey } from './utils';
import './index.scss';
import { goto, clearAllData, getComponents } from 'Src/utils/commonFunc';

const confirm = Modal.confirm;
const error = Modal.error;

interface HeaderProps {
    generatePage?: any;
    showTopToolbar?: boolean;
    searchId?: string;
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

    handleSubmit = (pageOrTemp) => {
        const text = this.props.searchId ? '修改' : '新增';
        const pageOrTempText = pageOrTemp === 'page' ? '页面' : '模版';
        const { generatePage } = this.props;
        const { pageJSON, pageName } = generatePage;
        if (!pageName) {
            error({
                title: '配置错误',
                content: `请填写页面模板名称！`
            });
            return;
        }
        confirm({
            title: `确认提交${text}${pageOrTempText}的所写配置吗？`,
            onOk: async() => {
                // let components = pageJSON.components;
                // console.log([...pageJSON.components], pageJSON.components);
                let components = pageOrTemp === 'page' ? pageJSON.components : getComponents(pageJSON.components);
                if (generatePage.chooseTabName === 'RelationTable') {
                    components = [
                        {
                            componentName: 'RelationTable',
                            components: components
                        }
                    ];
                }
                actions.generatePage.addOrUpdateItem({
                    postDate: {
                        [pageOrTemp + 'Data']: JSON.stringify({
                            components: formatComponents(components),
                            paramKey: findParamKey(pageJSON.components),
                        }),
                        [pageOrTemp + 'Name']: pageName,
                        id: Number(this.props.searchId || 0)
                    },
                    pageOrTemp
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
                            <Button className='mar-l-4' type='primary'
                                onClick={() => this.handleSubmit('template')}
                            >
                                生成模板
                            </Button>
                            <Button
                                className='mar-l-4'
                                type='primary'
                                onClick={() => this.handleSubmit('page')}
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
