import React, { Component, Fragment } from 'react';
import { connect, actions } from 'kredux';
import { Button, Modal, Form, Input, Pagination, message} from 'antd';
import './style.scss';
import { goto } from 'Src/utils/commonFunc';
import { SearchForm } from 'Src/bizComponents';
import {tempTabs} from 'Src/utils/constants';
import { STATE } from '../model/myTemplate';

interface CuTemplateProps {
    myTemplate: {
        list: any[];
        limit: number;
        page: number;
        total: number;
        totalPage: number;
        pageName: {
            value: string
        },
        type: {
            value: string
        },
        cuTempLateModalVisible: boolean
    },
    form: any,
    listLoading: boolean
}
class CuTempLateModal extends Component<CuTemplateProps> {

    state = {
        tab: 0,
        tempTabs,
        pageOrTempInfo: {
            pageOrTemp: 'template',
            type: '2'
        },
        templateId: '',
    }

    handlePageChange = (page) => {
        actions.myTemplate.setReducers({
            page,
        });
        this.loadList();
    }

    loadList = () => {
        const {pageOrTempInfo} = this.state;
        actions.myTemplate.getTemplateList({...pageOrTempInfo});
    }

    resetPage = () => {
        this.handlePageChange(1);
    }

    componentDidMount() {
        // 初始化redux
        const initialState = {...STATE};
        delete initialState.cuTempLateModalVisible;
        actions.myTemplate.setReducers({
            ...initialState,
        });
        this.loadList();
    }

    changeTabe=(idx) => {
        const { pageOrTempInfo } = this.state;
        if (idx === 0) { // 库模版
            pageOrTempInfo.pageOrTemp = 'template';
            pageOrTempInfo.type = '2';
        } else if (idx === 1) { // 共享模版
            pageOrTempInfo.pageOrTemp = 'template';
            pageOrTempInfo.type = '1';
        } else if (idx === 2) { // 现有页面
            pageOrTempInfo.pageOrTemp = 'page';
            pageOrTempInfo.type = '';
        }
        this.setState({
            tab: idx,
            pageOrTempInfo: pageOrTempInfo
        });
        this.loadList();
    }

    gotoPage=() => {
        actions.myTemplate.setReducers({
            cuTempLateModalVisible: false,
        });
        const { pageOrTempInfo, templateId } = this.state;
        if (templateId === '-1') { // 新增空白页面
            goto(`generatePage/${templateId}`);
        } else {
            goto(`generatePage/${templateId}?pageOrTemp=${pageOrTempInfo.pageOrTemp}`);
        }
        // templateName
    }

    render() {
        const {tempTabs, tab, templateId, pageOrTempInfo} = this.state;
        const {pageOrTemp} = pageOrTempInfo;
        const { listLoading } = this.props;
        const { list = [], page, limit, total, cuTempLateModalVisible } = this.props.myTemplate;
        return (
            <Modal visible={cuTempLateModalVisible} width='75%'
                confirmLoading={ listLoading }
                onCancel = {() => {
                    actions.myTemplate.setReducers({
                        cuTempLateModalVisible: false,
                    });
                    actions.myTemplate.getTemplateList({pageOrTemp: 'page'});
                }}
                onOk={() => {
                    if (!templateId) {
                        message.error('请选择一个选项');
                    } else {
                        this.gotoPage();
                    }
                }}
            >
                <SearchForm
                    form={this.props.form}
                    components={[
                        {
                            title: '模版名称',
                            key: 'pageName',
                            component: <Input
                                placeholder={'请输入模版名称'}
                                onPressEnter={this.resetPage}
                            />
                        }
                    ]}
                    actions={<Fragment>
                        <Button
                            onClick={this.resetPage}
                        >查询</Button>
                        {
                            tempTabs.map((item, idx) => {
                                return (
                                    <Button
                                        key={item.index}
                                        type="primary" className ={ tab === idx ? 'active mar-l-4' : 'mar-l-4' }
                                        onClick={() => { this.changeTabe(idx); }}>
                                        {item.name}
                                    </Button>
                                );
                            })
                        }
                    </Fragment>}
                />
                <ul className='content'>
                    {tab === 0 && <li key={-1} className = { templateId === '-1' ? 'liborder' : '' } onClick={() => this.setState({templateId: '-1'})}>空白模版</li> }
                    {
                        list.length && list.length > 0 ? list.map((item, ind) => {
                            return <li key={ind} className = { templateId === item[pageOrTemp + 'Name'] ? 'liborder' : '' } onClick={() => this.setState({templateId: item[pageOrTemp + 'Name']})}>{item[pageOrTemp + 'Name']}</li>;
                        })
                            : <li key={-2}>暂无数据</li> }
                </ul>
                <Pagination
                    defaultCurrent={1}
                    total={total}
                    current= {page}
                    pageSize={limit}
                    onChange={this.handlePageChange}
                />
            </Modal>
        );
    }
}

export default connect(({
    myTemplate,
    loading
}) => ({
    myTemplate,
    listLoading: loading.effects['myTemplate/getTemplateList']
}))(Form.create({
    mapPropsToFields(props: CuTemplateProps) {
        return {
            pageName: Form.createFormField({
                ...props.myTemplate.pageName,
                value: props.myTemplate.pageName.value
            }),
            type: Form.createFormField({
                ...props.myTemplate.type,
                value: props.myTemplate.type.value
            }),
        };
    },
    onFieldsChange(props: CuTemplateProps, fields) {
        actions.myTemplate.setReducers({
            ...props.myTemplate,
            ...fields
        });
    }
})(CuTempLateModal));
