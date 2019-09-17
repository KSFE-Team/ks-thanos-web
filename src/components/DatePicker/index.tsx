import React, {Component} from 'react';
import {DatePicker, Form} from 'antd';
import PropTypes from 'prop-types';
import {getInitJson, getTools} from './utils';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';
import Config from './config';

interface KSDatePicker {
    label: string;
    config: any;
    generatePage: {
        pageJSON: any
    }
}

class KDatePicker extends Component<KSDatePicker> {
    static propTypes = {
        props: PropTypes.object,
    };

    static defaultProps = {
        label: '时间选择 '
    }

    render() {
        const { config, generatePage, ...OtherProps } = this.props;
        const { label } = config;
        return (
            <Form.Item
                label={label || '时间选择'}
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
            >
                <DatePicker
                    {...OtherProps}
                    style={{
                        width: '300px',
                    }}
                />
            </Form.Item>
        );
    }
}

export {
    KDatePicker as component,
    getInitJson,
    getTools,
    Config as config
};
