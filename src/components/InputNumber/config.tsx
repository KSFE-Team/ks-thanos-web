import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Radio } from 'antd';
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
const LABEL = 'label';
const DEFAULT_VALUE = 'defaultValue';
const MIN_VALUE = 'min';
const MAX_VALUE = 'max';
const DISABLED = 'disabled';
const PRECISION = 'precision';
const STEP = 'step';
const KEY = 'key';

interface InputConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any
}

export default class InputNumberConfig extends Component<InputConfigProps> {
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
            let { pageJSON } = props,
                { components } = pageJSON,
                current = components.find(({ configVisible }) => configVisible);
            return {
                formData: {
                    [KEY]: current['props'][KEY],
                    [LABEL]: current['props'][LABEL],
                    [DEFAULT_VALUE]: current['props'][DEFAULT_VALUE],
                    [MIN_VALUE]: current['props'][MIN_VALUE],
                    [MAX_VALUE]: current['props'][MAX_VALUE],
                    [DISABLED]: current['props'][DISABLED],
                    [PRECISION]: current['props'][PRECISION],
                    [STEP]: current['props'][STEP],
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
                    props: {
                        ...component.props,
                        ...formData,
                    }
                }
            }
            return component;
        })
        onSave && onSave(pageJSON)
    }

    handleChange = (key, e) => {
        const { formData } = this.state;
        const value = e.target.value;
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
                label={'key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： inputnumber'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={'名称'}
                {...formItemLayout}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： inputNumber'
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
            <FormItem
                label={'默认值'}
                {...formItemLayout}
            >
                <Input
                    value={formData[DEFAULT_VALUE]}
                    placeholder='例如： 1'
                    onChange={this.handleChange.bind(this, DEFAULT_VALUE)}
                />
            </FormItem>
            <FormItem
                label={'最小值'}
                {...formItemLayout}
            >
                <Input
                    value={formData[MIN_VALUE]}
                    placeholder='例如： 1'
                    onChange={this.handleChange.bind(this, MIN_VALUE)}
                />
            </FormItem>
            <FormItem
                label={'最大值'}
                {...formItemLayout}
            >
                <Input
                    value={formData[MAX_VALUE]}
                    placeholder='例如： 100'
                    onChange={this.handleChange.bind(this, MAX_VALUE)}
                />
            </FormItem>
            <FormItem
                label={'是否禁用'}
                {...formItemLayout}
            >
                <Radio.Group
                    onChange={this.handleChange.bind(this, DISABLED)}
                    value={formData[DISABLED]}
                    defaultValue={false}>
                    <Radio value={true}>true</Radio>
                    <Radio value={false}>false</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem
                label={'数值精度'}
                {...formItemLayout}
            >
                <Input
                    value={formData[PRECISION]}
                    placeholder='例如： 100'
                    onChange={this.handleChange.bind(this, PRECISION)}
                />
            </FormItem>
            <FormItem
                label={'每次改变步数'}
                {...formItemLayout}
            >
                <Input
                    value={formData[STEP]}
                    placeholder='例如： 1'
                    onChange={this.handleChange.bind(this, STEP)}
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