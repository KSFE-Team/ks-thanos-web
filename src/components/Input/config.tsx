import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS } from 'Src/utils/constans';
import {findComponent} from 'Src/utils';

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

interface InputConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any
}

export default class InputConfig extends Component<InputConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state={
        formData: {

        },
        isTouch: false,
        current: {}
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL]
                },
                current
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
                        placeholder: formData[LABEL]
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key: string, e: any) => {
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
                label={ALIAS.KEY}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...formItemLayout}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, LABEL)}
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
