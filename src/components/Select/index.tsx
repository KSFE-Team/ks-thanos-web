import React, { Component } from 'react';
import { Select, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import Config from './config';
import { SelectProps, OptionData } from './interface';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';

const Option = Select.Option;

interface KSelectProps extends SelectProps {
    config: {
        options: OptionData[];
        label: string;
    };
}

class KSelect extends Component<KSelectProps> {

    render() {
        const { allowClear, disabled, placeholder, showSearch, config } = this.props;
        const { options = [], label } = config;
        const selectProps = {
            allowClear,
            disabled,
            placeholder,
            showSearch
        };
        return (
            <Form.Item
                label={label}
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
            >
                <Select
                    {...selectProps}
                    optionFilterProp="children"
                    style={{
                        width: '300px'
                    }}
                    filterOption={(input, option: any) => {
                        return option.props.value.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) > -1;
                    }}
                >
                    {
                        options.map((item, index) => {
                            return <Option key={index} value={item.props.value}>{item.label}</Option>;
                        })
                    }
                </Select>
            </Form.Item>
        );
    }
}

export {
    KSelect as component,
    getInitJson,
    getTools,
    Config as config
};
