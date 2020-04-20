import React, { Component } from 'react';
import history from '../../../utils/history';
import {
    connect, actions
} from 'kredux';
import { Button, Modal } from 'antd';
import { formatComponents, findParamKey } from './utils';
import html2canvas from 'html2canvas';
import './index.scss';
import {
    goto, clearAllData, getComponents
} from 'Src/utils/commonFunc';
import { parse } from 'qs';
import { checkFieldData } from 'Src/utils/utils';

const confirm = Modal.confirm;
const error = Modal.error;

interface HeaderProps {
    generatePage?: any;
    showTopToolbar?: boolean;
    searchId?: string;
    location?: any;
}

interface HeaderState {
    location: {
        pathname: string;
        search: string;
        hash: string;
        state: any;
    }
}

interface ItemInterface {
    componentName: string,
    components: []
}

@connect(({ generatePage = {}, operate = {} }) => ({
    generatePage,
    operate
}))
export default class Header extends Component<HeaderProps, {}> {

    location: {
        pathname: string;
        search: string;
        hash: string;
        state: any;
    }

    constructor(props) {
        super(props);
        const { location } = history;
        this.location = location;
    }

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

    // 打响指校验
    getErrorList = (components: []) => {
        const tempArr: object[] = [];
        let tempList;
        if (components && components.length > 0) {
            components.forEach((item: ItemInterface) => {
                tempArr.push(checkFieldData(item.componentName, item, 'submit'));
                const {
                    tempArr: newTempArr
                } = this.getErrorList(item.components);
                tempList = tempArr.concat(newTempArr);
            });
        }
        return {
            tempArr,
            tempList
        };
    }

    handleSubmit = (pageOrTemp) => {
        const text = this.props.searchId ? '修改' : '新增';
        const pageOrTempText = pageOrTemp === 'page' ? '页面' : '模版';
        const { generatePage } = this.props;
        const { pageJSON, pageName } = generatePage;
        const { tempList = [] } = this.getErrorList(pageJSON.components);
        const queryString = parse(this.location.search.replace(/\?/g, ''));
        if (pageOrTemp === 'page') {
            let errorlist: any = [];
            tempList.forEach((item) => {
                if (item.error) {
                    errorlist.push(item.message);
                }
            });
            errorlist = Array.from(new Set(errorlist));
            if (errorlist.length > 0) {
                error({
                    title: '配置错误',
                    content: `${errorlist.join(',')}组件,配置信息不完整，请按照提示完成组件配置！`
                });
                return;
            }
            if (!pageName) {
                error({
                    title: '配置错误',
                    content: `请填写页面模板名称！`
                });
                return;
            }
            if (!pageJSON.components.length) {
                error({
                    title: '配置为空',
                    content: `请进行组件配置！`
                });
                return;
            }
        }
        confirm({
            title: `确认提交${text}${pageOrTempText}的所写配置吗？`,
            onOk: async() => {
                let components = pageOrTemp === 'page' ? pageJSON.components : getComponents(pageJSON.components),
                    id: number;
                if (queryString.pageOrTemp === 'page' && pageOrTemp === 'template') {
                    id = 0;
                } else {
                    id = Number(this.props.searchId || 0);
                }
                if (generatePage.chooseTabName === 'RelationTable') {
                    components = [
                        {
                            componentName: 'RelationTable',
                            components: components
                        }
                    ];
                }
                /* 获取截屏 */
                const container: HTMLElement = document.querySelector('.thanos-generate-page-container') || document.body;
                const canvas = await html2canvas(container);
                const ctx: any = canvas.getContext('2d');
                ctx.save();
                ctx.translate(canvas.width / 4, canvas.height / 4);
                ctx.rotate(-(30 * Math.PI / 180));
                ctx.globalAlpha = 0.05;
                ctx.font = '100px Arial';
                ctx.fillStyle = '#000';
                ctx.textAlign = 'center';
                ctx.fillText('灭霸预览图', 0, 50);
                ctx.restore();
                const screenshotSrc: string = canvas.toDataURL('image/jpeg', 0.5);
                actions.generatePage.addOrUpdateItem({
                    postDate: {
                        [pageOrTemp + 'Data']: JSON.stringify({
                            components: formatComponents(components),
                            paramKey: findParamKey(pageJSON.components),
                        }),
                        [pageOrTemp + 'Name']: pageName,
                        id,
                        img: screenshotSrc
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
                                goto('/');
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
