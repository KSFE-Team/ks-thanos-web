import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';
import {FormComponentProps} from 'antd/es/form';

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

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const KEY = 'key';
const LABEL = 'label';
const PLACEHOLDER = 'placeholder';
const FORMAT = 'format';
const SHOWTIME = 'showTime';
// const SHOWTIMEFORMAT = 'showTimeFormat';

interface RangePickerConfigProps extends FormComponentProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

class RangePickerConfig extends Component<RangePickerConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state={
        formData: {
            props: {}
        },
        isTouch: false
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    props: current.props
                }
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        this.props.form.validateFields((err, fieldValues) => {
            if (!err) {
                this.setState({
                    formData: {
                        ...fieldValues
                    },
                    isTouch: true
                });

                const {props: fieldProps} = fieldValues;
                const { pageJSON, onSave } = this.props;
                pageJSON.components = pageJSON.components.map((component) => {
                    if (component.configVisible) {
                        component = {
                            ...component,
                            key: fieldValues.key,
                            label: fieldValues.label || '',
                            props: {
                                ...component.props,
                                format: fieldProps.format,
                                showTime: fieldProps.showTimeFormat ? {format: fieldProps.showTimeFormat} : fieldProps.showTime,
                                // showTimeFormat: fieldProps.showTimeFormat
                            }
                        };
                        if (fieldProps.placeholder) {
                            component.props.placeholder = fieldProps.placeholder.split('/');
                        }
                    }
                    return component;
                });
                onSave && onSave(pageJSON);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        const { formData, formData: {props: stateProps} } = this.state;
        return <div>
            <FormItem
                label={'表单项Key'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('key', {
                        rules: [
                            {required: true, message: '请输入表单字段名'}
                        ],
                        initialValue: formData[KEY]
                    })(
                        <Input
                            placeholder='例如： name'
                        />
                    )
                }

            </FormItem>
            <FormItem
                label={'表单项名称'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('label', {
                        initialValue: formData[LABEL]
                    })(
                        <Input
                            placeholder='例如： 姓名'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'表单项placeholder'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('props.placeholder', {
                        rules: [
                            {
                                validator: (rule, value, callback) => {
                                    if (!value) {
                                        callback();
                                    }
                                    if (value && !/^[^/\s]+\/[^/\s]+$/.test(value)) {
                                        callback(rule.message);
                                    }
                                    callback();
                                },
                                message: '用/分割的两个名称'
                            }
                        ],
                        initialValue: stateProps[PLACEHOLDER] ? stateProps[PLACEHOLDER].join('/') : '开始时间/截止时间'
                    })(
                        <Input
                            placeholder='例如： 开始时间/截止时间'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'日期格式'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('props.format', {
                        rules: [
                            {
                                validator: (rule, value, callback) => {
                                    if (!value) {
                                        callback();
                                    }
                                    if (value && getFieldValue('showTime') && !/^[^/\s]+ [^/\s]+$/.test(value)) {
                                        callback(rule.message);
                                    }
                                    callback();
                                },
                                message: '时间格式化不正确'
                            }
                        ],
                        initialValue: stateProps[FORMAT] || `${DATE_FORMAT} ${TIME_FORMAT}`
                    })(
                        <Input
                            placeholder={`例如：${DATE_FORMAT} ${TIME_FORMAT}`}
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'是否有选择时间功能'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('props.showTime', {
                        valuePropName: 'checked',
                        initialValue: (stateProps[SHOWTIME] || stateProps[SHOWTIME] === false) ? stateProps[SHOWTIME] : true
                    })(
                        <Switch
                            onChange={(value) => {
                                if (!value) {
                                    setFieldsValue({'props.format': DATE_FORMAT});
                                } else {
                                    setFieldsValue({'props.format': `${DATE_FORMAT} ${TIME_FORMAT}`});
                                }
                            }}
                        />
                    )
                }
            </FormItem>
            {
                getFieldValue('props.showTime') && <FormItem
                    label={'时间格式'}
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('props.showTimeFormat', {
                            initialValue: (typeof stateProps[SHOWTIME]) === 'object' ? stateProps[SHOWTIME].format : ''
                        })(
                            <Input
                                placeholder={`例如：${TIME_FORMAT}`}
                            />
                        )
                    }
                </FormItem>
            }
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
        </div>;
    }
}

// @ts-ignore
export default Form.create<RangePickerConfigProps>()(RangePickerConfig);
