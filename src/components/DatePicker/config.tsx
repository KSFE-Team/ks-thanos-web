import React, {Component} from 'react';
import {Form, Radio, Button, Row, Col, Input} from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constans';

const FormItem = Form.Item;

const PLACEHOLDER = 'placeholder';
const FORMAT = 'format';
const SHOW_TIME = 'showTime';
const KEY = 'key';
const LABEL = 'label';

interface ConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class Config extends Component<ConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        showTime: true,
        format: 'YYYY-MM-DD',
        placeholder: '',
        key: '',
        label: ''
    };

    handleSave = () => {
        const {placeholder, showTime, format, key, label} = this.state;
        const {pageJSON, onSave} = this.props;
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    props: {
                        ...component.props,
                        [PLACEHOLDER]: placeholder,
                        [SHOW_TIME]: showTime,
                        [FORMAT]: format,
                        [KEY]: key,
                        [LABEL]: label
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    };

    handleChange = (key, e) => {
        const value = e.target.value;
        this.setState({
            [key]: value,
        });
    };

    render() {
        const {placeholder, format, showTime, key, label} = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={key}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <Form.Item
                {...FORMITEM_LAYOUT}
                label='label'
            >
                <Input
                    value={label}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </Form.Item>
            <FormItem
                label='是否可选时间'
                {...FORMITEM_LAYOUT}
            >
                <Radio.Group onChange={this.handleChange.bind(this, SHOW_TIME)} value={showTime}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                </Radio.Group>
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={placeholder}
                    onChange={this.handleChange.bind(this, PLACEHOLDER)}
                />
            </FormItem>
            <FormItem
                label={'日期格式'}
                {...FORMITEM_LAYOUT}
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
        </div>;
    }
}
