import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constants';
// import { findComponent } from 'Src/utils';
import { DEFAULT_OPTIONS } from '../BizSelectModal/utils';
import { initState } from './utils';
import ClearButton from 'Src/components/ClearButton';
// import { checkFieldData } from 'Src/utils/utils';

const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const TYPE = 'type';

interface SelectTypeContentConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class SelectTypeContentConfig extends Component<SelectTypeContentConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    static getDerivedStateFromProps(props, state) {
        console.log(props, '-----', state);
        // if (!state.isTouch) {
        //     const { pageJSON } = props;
        //     const { components } = pageJSON;
        //     const current = findComponent(components);
        //     const { type = '' } = (current.props || {});
        //     return {
        //         formData: {
        //             [KEY]: current[KEY],
        //             [LABEL]: current[LABEL],
        //             [TYPE]: type,
        //         },
        //         current
        //     };
        // } else {
        //     return state;
        // }
    }

    state = initState

    // handleSave = () => {
    //     const { formData, current } = this.state;
    //     const { pageJSON, onSave } = this.props;
    //     const { typeField, ...OTHER_DATA } = formData;
    //     const { error } = checkFieldData('BizSelectModal', formData);
    //     if (error) {
    //         message.error(FORM_MESSAGE);
    //         return false;
    //     }
    //     pageJSON.components = saveComponent(current.id, pageJSON.components, {
    //         ...OTHER_DATA,
    //         props: {
    //             ...current.props,
    //             placeholder: formData[LABEL],
    //             [TYPE]: type
    //         },
    //     });
    //     onSave && onSave(pageJSON);
    // }

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
        // inputType
        return <div>
            <FormItem
                label='内容类型Key'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如： type'
                    onChange={(event) => {
                        this.handleChange(LABEL, event.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label='内容类型Label'
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如： 类型/跳转类型'
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
                    mode='tags'
                    showSearch
                    value={formData[TYPE]}
                    onSearch={this.handleSearch.bind(this)}
                    onChange={(value: string) => {
                        this.handleChange(TYPE, value);
                    }}
                    filterOption={(input, option) =>
                        String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {/* {
                        inputType ? <Select.Option value={inputType}>{inputType}</Select.Option> : null
                    } */}
                    {
                        DEFAULT_OPTIONS.map((option, index) => (
                            <Select.Option key={index} value={option.value}>
                                {option.name}({option.value})
                            </Select.Option>
                        ))
                    }
                </Select>
            </FormItem>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            // onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this} />
                </Row>
            </FormItem>
        </div>;
    }
}
