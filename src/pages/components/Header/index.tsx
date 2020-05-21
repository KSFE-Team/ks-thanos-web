import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Button, Modal } from 'antd';
import { formatComponents, findParamKey } from './utils';
import './index.scss';
import { goto, clearAllData, getComponents} from 'Src/utils/commonFunc';
import { checkFieldData } from 'Src/utils/utils';

const confirm = Modal.confirm;
const error = Modal.error;

interface HeaderProps {
    generatePage?: any;
    showTopToolbar?: boolean;
    searchId?: string;
}

interface ItemInterface {
    componentName: string,
    components: []
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

    handleSubmit = async(pageOrTemp) => {
        const text = this.props.searchId ? '修改' : '新增';
        const pageOrTempText = pageOrTemp === 'page' ? '页面' : '模版';
        const { generatePage } = this.props;
        const { pageJSON, pageName } = generatePage;
        if (pageOrTemp !== 'page') {
            await actions.generatePage.setReducers({
                toTempPageJSON: {
                    name: pageJSON.name, // 页面名称
                    components: pageJSON.components // 子组件
                },
            });
        }

        const { tempList } = this.getErrorList(pageJSON.components);
        let errorlist: any = [];
        tempList && tempList.forEach((item) => { // tempList未配置数据就打响指为undefined
            if (item.error) {
                errorlist.push(item.message);
            }
        });
        errorlist = Array.from(new Set(errorlist));
        if (errorlist.length > 0 && pageOrTemp === 'page') { // 模板不需要配置
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
        confirm({
            title: `确认提交${text}${pageOrTempText}的所写配置吗？`,
            onOk: async() => {
                const {toTempPageJSON} = this.props.generatePage;
                let components = pageOrTemp === 'page' ? pageJSON.components : getComponents(JSON.parse(JSON.stringify(toTempPageJSON.components)));
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
