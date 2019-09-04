import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import InputConfig from './config';

class KInput extends Component {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        return (
            <Input
                {...this.props}
                style={{
                    width: '300px'
                }}
            />
        );
    }
}

export {
    KInput as component,
    getInitJson,
    getTools,
    InputConfig as config
};
