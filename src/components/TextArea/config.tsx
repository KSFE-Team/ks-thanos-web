import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
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
const Rows = 'rows';
const Placeholder = 'placeholder';

interface InputConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any
}

export default class TextAreaConfig extends Component<InputConfigProps> {
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
                    [KEY]: current[KEY],
                    [Rows]: current[Rows],
                    [Placeholder]: current[Placeholder]
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
                label={'Key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={'默认显示信息'}
                {...formItemLayout}
            >
                <Input
                    value={formData[Placeholder]}
                    placeholder='例如： 请输入备注信息'
                    onChange={this.handleChange.bind(this, Placeholder)}
                />
            </FormItem>
            <FormItem
                label={'设置高度'}
                {...formItemLayout}
            >
                <Input
                    value={formData[Rows]}
                    placeholder='例如： 4'
                    onChange={this.handleChange.bind(this, Rows)}
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