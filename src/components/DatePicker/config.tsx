import React, {Component} from 'react';
import {Form, Radio, Button, Row, Col, Input} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    }
};

const PLACEHOLDER = 'placeholder';
const FORMAT = 'format';
const SHOW_TIME = 'showTime';

interface ConfigProps {
    onSave(pageJSON: any): void,

    pageJSON: any
}

export default class Config extends Component<ConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        showTime: true,
        format: 'YYYY-MM-DD',
        placeholder: ''
    };

    handleSave = () => {
        const {placeholder, showTime, format} = this.state;
        let {pageJSON, onSave} = this.props;
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    props: {
                        ...component.props,
                        [PLACEHOLDER]: placeholder,
                        [SHOW_TIME]: showTime,
                        [FORMAT]: format
                    }
                }
            }
            return component;
        });
        console.log('pageJSON----------', pageJSON);
        onSave && onSave(pageJSON)
    };

    handleChange = (key, e) => {
        const value = e.target.value;
        this.setState({
            [key]: value,
        });
    };

    render() {
        const {placeholder, format, showTime} = this.state;
        return <div>
            <FormItem
                label='是否可选时间'
                {...formItemLayout}
            >
                <Radio.Group onChange={this.handleChange.bind(this, SHOW_TIME)} value={showTime}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem
                label={'输入框提示文字'}
                {...formItemLayout}
            >
                <Input
                    value={placeholder}
                    onChange={this.handleChange.bind(this, PLACEHOLDER)}
                />
            </FormItem>
            <FormItem
                label={'展示的日期格式'}
                {...formItemLayout}
            >
                <Input
                    value={format}
                    placeholder='YYYY-MM-DD HH:mm:ss'
                    onChange={this.handleChange.bind(this, FORMAT)}
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
