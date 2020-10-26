import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message, Select } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { initState, DEFAULT_OPTIONS } from './utils';
import ClearButton from 'Src/components/ClearButton';
import { checkFieldData } from 'Src/utils/utils';

const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const TYPE = 'type';
const SHOWTAGKEY = 'showTagKey';
const BUTTONTEXT = 'buttonText';

interface BizSelectTagsConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class BizSelectTagsConfig extends Component<BizSelectTagsConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
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
                    [SHOWTAGKEY]: current[SHOWTAGKEY],
                    [BUTTONTEXT]: current[BUTTONTEXT],
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
        const { type, ...OTHER_DATA } = formData;
        const { error } = checkFieldData('BizSelectTags', formData);
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
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
        const { formData, inputType } = this.state;
        return <div>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： 故事'
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
                    placeholder='例如： story'
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
                    showSearch
                    value={formData[TYPE] || undefined}
                    placeholder={'请选择类型'}
                    onSearch={this.handleSearch.bind(this)}
                    onChange={(value: string) => {
                        this.handleChange(TYPE, value);
                    }}
                    filterOption={(input, option) =>
                        String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        inputType ? <Select.Option value={inputType}>{inputType}</Select.Option> : null
                    }
                    {
                        DEFAULT_OPTIONS.map((option, index) => (
                            <Select.Option
                                key={index}
                                value={option.value}
                            >
                                {option.name}({option.value})
                            </Select.Option>
                        ))
                    }
                </Select>
            </FormItem>
            <FormItem
                label={'tag展示字段'}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[SHOWTAGKEY]}
                    placeholder='例如： name'
                    onChange={(event) => {
                        this.handleChange(SHOWTAGKEY, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={'添加按钮文案'}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[BUTTONTEXT]}
                    placeholder='例如： 添加'
                    onChange={(event) => {
                        this.handleChange(BUTTONTEXT, event.target.value);
                    }}
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
                    <ClearButton initState={initState} that={this} />
                </Row>
            </FormItem>
        </div>;
    }
}
