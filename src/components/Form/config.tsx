import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Row, Col, Radio } from 'antd';
import { FORM_TYPES } from './constants';
import PropTypes from 'prop-types';
const [{key: NORMAL}, {key: SEARCH}] = FORM_TYPES;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
const TYPE = 'type';
const LINK = 'link';
const SAVE_API = 'saveApi';
const UPDATE_API = 'updateApi';

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
                    [TYPE]: current[TYPE],
                    [LINK]: current[LINK],
                    [SAVE_API]: current[SAVE_API],
                    [UPDATE_API]: current[UPDATE_API],
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

    getTypeForm = () => {
        const { formData } = this.state;
        switch (formData[TYPE]) {
            case SEARCH:
                return <Fragment>
                    {/* <FormItem
                        label={'新增/修改跳转地址'}
                        {...formItemLayout}
                    >
                        <Input
                            placeholder='新增/修改跳转地址'
                            value={formData[LINK]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(LINK, value);
                            }}
                        />
                    </FormItem> */}
                </Fragment>;
            case NORMAL:
                return <Fragment>
                    <FormItem
                        label={'新增API'}
                        {...formItemLayout}
                    >
                        <Input
                            placeholder='新增API'
                            value={formData[SAVE_API]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(SAVE_API, value);
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label={'修改API'}
                        {...formItemLayout}
                    >
                        <Input
                            placeholder='修改API'
                            value={formData[UPDATE_API]}
                            onChange={(e) => {
                                const { value } = e.target;
                                this.handleChange(UPDATE_API, value);
                            }}
                        />
                    </FormItem>
                </Fragment>;
        }
    }

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
                <RadioGroup
                    value={formData[TYPE]}
                    onChange={(e) => {
                        const value = e.target.value;
                        this.handleChange(TYPE, value);
                    }}
                >
                    {
                        FORM_TYPES.map(({ key, name }) => {
                            return (
                                <Radio key={key} value={key}>{name}</Radio>
                            );
                        })
                    }
                </RadioGroup>
            </FormItem>
            {
                this.getTypeForm()
            }
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
