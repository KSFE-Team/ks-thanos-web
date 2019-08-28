import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    }
};

const KEY = 'key';
const LABEL = 'label';
const PLACEHOLDER = 'placeholder';
const FORMAT = 'format';
const SHOWTIME = 'showTime';

interface RangePickerConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any
}

export default class RangePickerConfig extends Component<RangePickerConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state={
        formData: {
            showTime: true
        },
        isTouch: false
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            let { pageJSON } = props,
                { components } = pageJSON,
                current = components.find(({ configVisible }) => configVisible);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL]
                }
            }
        } else {
            return state
        }
    }

    handleSave = () => {
        const { formData } = this.state;
        let { pageJSON, onSave } = this.props;
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    ...formData,
                    props: {
                        ...component.props,
                        placeholder: formData[LABEL]
                    }
                }
            }
            return component;
        })
        onSave && onSave(pageJSON)
    }

    handleChange = (key, e) => {
        const { formData } = this.state;
        const value = e.target ? e.target.value : e;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    render() {
        const { formData } = this.state;
        return <div>
            <FormItem
                label={'表单项Key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={'表单项名称'}
                {...formItemLayout}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
            <FormItem
                label={'表单项placeholder'}
                {...formItemLayout}
            >
                <Input
                    value={formData[PLACEHOLDER]}
                    placeholder='例如： 开始时间/截止时间'
                    onChange={this.handleChange.bind(this, PLACEHOLDER)}
                />
            </FormItem>
            <FormItem
                label={'日期格式'}
                {...formItemLayout}
            >
                <Input
                    value={formData[FORMAT]}
                    placeholder='例如： YYYY-MM-DD HH:mm:ss'
                    onChange={this.handleChange.bind(this, FORMAT)}
                />
            </FormItem>
            <FormItem
                label={'是否有选择时间功能'}
                {...formItemLayout}
            >
                <Switch
                    checked={formData[SHOWTIME]}
                    onChange={this.handleChange.bind(this, SHOWTIME)}
                />
            </FormItem>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                </Row>
            </FormItem>
        </div>
    }
}
