import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from "prop-types";
import { getInitJson, getTools } from './utils';
import TextAreaConfig from './config';

const { TextArea } = Input;

class KTextArea extends Component {
    static propTypes = {
        props: PropTypes.object
    };
    
    render() {
        return (
            <TextArea  style={{
                width: '300px'
            }} {...this.props} />
        );
    }
}

export {
    KTextArea as component,
    getInitJson,
    getTools,
    TextAreaConfig as config
}
