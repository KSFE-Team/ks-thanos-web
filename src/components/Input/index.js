import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from "prop-types";
import { getInitJson, getTools } from './utils';

export default class KInput extends Component {
    static propTypes = {
        props: PropTypes.object
    };
    
    render() {
        return (
            <Input
                {...this.props}
            />
        );
    }
}

KInput.getInitJson = getInitJson;
KInput.getTools = getTools;