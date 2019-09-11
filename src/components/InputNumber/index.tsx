import React, { Component } from 'react';
import { InputNumber, Form } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import InputConfig from './config';
import { FORMITEM_LAYOUT } from 'Src/utils/constans';

interface KInputNumberProps {
    label: string;
}

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
                {...FORMITEM_LAYOUT}
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
