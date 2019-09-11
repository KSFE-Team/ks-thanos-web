import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import ConfigItem from './ConfigItem';
import DynamicConfigItem from './DynamicConfigItem';
const FormItem = Form.Item;
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

const KEY = 'key';
const LABEL = 'label';

interface ConfigProps {
    form: any;
    onSave(pageJSON:any): void;
    pageJSON: any;
}

interface ConfigState {
    formData: any;
    isTouch: boolean;
}

const selectProps = [
    {
        name: 'placeholder',
        label: 'placeholder',
        type: 'input',
        placeholder: '请选择订单类型'
    },
    {
        name: 'allowClear',
        label: '允许清空',
        type: 'boolean'
    },
    {
        name: 'disabled',
        label: '是否禁用',
        type: 'boolean'
    },
    {
        name: 'showSearch',
        label: '展示搜索',
        type: 'boolean'
    }
];

class Config extends Component<ConfigProps, ConfigState> {

    constructor(props) {
        super(props);

        this.state = {
            formData: {},
            isTouch: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    props: current.props,
                    options: current.options
                }
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        this.props.form.validateFields((err, fieldValues) => {
            if (!err) {
                this.setState({
                    formData: {
                        ...fieldValues
                    },
                    isTouch: true
                });

                const { options, props: fieldProps } = fieldValues;
                const { pageJSON, onSave } = this.props;
                pageJSON.components = pageJSON.components.map((component) => {
                    if (component.configVisible) {
                        component = {
                            ...component,
                            key: fieldValues.key,
                            label: fieldValues.label || '',
                            props: {
                                ...fieldProps
                            },
                            options
                        };
                    }
                    return component;
                });
                // console.log('pageJSON', JSON.stringify(pageJSON));
                onSave && onSave(pageJSON);
            }
        });
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
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <FormItem
                label={'表单项Key'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('key', {
                        rules: [
                            {required: true, message: '请输入表单字段名'}
                        ],
                        initialValue: formData[KEY]
                    })(
                        <Input
                            placeholder='例如： orderType'
                        />
                    )
                }

            </FormItem>
            <FormItem
                label={'表单项名称'}
                {...formItemLayout}
            >
                {
                    getFieldDecorator('label', {
                        rules: [
                            {required: true, message: '请输入表单项名称'}
                        ],
                        initialValue: formData[LABEL]
                    })(
                        <Input
                            placeholder='例如： 订单类型'
                        />
                    )
                }

            </FormItem>
            <Card title="Select Props 配置">
                {
                    selectProps.map((item, index) => {
                        const { type, name, label, ...otherProps } = item;

                        return (
                            <ConfigItem
                                key={index}
                                type={type}
                                name={`props.${name}`}
                                label={label}
                                defaultValue={formData.props ? formData.props[item.name] : undefined}
                                form={form}
                                formItemLayout={formItemLayout}
                                {...otherProps}
                            />
                        );
                    })
                }
            </Card>
            <Card title="Option 配置">
                <DynamicConfigItem
                    form={form}
                    name="options"
                    label="下拉选项"
                    addText="添加选项"
                    defaultValue={formData.options}
                />
            </Card>
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

// @ts-ignore
export default Form.create<ConfigProps>()(Config);
