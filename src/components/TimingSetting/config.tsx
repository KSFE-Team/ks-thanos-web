import React, { Fragment, Component } from 'react';
import { Form, Input, Button, Row, Col, Radio } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT } from 'Src/utils/constants';
import { findComponent } from 'Src/utils';
import { initState } from './utils';
import ClearButton from 'Src/components/ClearButton';
// import { checkFieldData } from 'Src/utils/utils';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const KEY = 'key';
const LABEL = 'label';
const TYPE = 'type';
const CONFIG_TYPE = [
    {
        label: '时间',
        value: 'time'
    },
    {
        label: '日期时间',
        value: 'data'
    },
    {
        label: '默认全部',
        value: 'settingAll'
    }
];

interface TimingSettingConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class TimingSettingConfig extends Component<TimingSettingConfigProps> {
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
                },
                current
            };
        } else {
            return state;
        }
    }

    // 默认配置参数
    state = { ...initState }

    // 修改 配置项
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

    // handleSave = () => {
    //     const { formData, current } = this.state;
    //     const { pageJSON, onSave } = this.props;
    //     const { type, ...OTHER_DATA } = formData;
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

    

    // handleSearch = (searchValue: string) => {
    //     if (DEFAULT_OPTIONS.find(({
    //         value
    //     }) => value.toLowerCase() === searchValue.toLowerCase())) {
    //         this.setState({
    //             inputType: ''
    //         });
    //     } else {
    //         this.setState({
    //             inputType: searchValue
    //         });
    //     }
    // }

    // 根据类型 - 渲染节点 区分 all || time || data
    getComponentNode = () => {
        const { formData } = this.state;
        console.log(formData, '---');
        switch (formData[TYPE]) {
            case 'settingAll':
                return <Fragment>
                    <FormItem
                        label={`定时配置${ALIAS.KEY}`}
                        {...FORMITEM_LAYOUT}
                    >
                        <Input
                            value={formData[KEY]}
                            placeholder='默认Key为：timeSetting'
                            onChange={() => {
                                // this.handleChange(LABEL, event.target.value);
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
                label={'定时配置'}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <RadioGroup
                    value={formData.type}
                    onChange={(e) => {
                        this.handleChange('type', e.target.value);
                    }}
                >
                    {
                        CONFIG_TYPE.map(({ value, label }) => {
                            return <Radio value={value} key={value}>{label}</Radio>;
                        })
                    }
                </RadioGroup>
            </FormItem>
            {
                this.getComponentNode()
            }
            {/* <FormItem
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
                    {
                        inputType ? <Select.Option value={inputType}>{inputType}</Select.Option> : null
                    }
                    {
                        DEFAULT_OPTIONS.map((option, index) => (
                            <Select.Option key={index} value={option.value}>
                                {option.name}({option.value})
                            </Select.Option>
                        ))
                    }
                </Select>
            </FormItem> */}
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
