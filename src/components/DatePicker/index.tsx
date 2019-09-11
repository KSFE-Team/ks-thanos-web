import React, {Component} from 'react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import {getInitJson, getTools} from './utils';
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
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>{`${this.props.label}:`}</span>
                <DatePicker
                    {...this.props}
                    style={{
                        width: '300px',
                        marginLeft: '10px'
                    }}
                />
            </div>
        );
    }
}

export {
    KDatePicker as component,
    getInitJson,
    getTools,
    Config as config
};
