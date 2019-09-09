import React from 'react';
import { Checkbox, Form } from 'antd';
import { getInitJson, getTools } from './utils';
import Config from './config';

interface Props {
    options: {
        checkItem: [{
            props: {
                disabled: boolean,
                checked: boolean,
                text: string
            },
            value: string
        }],
        label: string
    }
}

class KCheckBox extends React.Component<Props> {

    render() {
        const { options } = this.props;
        return (
            <Form.Item
                label={options && options.label ? options.label : '表单名称'}
            >
                {
                    options
                        ? options.checkItem.map((ele, index) => {
                            return <Checkbox
                                key={index}
                                checked={ele.props.checked}
                                disabled={ele.props.disabled}
                            >{ele.props.text}</Checkbox>;
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
