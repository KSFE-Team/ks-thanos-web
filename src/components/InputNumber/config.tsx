import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import {FormComponentProps} from 'antd/es/form';
import {ALIAS} from 'Utils/constans';

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
const LABEL = 'label';
const DEFAULT_VALUE = 'defaultValue';
const MIN_VALUE = 'min';
const MAX_VALUE = 'max';
const DISABLED = 'disabled';
const PRECISION = 'precision';
const STEP = 'step';
const KEY = 'key';

interface InputConfigProps extends FormComponentProps{
    pageJSON: any;
    onSave(pageJSON: any): void;
}

class InputNumberConfig extends Component<InputConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state={
        formData: {
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
                    ...current.props,
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                }
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        this.props.form.validateFields((err, fieldValues) => {
            if (!err) {
                if (fieldValues[MIN_VALUE] > fieldValues[MAX_VALUE]) {
                    message.error('最小值不能大于最大值！');
                    return;
                }
                const { pageJSON, onSave } = this.props;
                const key = fieldValues[KEY];
                const label = fieldValues[LABEL];
                delete fieldValues[KEY];
                delete fieldValues[LABEL];
                pageJSON.components = pageJSON.components.map((component) => {
                    if (component.configVisible) {
                        component = {
                            ...component,
                            [KEY]: key,
                            [LABEL]: label,
                            props: {
                                ...component.props,
                                ...fieldValues,
                            }
                        };
                    }
                    return component;
                });
                onSave && onSave(pageJSON);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formData } = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(KEY, {
                        rules: [
                            {required: true, message: '请输入表单key'}
                        ],
                        initialValue: formData[KEY]
                    })(
                        <Input
                            placeholder='例如:inputnumber'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(LABEL, {
                        initialValue: formData[LABEL]
                    })(
                        <Input
                            placeholder='例如:inputnumber'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'默认值'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(DEFAULT_VALUE, {
                        initialValue: formData[DEFAULT_VALUE]
                    })(
                        <InputNumber
                            placeholder='例如:1'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'最小值'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(MIN_VALUE, {
                        initialValue: formData[MIN_VALUE]
                    })(
                        <InputNumber
                            placeholder='例如:1'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'最大值'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(MAX_VALUE, {
                        initialValue: formData[MAX_VALUE]
                    })(
                        <InputNumber
                            placeholder='例如:100'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'是否禁用'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(DISABLED, {
                        initialValue: formData[DISABLED]
                    })(
                        <Radio.Group>
                            <Radio value={true}>true</Radio>
                            <Radio value={false}>false</Radio>
                        </Radio.Group>
                    )
                }
            </FormItem>
            <FormItem
                label={'数值精度'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator(PRECISION, {
                        initialValue: formData[PRECISION]
                    })(
                        <InputNumber
                            max={100}
                            placeholder='例如:100'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'每次改变步数'}
                {...formItemLayout}
            >

                {
                    getFieldDecorator(STEP, {
                        initialValue: formData[STEP]
                    })(
                        <InputNumber
                            placeholder='例如:1'
                        />
                    )
                }
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
        </div>;
    }
}

// @ts-ignore
export default Form.create<InputConfigProps>()(InputNumberConfig);
