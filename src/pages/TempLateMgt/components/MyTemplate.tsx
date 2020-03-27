import React, { Component, Fragment } from 'react';
import { connect, actions } from 'kredux';
import { Table, Button, Modal, Form, Input } from 'antd';
import moment from 'moment';
import { goto } from 'Src/utils/commonFunc';
import { SearchForm } from 'Src/bizComponents';
import CuTempLateModal from './CuTempLateModal';
import { STATE } from '../model/myTemplate';
import './style.scss';
interface MyTemplateProps {
    myTemplate: {
        list: any[];
        limit: number;
        page: number;
        total: number;
        totalPage: number;
        pageName: {
            value: string
        },
        cuTempLateModalVisible: boolean
    },
    form: any,
    listLoading: boolean,
    pageOrTemp: string,
    title: string,
}

class MyTemplate extends Component<MyTemplateProps> {

    state = {
        columns: [
            {
                title: this.props.title + '名称',
                dataIndex: this.props.pageOrTemp + 'Name',
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
                            const {pageOrTemp} = this.props;
                            goto(`generatePage/${record[pageOrTemp + 'Name']}?pageOrTemp=${pageOrTemp}&id=${record.id}`);
                        }}>修改</Button>
                        {
                            record.type && +record.type === 1 ? null : <Button className='mar-l-4' type="danger" onClick={() => {
                                Modal.confirm({
                                    title: `确认删除${record[this.props.pageOrTemp + 'Name']}？`,
                                    onOk: () => {
                                        actions.myTemplate.deleteTemplateItem({
                                            pageName: record[this.props.pageOrTemp + 'Name'],
                                            pageOrTemp: this.props.pageOrTemp
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
            page,
        });
        this.loadList();
    }

    loadList = () => {
        actions.myTemplate.getTemplateList({pageOrTemp: this.props.pageOrTemp});
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
        if (this.props.pageOrTemp === 'page') {
            const { columns } = this.state;
            columns.splice(1, 1);
            this.setState({columns});
        }
    }

    render() {
        const { listLoading } = this.props;
        const { list = [], page, limit, total, cuTempLateModalVisible } = this.props.myTemplate;
        return (
            <div className="my-template-container">
                <SearchForm
                    form={this.props.form}
                    components={[
                        {
                            title: this.props.title + '名称',
                            key: 'pageName',
                            component: <Input
                                placeholder={`请输入${this.props.title}名称`}
                                onPressEnter={this.resetPage}
                            />
                        }
                    ]}
                    actions={<Fragment>
                        <Button
                            onClick={this.resetPage}
                        >查询</Button>
                        {this.props.pageOrTemp === 'page' && <Button
                            className='mar-l-4'
                            type='primary'
                            onClick={() => {
                                actions.myTemplate.setReducers({
                                    cuTempLateModalVisible: true,
                                });
                            }}
                        >创建页面</Button>}
                    </Fragment>}
                />
                <Table
                    columns={this.state.columns}
                    dataSource={list}
                    rowKey={this.props.pageOrTemp + 'Name'}
                    loading={listLoading}
                    pagination={{
                        defaultCurrent: 1,
                        current: page,
                        pageSize: limit,
                        total: total,
                        onChange: this.handlePageChange
                    }}
                />
                {cuTempLateModalVisible && <CuTempLateModal/>}
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
            pageName: Form.createFormField({
                ...props.myTemplate.pageName,
                value: props.myTemplate.pageName.value
            }),
        };
    },
    onFieldsChange(props: MyTemplateProps, fields) {
        actions.myTemplate.setReducers({
            ...props.myTemplate,
            ...fields
        });
    }
})(MyTemplate));
