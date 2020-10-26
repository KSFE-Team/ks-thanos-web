import React, { Component } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import InputConfig from './config';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';

interface KBizSelectTagsProps {
    config: any;
    generatePage: {
        pageJSON: any
    },
    type: string;
}

class KBizSelectTags extends Component<KBizSelectTagsProps> {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        const { config, generatePage, type, ...OtherProps } = this.props;
        const { label = '' } = config;
        return (
            <Form.Item
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
                label={label}
            >
                <Input.Search
                    {...OtherProps}
                    style={{
                        width: '300px'
                    }}
                />
            </Form.Item>
        );
    }
}

export {
    KBizSelectTags as component,
    getInitJson,
    getTools,
    InputConfig as config
};
