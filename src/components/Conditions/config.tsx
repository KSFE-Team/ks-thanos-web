import React, { Component } from 'react';
import { Form, Button, Row, Col, message, Select, Radio } from 'antd';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE } from 'Src/utils/constants';
import {findComponent, saveComponent } from 'Src/utils';
import { initState, DEFAULT_OPTIONS } from './utils';
import ClearButton from 'Src/components/ClearButton';
import { checkFieldData } from 'Src/utils/utils';

const FormItem = Form.Item;
const isRequired = 'isRequired';
const TYPE = 'type';
interface ConditionsConfigProps {
    form: any;
    pageJSON: any;
    onSave(pageJSON: any): void;
}
export default class ConditionsConfig extends Component<ConditionsConfigProps> {
    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            const { formfields = [] } = (current.props || {});
            return {
                formData: {
                    formfields: formfields,
                },
                current
            };
        } else {
            return state;
        }
    }

    state = initState

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
                formfields: formfields
            },
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key: string, value: string, item: string, index: number) => {
        const { formData } = this.state;
        const { formfields } = formData;
        formfields[index][key] = value;
        formfields[index].key = item;
        this.setState({
            formData: {
                ...formData,
                formfields: formfields
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
        const { formfields } = this.state.formData;
        if (formfields.length > 0) {
            return formfields.map((item, index) => {
                const optionObj = DEFAULT_OPTIONS.find(({value}) => value === item.key) || {name: ''};
                return <div key={index} style={{display: 'flex'}}>
                    <FormItem
                        label="类型"
                        style={{marginRight: '15px'}}
                    >
                        <p>{optionObj.name}</p>
                    </FormItem>
                    <FormItem
                        label="是否必填"
                        style={{marginRight: '15px'}}
                    >
                        <Radio.Group value={item.isRequired} onChange={(e) => {
                            this.handleChange(isRequired, e.target.value, item.key, index);
                        }}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </FormItem>
                    <FormItem
                        label="应用"
                    >
                        <Radio.Group value={item.type} onChange={(e) => {
                            this.handleChange(TYPE, e.target.value, item.key, index);
                        }}>
                            <Radio value={1}>凯叔</Radio>
                            <Radio value={2}>绘本</Radio>
                        </Radio.Group>
                    </FormItem>
                </div>;
            });
        }
    }

    render() {
        const { formfields } = this.state.formData;
        const values = formfields.map(({key}) => key);
        return <div>
            <FormItem
                label={ALIAS.TYPE}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Select
                    style={{
                        width: '100%'
                    }}
                    showSearch
                    mode="tags"
                    value={values}
                    onSearch={this.handleSearch.bind(this)}
                    onChange={(value: Array<string>) => {
                        const newFormfields = value.map((key) => {
                            const obj = formfields.find((item) => item.key === key) || {isRequired: true, type: 1};
                            return {
                                key,
                                isRequired: obj.isRequired,
                                type: obj.type,
                            };
                        });
                        this.setState({
                            formData: {
                                ...this.state.formData,
                                formfields: newFormfields
                            },
                            isTouch: true
                        });
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
