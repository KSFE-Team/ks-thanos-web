import React, { Component } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import TextareaConfig from './config';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';

const { TextArea } = Input;

interface KTextareaProps {
    label: string;
    generatePage: {
        pageJSON: any
    }
}

class KTextarea extends Component<KTextareaProps> {
    static propTypes = {
        props: PropTypes.object
    }

    static defaultProps = {
        label: '备注信息'
    }

    render() {
        const { label, generatePage, ...OtherProps } = this.props;
        return (
            <Form.Item
                {...FORMITEM_LAYOUT}
                label={label}
                style={{ marginBottom: 0 }}
            >
                <TextArea style={{ width: '300px' }} {...OtherProps} />
            </Form.Item>
        );
    }
}

export {
    KTextarea as component,
    getInitJson,
    getTools,
    TextareaConfig as config
};
