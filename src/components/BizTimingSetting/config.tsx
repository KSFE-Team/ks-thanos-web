import React, { Fragment, Component } from 'react';
import { Form, Input, Button, Row, Col, Radio } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FORMITEM_LAYOUT, ISREQUIRED_TYPE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import { initState } from './utils';
import ClearButton from 'Src/components/ClearButton';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const FiELDS = {
    TYPE: 'type',
    STARTTIME_KEY: 'startTime',
    STARTTIME_LABEL: 'startTimeLabel',
    ENDTIME_KEY: 'endTime',
    ENDTIME_LABEL: 'endTimeLabel',
    REQUIRED: 'required'
};

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

interface BizTimingSettingConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class BizTimingSettingConfig extends Component<BizTimingSettingConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            const { type, required } = current.props;
            return {
                formData: {
                    [FiELDS.TYPE]: type,
                    [FiELDS.REQUIRED]: required,
                    props: current.props,
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

    // 保存
    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { type, required, props, ...other } = formData;
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            props: {
                type,
                required,
                formFields: JSON.stringify({
                    ...other
                })
            }
        });
        onSave && onSave(pageJSON);
    }

    // 日期节点
    dataNode = () => {
        const { STARTTIME_KEY, STARTTIME_LABEL, ENDTIME_KEY, ENDTIME_LABEL } = FiELDS;
        const { formData } = this.state;
        return <Fragment>
            <FormItem
                label={`上架时间${ALIAS.KEY}`}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[STARTTIME_KEY]}
                    placeholder='默认Key为：startTime'
                    onChange={(e) => {
                        this.handleChange(STARTTIME_KEY, e.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={`上架时间${ALIAS.LABEL}`}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[STARTTIME_LABEL]}
                    placeholder='默认Label为：上架时间'
                    onChange={(e) => {
                        this.handleChange(STARTTIME_LABEL, e.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={`下架时间${ALIAS.KEY}`}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[ENDTIME_KEY]}
                    placeholder='默认Key为：endTime'
                    onChange={(e) => {
                        this.handleChange(ENDTIME_KEY, e.target.value);
                    }}
                />
            </FormItem>
            <FormItem
                label={`下架时间${ALIAS.LABEL}`}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    value={formData[ENDTIME_LABEL]}
                    placeholder='默认Label为：下架时间'
                    onChange={(e) => {
                        this.handleChange(ENDTIME_LABEL, e.target.value);
                    }}
                />
            </FormItem>
        </Fragment>;
    }

    render() {
        const { formData } = this.state;
        const { TYPE, REQUIRED } = FiELDS;
        const url = 'https://kaishu.yuque.com/nbdzm5/kms/ggklfp';
        return <div>
            <FormItem
                label={'定时配置'}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <RadioGroup
                    value={formData.type}
                    onChange={(e) => {
                        this.handleChange(TYPE, e.target.value);
                    }}
                >
                    {
                        CONFIG_TYPE.map(({ value, label }) => {
                            return <Radio value={value} key={value}>{label}</Radio>;
                        })
                    }
                </RadioGroup>
            </FormItem>
            <Form.Item
                {...FORMITEM_LAYOUT}
                label='是否必填'
                required={true}
            >
                <Radio.Group defaultValue={formData[REQUIRED]}
                    onChange={(e) => { this.handleChange(REQUIRED, e.target.value); }}
                >
                    {ISREQUIRED_TYPE.map(({ VALUE, LABEL }, index) => <Radio key={index} value={VALUE}>{LABEL}</Radio>)}
                </Radio.Group>
            </Form.Item>
            {this.dataNode()}
            <div style={{ marginBottom: '10px', color: 'green', marginLeft: '10px' }}>
                <p>以上字段均有默认值，支持单独修改字段。</p>具体字段参数请参考：<a target="_blank" onClick={(e) => {
                    e.stopPropagation();
                    window.open(url);
                }}>{url}</a>
            </div>
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
