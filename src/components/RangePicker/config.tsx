import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';
import {FormComponentProps} from 'antd/es/form';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';

const FormItem = Form.Item;
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
        isTouch: false,
        current: {
            id: '',
            props: {}
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    props: current.props
                },
                current
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
                const { current } = this.state;
                const {props: fieldProps} = fieldValues;
                const { pageJSON, onSave } = this.props;
                const formData = {
                    key: fieldValues.key,
                    label: fieldValues.label || '',
                    props: {
                        ...current.props,
                        placeholder: [],
                        format: fieldProps.format,
                        showTime: fieldProps.showTimeFormat ? { format: fieldProps.showTimeFormat } : fieldProps.showTime,
                    }
                };
                if (fieldProps.placeholder) {
                    formData.props.placeholder = fieldProps.placeholder.split('/');
                }
                pageJSON.components = saveComponent(current.id, pageJSON.components, formData);
                onSave && onSave(pageJSON);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        const { formData, formData: {props: stateProps = {}} } = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
            >
                {
                    getFieldDecorator('key', {
                        rules: [
                            {required: true, message: `请输入${ALIAS.KEY}`}
                        ],
                        initialValue: formData[KEY]
                    })(
                        <Input
                            placeholder='例如： rangePicker'
                        />
                    )
                }

            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
            >
                {
                    getFieldDecorator('label', {
                        rules: [
                            {required: true, message: `请输入${ALIAS.LABEL}`}
                        ],
                        initialValue: formData[LABEL]
                    })(
                        <Input
                            placeholder='例如： 时间区间'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
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
                label={ALIAS.DATE_FORMAT}
                {...FORMITEM_LAYOUT}
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
                                message: '日期格式化不正确'
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
                label={ALIAS.SHOW_TIME}
                {...FORMITEM_LAYOUT}
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
                    label={ALIAS.TIME_FORMAT}
                    {...FORMITEM_LAYOUT}
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
