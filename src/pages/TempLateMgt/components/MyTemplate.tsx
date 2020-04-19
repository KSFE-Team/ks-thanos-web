import React, { Component, Fragment } from 'react';
import { connect, actions } from 'kredux';
import { Table, Button, Modal, Form, Input } from 'antd';
import moment from 'moment';
import { goto } from 'Src/utils/commonFunc';
import { SearchForm } from 'Src/bizComponents';
import { STATE } from '../model/myTemplate';
import './style.scss';
interface MyTemplateProps {
    myTemplate: {
        templateList: any[];
        searchTemplateForm:{
            limit: number;
            page: number;
            total: number;
            totalPage: number;
            templateName: {
                value: string
            },
        }
    },
    form: any,
    listLoading: boolean,
}

class MyTemplate extends Component<MyTemplateProps> {

    state = {
        columns: [
            {
                title: '模版名称',
                dataIndex: 'templateName',
            },
            {
                title: '模版类型',
                dataIndex: 'type',
                render: (text) => {
                    switch (`${text}`) {
                        case '1': return '共享模版';
                        case '2': return '库模版';
                        default:
                            break;
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render: (text) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                render: (text) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '操作',
                render: (text: string, record: any) => (
                    <span>
                        <Button type="primary" onClick={() => {
                            goto(`/generatePage/${record.templateName}?pageOrTemp=template&id=${record.id}`);
                        }}>修改</Button>
                        {
                            record.type && +record.type === 1 ? null : <Button className='mar-l-4' type="danger" onClick={() => {
                                Modal.confirm({
                                    title: `确认删除${record.templateName}？`,
                                    onOk: () => {
                                        actions.myTemplate.deleteTemplateItem({
                                            templateName: record.templateName
                                        });
                                    }
                                });
                            }}>删除</Button>
                        }

                    </span>
                )
            }
        ]
    }

    handlePageChange = (page) => {
        actions.myTemplate.setReducers({
            searchTemplateForm: {
                ...this.props.myTemplate.searchTemplateForm,
                page,
            }
        });
        this.loadList();
    }

    loadList = () => {
        actions.myTemplate.getTemplateList({pageOrTemp: 'template'});
    }

    resetPage = () => {
        this.handlePageChange(1);
    }

    componentDidMount() {
        // 初始化redux
        const initialState = {...STATE};
        actions.myTemplate.setReducers({
            ...initialState,
        });
        this.loadList();
    }

    render() {
        const { listLoading } = this.props;
        const { templateList = [], searchTemplateForm } = this.props.myTemplate;
        return (
            <div className="my-template-container">
                <SearchForm
                    form={this.props.form}
                    components={[
                        {
                            title: '模版名称',
                            key: 'templateName',
                            component: <Input
                                placeholder={`请输入模版名称`}
                                onPressEnter={this.resetPage}
                            />
                        }
                    ]}
                    actions={<Fragment>
                        <Button
                            onClick={this.resetPage}
                        >查询</Button>
                    </Fragment>}
                />
                <Table
                    columns={this.state.columns}
                    dataSource={templateList}
                    rowKey={'template' + 'Name'}
                    loading={listLoading}
                    pagination={{
                        defaultCurrent: 1,
                        current: searchTemplateForm.page,
                        pageSize: searchTemplateForm.limit,
                        total: searchTemplateForm.total,
                        onChange: this.handlePageChange
                    }}
                />
            </div>
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
    mapPropsToFields(props: MyTemplateProps) {
        return {
            templateName: Form.createFormField({
                ...props.myTemplate.searchTemplateForm.templateName,
                value: props.myTemplate.searchTemplateForm.templateName.value
            }),
        };
    },
    onFieldsChange(props: MyTemplateProps, fields) {
        actions.myTemplate.setReducers({
            searchTemplateForm: {
                ...props.myTemplate.searchTemplateForm,
                ...fields
            }
        });
    }
})(MyTemplate));
