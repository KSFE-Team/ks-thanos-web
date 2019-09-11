import React, { Component } from 'react';
import { Select } from 'antd';
import { getInitJson, getTools } from './utils';
import Config from './config';
import { SelectProps, OptionData } from './interface';
const Option = Select.Option;

interface KSelectProps extends SelectProps {
    config: {
        options: OptionData[]
    }
}

class KSelect extends Component<KSelectProps> {

    render() {
        const { allowClear, disabled, placeholder, showSearch, config } = this.props;
        const { options = [] } = config;
        const selectProps = {
            allowClear,
            disabled,
            placeholder,
            showSearch
        };

        return (
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
        );
    }
}

export {
    KSelect as component,
    getInitJson,
    getTools,
    Config as config
};
