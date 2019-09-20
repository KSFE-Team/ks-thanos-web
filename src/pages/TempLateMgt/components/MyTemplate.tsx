import React, { Component } from 'react';
import { connect, actions } from 'kredux';
import { Table, Button, Modal } from 'antd';
import './style.scss';
import { goto } from 'Src/utils/commonFunc';

interface MyTemplateProps {
    myTemplate: {
        list: any[];
        limit: number;
        page: number;
        total: number;
        totalPage: number;
    }
}

class MyTemplate extends Component<MyTemplateProps> {
    columns = [
        {
            title: '模板名称',
            dataIndex: 'pageName',
            key: 'pageName'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
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
        actions.myTemplate.getTemplateList();
    }

    componentDidMount() {
        actions.myTemplate.getTemplateList();
    }

    render() {
        const { list = [], page, limit, total } = this.props.myTemplate;
        return (
            <div className="my-template-container">
                <div className="my-template-title">我的模板</div>
                <Table
                    columns={this.columns}
                    dataSource={list}
                    rowKey="id"
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
    myTemplate
}) => ({
    myTemplate
}))(MyTemplate);
