import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';

const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const TYPE = 'type';

interface BizSelectModalConfigProps{
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class BizSelectModalConfig extends Component<BizSelectModalConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state={
        formData: {
            type: ''
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
            const { type = '' } = (current.props || {});
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    [TYPE]: type,
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
        const { type, ...OTHER_DATA } = formData;
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...OTHER_DATA,
            props: {
                ...current.props,
                placeholder: formData[LABEL],
                [TYPE]: type
            },
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
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
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
                label={ALIAS.TYPE}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[TYPE]}
                    placeholder='例如： file'
                    onChange={this.handleChange.bind(this, TYPE)}
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
