import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import Config from './config';

class KSelect extends Component {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        console.log(this.props);

        return (
            <Select
                {...this.props}
                style={{
                    width: '300px'
                }}
            />
        );
    }
}

export {
    KSelect as component,
    getInitJson,
    getTools,
    Config as config
};
