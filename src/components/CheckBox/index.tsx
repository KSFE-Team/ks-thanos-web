import React from 'react';
import { Checkbox, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import Config from './config';

interface Props {
    config: {
        checkItem: [{
            props: {
                disabled: boolean,
                checked: boolean,
                value: string
            },
            text: string,
            rowKey: number
        }],
        label: string,
        key: string,
    }
}

class KCheckBox extends React.Component<Props> {

    render() {
        const { config } = this.props;
        console.log('config', this.props);
        return (
            <Form.Item
                label={config && config.label ? config.label : '表单名称'}
            >
                {
                    config.label
                        ? config.checkItem.map((ele, index) => {
                            return <Checkbox
                                key={index}
                                checked={ele.props.checked}
                                disabled={ele.props.disabled}
                            >{ele.text}</Checkbox>;
                        })
                        : <Checkbox
                            checked={false}
                            disabled={false}
                        >选择项</Checkbox>
                }
            </Form.Item>
        );
    }
}

export {
    KCheckBox as component,
    getInitJson,
    getTools,
    Config as config
};
