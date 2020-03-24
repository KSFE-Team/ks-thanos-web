import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import { FormComponentProps } from 'antd/es/form';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { checkFieldData } from 'Src/utils/utils';
import ClearButton from 'Src/components/ClearButton';
import { initState } from './utils';

const FormItem = Form.Item;
const LABEL = 'label';
const DEFAULT_VALUE = 'initialValue';
const PLACEHOLDER = 'placeholder';
const MIN_VALUE = 'min';
const MAX_VALUE = 'max';
const DISABLED = 'disabled';
const PRECISION = 'precision';
const STEP = 'step';
const KEY = 'key';

interface InputConfigProps extends FormComponentProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

class InputNumberConfig extends Component<InputConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = initState

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    ...current.props,
                    [DEFAULT_VALUE]: current[DEFAULT_VALUE],
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
        const { formData } = this.state;
        if (formData[MIN_VALUE] > formData[MAX_VALUE]) {
            message.error('最小值不能大于最大值！');
            return;
        }
        const { current } = this.state;
        const { pageJSON, onSave } = this.props;
        const key = formData[KEY];
        const label = formData[LABEL];
        const initialValue = formData[DEFAULT_VALUE];
        delete formData[KEY];
        delete formData[LABEL];
        delete formData[DEFAULT_VALUE];
        for (const key in formData) {
            if (!formData[key] && formData[key] !== 0) {
                delete formData[key];
            }
        }
        const { error } = checkFieldData('InputNumber', { key, label });
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            [KEY]: key,
            [LABEL]: label,
            [DEFAULT_VALUE]: initialValue,
            props: {
                ...current.props,
                ...formData,
            }
        });
        onSave && onSave(pageJSON);
    }

    handleChangeValue = (type, value) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [type]: value
            },
            isTouch: true
        });
    }

    render() {
        const { formData } = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    placeholder='例如:inputnumber'
                    value={formData[KEY] || ''}
                    onChange={(e) => { this.handleChangeValue(KEY, e.target.value); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    placeholder='例如:inputnumber'
                    value={formData[LABEL]}
                    onChange={(e) => { this.handleChangeValue(LABEL, e.target.value); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    placeholder='例如:inputnumber'
                    value={formData[PLACEHOLDER]}
                    onChange={(e) => { this.handleChangeValue(PLACEHOLDER, e.target.value); }}
                />
            </FormItem>
            <FormItem
                label={'默认值'}
                {...FORMITEM_LAYOUT}
            >
                <InputNumber
                    placeholder='例如:1'
                    value={formData[DEFAULT_VALUE]}
                    onChange={(value) => { this.handleChangeValue(DEFAULT_VALUE, value); }}
                />
            </FormItem>
            <FormItem
                label={'最小值'}
                {...FORMITEM_LAYOUT}
            >
                <InputNumber
                    placeholder='例如:1'
                    value={formData[MIN_VALUE]}
                    onChange={(value) => { this.handleChangeValue(MIN_VALUE, value); }}
                />
            </FormItem>
            <FormItem
                label={'最大值'}
                {...FORMITEM_LAYOUT}
            >
                <InputNumber
                    placeholder='例如:100'
                    value={formData[MAX_VALUE]}
                    onChange={(value) => { this.handleChangeValue(MAX_VALUE, value); }}
                />
            </FormItem>
            <FormItem
                label={'是否禁用'}
                {...FORMITEM_LAYOUT}
            >
                <Radio.Group
                    value={formData[DISABLED]}
                    onChange={(e) => { this.handleChangeValue(DISABLED, e.target.value); }}
                >
                    <Radio value={true}>true</Radio>
                    <Radio value={false}>false</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem
                label={'数值精度'}
                {...FORMITEM_LAYOUT}
            >
                <InputNumber
                    max={100}
                    placeholder='例如:100'
                    value={formData[PRECISION]}
                    onChange={(value) => { this.handleChangeValue(PRECISION, value); }}
                />
            </FormItem>
            <FormItem
                label={'每次改变步数'}
                {...FORMITEM_LAYOUT}
            >
                <InputNumber
                    placeholder='例如:1'
                    value={formData[STEP]}
                    onChange={(value) => { this.handleChangeValue(STEP, value); }}
                />
                {/* {
                    getFieldDecorator(STEP, {
                        initialValue: formData[STEP]
                    })(
                        <InputNumber
                            placeholder='例如:1'
                        />
                    )
                } */}
            </FormItem>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this} type='InputNumber' />
                </Row>
            </FormItem>
        </div>;
    }
}

// @ts-ignore
export default Form.create<InputConfigProps>()(InputNumberConfig);
