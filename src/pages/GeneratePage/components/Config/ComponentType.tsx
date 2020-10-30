
import React, { Component } from 'react';
import { Form, Col, Row, Icon } from 'antd';
import './index.scss';
const FormItem = Form.Item;

interface PageConfigProps {
    dataSource: any[];
    onClick: Function;
    span: number;
    title: string;
}

export default class ComponentType extends Component<PageConfigProps> {

    render() {
        const { dataSource, span, onClick, title } = this.props;
        return (
            <div>
                <div className='component-type-title'>
                    {title}
                </div>
                {
                    dataSource.map((row, index) => {
                        return (
                            <FormItem
                                key={index}
                            >
                                <Row
                                    gutter={6}
                                >
                                    {
                                        row.map((item, idx: number) => {
                                            const { icon, name } = item;
                                            return (
                                                <Col
                                                    span={span}
                                                    key={`${index}_${idx}`}
                                                >
                                                    <div
                                                        className='component-item'
                                                        onClick={() => {
                                                            onClick && onClick(item.componentName);
                                                        }}
                                                    >
                                                        <Icon type={icon} /> {name}
                                                    </div>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </FormItem>
                        );
                    })
                }
            </div>
        );
    }
}
