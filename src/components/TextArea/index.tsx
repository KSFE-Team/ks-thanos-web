import React, { Component } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import TextAreaConfig from './config';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';

const { TextArea } = Input;

interface KKTextArea {
    label: string;
    generatePage: {
        pageJSON: any
    }
}

class KTextArea extends Component<KKTextArea> {
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
    KTextArea as component,
    getInitJson,
    getTools,
    TextAreaConfig as config
};
