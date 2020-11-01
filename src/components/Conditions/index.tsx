import React, { Component } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import ConditionConfig from './config';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';

interface KBizConditionsProps {
    config: any;
    generatePage: {
        pageJSON: any
    },
    type: string;
}

class KBizConditions extends Component<KBizConditionsProps> {
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
                <Input
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
    KBizConditions as component,
    getInitJson,
    getTools,
    ConditionConfig as config
};
