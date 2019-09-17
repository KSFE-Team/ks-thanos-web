import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import {FormComponentProps} from 'antd/es/form';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';

const FormItem = Form.Item;
const LABEL = 'label';
const DEFAULT_VALUE = 'defaultValue';
const PLACEHOLDER = 'placeholder';
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
                    ...current.props,
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
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
                if (fieldValues[MIN_VALUE] > fieldValues[MAX_VALUE]) {
                    message.error('最小值不能大于最大值！');
                    return;
                }
                const { current } = this.state;
                const { pageJSON, onSave } = this.props;
                const key = fieldValues[KEY];
                const label = fieldValues[LABEL];
                delete fieldValues[KEY];
                delete fieldValues[LABEL];
                pageJSON.components = saveComponent(current.id, pageJSON.components, {
                    [KEY]: key,
                    [LABEL]: label,
                    props: {
                        ...current.props,
                        ...fieldValues,
                    }
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
                {...FORMITEM_LAYOUT}
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
                {...FORMITEM_LAYOUT}
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
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                {
                    getFieldDecorator(PLACEHOLDER, {
                        initialValue: formData[PLACEHOLDER]
                    })(
                        <Input
                            placeholder='例如:inputnumber'
                        />
                    )
                }
            </FormItem>
            <FormItem
                label={'默认值'}
                {...FORMITEM_LAYOUT}
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
                {...FORMITEM_LAYOUT}
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
                {...FORMITEM_LAYOUT}
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
                {...FORMITEM_LAYOUT}
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
                {...FORMITEM_LAYOUT}
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
                {...FORMITEM_LAYOUT}
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
