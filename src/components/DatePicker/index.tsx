import React, {Component} from 'react';
import {DatePicker, Form} from 'antd';
import PropTypes from 'prop-types';
import {getInitJson, getTools} from './utils';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';
import Config from './config';

interface KSDatePicker {
    label: string;
}

class KDatePicker extends Component<KSDatePicker> {
    static propTypes = {
        props: PropTypes.object,
    };

    static defaultProps = {
        label: '时间选择 '
    }

    render() {
        return (
            <Form.Item
                label={this.props.label}
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
            >
                <DatePicker
                    {...this.props}
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
