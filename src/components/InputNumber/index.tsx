import React, { Component } from 'react';
import { InputNumber, Form } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import InputConfig from './config';

interface KInputNumberProps {
    label: string
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class KInputNumber extends Component<KInputNumberProps> {
    static propTypes = {
        props: PropTypes.object
    };

    static defaultProps = {
        label: '数字框'
    };

    render() {
        return (
            <Form.Item
                {...formItemLayout}
                style={{marginBottom: 0}}
                label={this.props.label}>
                <InputNumber
                    {...this.props}
                />
            </Form.Item>

        );
    }
}

export {
    KInputNumber as component,
    getInitJson,
    getTools,
    InputConfig as config
};
