import React, { Component } from 'react';
import { DatePicker } from 'antd';
import PropTypes from "prop-types";
import { getInitJson, getTools } from './utils';
import RangePickerConfig from './config';

const RangePicker = DatePicker.RangePicker;

class KRangePicker extends Component {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        return (
            <RangePicker
                {...this.props}
            />
        );
    }
}

export {
    KRangePicker as component,
    getInitJson,
    getTools,
    RangePickerConfig as config
}
