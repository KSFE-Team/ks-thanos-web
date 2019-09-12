import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import TextAreaConfig from './config';

const { TextArea } = Input;

interface KKTextArea {
    label: string;
}

class KTextArea extends Component<KKTextArea> {
    static propTypes = {
        props: PropTypes.object
    }

    static defaultProps = {
        label: '备注信息'
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>{`${this.props.label}:`}</span>
                <TextArea style={{width: '300px', marginLeft: '10px'}} {...this.props}/>
            </div>
        );
    }
}

export {
    KTextArea as component,
    getInitJson,
    getTools,
    TextAreaConfig as config
};
