import React, { Component } from 'react';
import Header from '../components/Header';
import { goto } from 'Src/utils/commonFunc';
// import { Table, Card } from 'antd';
import './index.scss';
import MyTemplate from 'Src/pages/TempLateMgt/components/MyTemplate';

const titles = ['列表模板', '表单模板', '图表模板', 'H5活动模板'];

export default class TempLateMgt extends Component {
    render() {
        return (
            <div className="thanos-select-template-container">
                <Header />
                <ul className="template-lib-wrapper">
                    {
                        titles.map((title, index) => {
                            return (
                                <li onClick={() => goto('generatePage/-1')} key={index}>
                                    <div className="title">{title}</div>
                                </li>
                            );
                        })
                    }
                </ul>
                <MyTemplate />
                {/* <Table
                    columns={[
                        {
                            title: '标题',
                            dataIndex: 'title'
                        },
                        {
                            title: '标题',
                            dataIndex: 'title'
                        }
                    ]}
                    dataSource={[
                        {
                            title: '姓名',
                            name: 'caic'
                        }
                    ]}
                /> */}
            </div>
        );
    }
}
