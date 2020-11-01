import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message, Select, Radio } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { initState, DEFAULT_OPTIONS, optionValue } from './utils';
import ClearButton from 'Src/components/ClearButton';
import { checkFieldData } from 'Src/utils/utils';

const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const TYPE = 'type';

interface ConditionsConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class ConditionsConfig extends Component<ConditionsConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            const { formfields = [] } = (current.props || {});
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    [formfields]: formfields,
                },
                current
            };
        } else {
            return state;
        }
    }

    state = {...initState, selectOptionValue: []}

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { formfields, ...OTHER_DATA } = formData;
        const { error } = checkFieldData('Conditions', formData);
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...OTHER_DATA,
            props: {
                ...current.props,
                placeholder: formData[LABEL],
                // [formfields]: formfields
            },
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key: string, value: string) => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    handleSearch = (searchValue: string) => {
        if (DEFAULT_OPTIONS.find(({
            value
        }) => value.toLowerCase() === searchValue.toLowerCase())) {
            this.setState({
                inputType: ''
            });
        } else {
            this.setState({
                inputType: searchValue
            });
        }
    }

    // 类型对应的选项
    getOptionItem = () => {
        const { selectOptionValue } = this.state;
        // console.log(optionValue, DEFAULT_OPTIONS);
        if (selectOptionValue.length > 0) {
            return selectOptionValue.map((item, index) => {
                const optionObj = DEFAULT_OPTIONS.find(({value}) => value === item) || {name: ''};
                let content;
                switch (item) {
                    case optionValue.tagCode:
                    case optionValue.memberTag:
                    case optionValue.clients:
                        content = (
                            <FormItem
                                // {...formItemLayout}
                                label="自定义选项"
                                style={{marginRight: '15px'}}
                            >
                                <Radio.Group defaultValue={true}>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </FormItem>
                        );
                        break;
                    default:
                        break;
                }
                return <div key={index} style={{display: 'flex', background: 'pink'}}>
                    <FormItem
                        // {...formItemLayout}
                        label="类型"
                        style={{marginRight: '15px'}}
                    >
                        <p>{optionObj.name}</p>
                    </FormItem>
                    <FormItem
                        // {...formItemLayout}
                        label="是否必填"
                        style={{marginRight: '15px'}}
                    >
                        {/* {getFieldDecorator('comment', {
                            rules: [
                                { validator: maxLength(500) }
                            ]
                        })( */}
                        <Radio.Group defaultValue={true}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                        {/* )} */}
                    </FormItem>
                    <FormItem
                        // {...formItemLayout}
                        label="应用"
                    >
                        {/* {getFieldDecorator('comment', {
                            rules: [
                                { validator: maxLength(500) }
                            ]
                        })( */}
                        <Radio.Group defaultValue={1}>
                            <Radio value={1}>凯叔</Radio>
                            <Radio value={2}>绘本</Radio>
                        </Radio.Group>
                        {/* )} */}
                    </FormItem>
                    {content}
                </div>;
            });
        }
    }

    render() {
        const { formData } = this.state;
        return <div>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={(event) => {
                        this.handleChange(LABEL, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： name'
                    onChange={(event) => {
                        this.handleChange(KEY, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.TYPE}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Select
                    style={{
                        width: '100%'
                    }}
                    mode="multiple"
                    showSearch
                    value={formData[TYPE]}
                    onSearch={this.handleSearch.bind(this)}
                    onChange={(value: string) => {
                        this.handleChange(TYPE, value);
                        this.setState({selectOptionValue: value});
                    }}
                >
                    {
                        DEFAULT_OPTIONS.map((option, index) => (
                            <Select.Option key={index} value={option.value}>
                                {option.name}({option.value})
                            </Select.Option>
                        ))
                    }
                </Select>
            </FormItem>
            {this.getOptionItem()}
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this} />
                </Row>
            </FormItem>
        </div>;
    }
}
