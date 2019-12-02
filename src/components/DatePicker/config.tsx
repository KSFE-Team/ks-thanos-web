import React, {Component} from 'react';
import {Form, Radio, Button, Row, Col, Input} from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';

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
        label: '',
        current: {
            id: '',
            props: {}
        },
        isTouch: false,
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { placeholder, showTime, format, key, label, current } = this.state;
        const {pageJSON, onSave} = this.props;
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            [KEY]: key,
            [LABEL]: label,
            props: {
                ...current.props,
                [PLACEHOLDER]: placeholder,
                [SHOW_TIME]: showTime,
                [FORMAT]: format,
            }
        });
        onSave && onSave(pageJSON);
    };

    handleChange = (key: string, e: any) => {
        const value = e.target.value;
        this.setState({
            [key]: value,
            isTouch: true
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
                label={ALIAS.LABEL}
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