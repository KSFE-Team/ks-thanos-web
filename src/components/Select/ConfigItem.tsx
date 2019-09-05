import React, { Component } from 'react';
import { Input, Radio, Form } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface ConfigItemProps {
    type: string;
    name: string;
    label: string;
    form: any;
    formItemLayout: any;
    defaultValue: any;
}

/**
 * boolean表单数据自动生成
 */
export default class ConfigItem extends Component<ConfigItemProps> {
    state = { }

    renderContent(type, otherProps) {
        let content;

        switch (type) {
            case 'boolean':
                content = (
                    <RadioGroup {...otherProps}>
                        <Radio value={true}>true</Radio>
                        <Radio value={false}>false</Radio>
                    </RadioGroup>
                );
                break;
            default:
                content = (
                    <Input {...otherProps} />
                );
                break;
        }

        return content;
    }

    render() {
        const { name, label, form, formItemLayout, defaultValue, type, ...otherProps } = this.props;

        return (
            <FormItem
                label={label}
                {...formItemLayout}
            >
                {

                    form.getFieldDecorator(name, {
                        initialValue: defaultValue
                    })(this.renderContent(type, otherProps))
                }
            </FormItem>
        );
    }
}
