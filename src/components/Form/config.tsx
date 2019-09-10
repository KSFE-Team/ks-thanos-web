import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
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

const STATE_NAME = 'stateName';
const SELECTED = 'selected';

interface FormConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any
}

export default class FormConfig extends Component<FormConfigProps> {
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
                    [STATE_NAME]: current[STATE_NAME],
                    [SELECTED]: current[SELECTED]
                }
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { formData } = this.state;
        const { pageJSON, onSave } = this.props;
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    ...formData,
                    props: {
                        ...component.props,
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key: string, value: string|boolean) => {
        const { formData } = this.state;
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
                label={'绑定redux的Key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[STATE_NAME]}
                    placeholder='例如： userSearchForm / userInfo'
                    onChange={(e) => {
                        const value = e.target.value;
                        this.handleChange(STATE_NAME, value);
                    }}
                />
            </FormItem>
            <FormItem
                label={'是否选中'}
                {...formItemLayout}
            >
                <Checkbox
                    checked={formData[SELECTED]}
                    onChange={(e) => {
                        const value = e.target.checked;
                        this.handleChange(SELECTED, value);
                    }}
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
        </div>;
    }
}
