import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT, FIELD_ARR, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { checkFieldData } from 'Src/utils/utils';
import ClearButton from 'Src/components/ClearButton';
import {initState} from './utils';

const FormItem = Form.Item;

const KEY = 'key';
const Label = 'label';
const Rows = 'rows';
const Placeholder = 'placeholder';

interface InputConfigProps{
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class TextAreaConfig extends Component<InputConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state=initState

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [Rows]: current[Rows],
                    [Label]: current[Label],
                    [Placeholder]: current[Placeholder]
                },
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const flag = checkFieldData('obj', formData, FIELD_ARR);
        // 提交检验
        if (flag) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...formData,
            props: {
                ...current.props,
                ...formData,
            }
        });
        onSave && onSave(pageJSON);
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
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[Label]}
                    placeholder='例如： 备注'
                    onChange={this.handleChange.bind(this, Label)}
                />
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[Placeholder]}
                    placeholder='例如： 请输入备注信息'
                    onChange={this.handleChange.bind(this, Placeholder)}
                />
            </FormItem>
            <FormItem
                label={'设置高度'}
                {...FORMITEM_LAYOUT}
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
                    <ClearButton initState={initState} that={this}/>
                </Row>
            </FormItem>
        </div>;
    }
}
