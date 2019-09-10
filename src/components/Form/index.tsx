import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import FormConfig from './config';
import './index.scss';

interface KFormProps {
    config: any
}

class KForm extends Component<KFormProps> {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        const { config } = this.props;
        const { selected } = config;
        return (
            <div
                className={selected ? 'form-container form-selected' : 'form-container'}
            >
                <div className='form-container-background'></div>
            </div>
        );
    }
}

export {
    KForm as component,
    getInitJson,
    getTools,
    FormConfig as config
};
