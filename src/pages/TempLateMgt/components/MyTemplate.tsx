import React, { Component, Fragment } from 'react';
import { connect, actions } from 'kredux';
import { Table, Button, Modal, Form, Input } from 'antd';
import './style.scss';
import { goto } from 'Src/utils/commonFunc';
import { SearchForm } from 'Src/bizComponents';

interface MyTemplateProps {
    myTemplate: {
        list: any[];
        limit: number;
        page: number;
        total: number;
        totalPage: number;
        pageName: {
            value: string
        }
    },
    form: any,
    listLoading: boolean
}

class MyTemplate extends Component<MyTemplateProps> {

    columns = [
        {
            title: '模板名称',
            dataIndex: 'pageName',
        },
        {
            title: '操作',
            render: (text: string, record: any) => (
                <span>
                    <Button type="primary" onClick={() => {
                        goto(`generatePage/${record.pageName}`);
                    }}>修改</Button>
                    <Button className='mar-l-4' type="danger" onClick={() => {
                        Modal.confirm({
                            title: `确认删除${record.pageName}？`,
                            onOk: () => {
                                actions.myTemplate.deleteTemplateItem({
                                    pageName: record.pageName
                                });
                            }
                        });
                    }}>删除</Button>
                </span>
            )
        }
    ]

    handlePageChange = (page) => {
        actions.myTemplate.setReducers({
            page,
        });
        this.loadList();
    }

    loadList = () => {
        actions.myTemplate.getTemplateList();
    }

    resetPage = () => {
        this.handlePageChange(1);
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        const { listLoading } = this.props;
        const { list = [], page, limit, total } = this.props.myTemplate;
        return (
            <div className="my-template-container">
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
                        <Button
                            className='mar-l-4'
                            type='primary'
                            onClick={() => {
                                goto(`generatePage/-1`);
                            }}
                        >创建模版</Button>
                    </Fragment>}
                />
                <Table
                    columns={this.columns}
                    dataSource={list}
                    rowKey="id"
                    loading={listLoading}
                    pagination={{
                        defaultCurrent: 1,
                        current: page,
                        pageSize: limit,
                        total: total,
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
