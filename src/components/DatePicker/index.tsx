import React, { Component } from 'react';
import { DatePicker } from 'antd';
import PropTypes from "prop-types";
import { getInitJson, getTools } from './utils';
import Config from './config';

class KDatePicker extends Component {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        return (
            <DatePicker
                {...this.props}
                style={{
                    width: '300px'
                }}
            />
        );
    }
}

export {
    KDatePicker as component,
    getInitJson,
    getTools,
    Config as config
}
