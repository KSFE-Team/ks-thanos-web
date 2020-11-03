import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Select, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import { FORMITEM_LAYOUT, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { DEFAULT_OPTIONS } from '../BizSelectModal/utils';
import { NOJUMP_OPTIONS, POTHER_OPTIONS, LINK_OPTIONS, initState } from './utils';
import ClearButton from 'Src/components/ClearButton';
import { checkFieldData } from 'Src/utils/utils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const KEY = 'typeField';
const LABEL = 'typeLabel';
const CONTENT_ARR = 'contentArr';
const CONTENT_KEY = 'contentField';
const ALIAS_ARR = 'aliasArry';
const flagArr = [
    {
        value: true,
        label: '是'
    },
    {
        value: false,
        label: '否'
    }
];

interface SelectTypeContentConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class SelectTypeContentConfig extends Component<SelectTypeContentConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = initState

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            const objData = JSON.parse(current.props.params);
            return {
                formData: {
                    ...objData
                },
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props; // onSave
        const { error } = checkFieldData('SelectTypeContent', formData);
        let data: Object = { ...formData };
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        if ('aliasArry' in formData && formData[ALIAS_ARR]) {
            data = {
                ...data,
                [ALIAS_ARR]: []
            };
        } else {
            delete data[ALIAS_ARR];
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            props: {
                params: JSON.stringify({ ...data })
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

    render() {
        const { formData } = this.state;
        const options = [...DEFAULT_OPTIONS, ...NOJUMP_OPTIONS, ...POTHER_OPTIONS, ...LINK_OPTIONS];
        // inputType
        return <div>
            <FormItem
                label='内容类型Key'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： type'
                    onChange={(event) => {
                        this.handleChange(KEY, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label='内容类型Label'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 内容类型/跳转类型'
                    onChange={(event) => {
                        this.handleChange(LABEL, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label='需要配置的内容类型（可多选）'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Select
                    style={{
                        width: '100%'
                    }}
                    mode='tags'
                    showSearch
                    value={formData[CONTENT_ARR] || undefined}
                    onSearch={this.handleSearch.bind(this)}
                    onChange={(value: string) => {
                        this.handleChange(CONTENT_ARR, value);
                    }}
                    filterOption={(input, option) =>
                        String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {/* {
                        inputType ? <Select.Option value={inputType}>{inputType}</Select.Option> : null
                    } */}
                    {
                        options.map((option, index) => (
                            <Select.Option key={index} value={option.value}>
                                {option.name}({option.value})
                            </Select.Option>
                        ))
                    }
                </Select>
            </FormItem>
            <FormItem
                label='内容Key'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[CONTENT_KEY]}
                    placeholder='例如：contnetId'
                    onChange={(event) => {
                        this.handleChange(CONTENT_KEY, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label='是否对配置的类型重新组合'
                extra='支持对类型进行自定义'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <RadioGroup
                    value={formData[ALIAS_ARR] || false}
                    onChange={(e) => {
                        this.handleChange(ALIAS_ARR, e.target.value);
                    }}
                >
                    {
                        flagArr.map(({ value, label }, index) => {
                            return <Radio value={value} key={index}>{label}</Radio>;
                        })
                    }
                </RadioGroup>
            </FormItem>
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
