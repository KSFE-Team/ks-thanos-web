import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { getInitJson, getTools } from './utils';
import RangePickerConfig from './config';

const RangePicker = DatePicker.RangePicker;

class KRangePicker extends Component {

    render() {
        return (
            <RangePicker
                showTime={{format: ''}}
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
