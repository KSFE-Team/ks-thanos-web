import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import FormConfig from './config';
import PageRender from 'Src/pages/GeneratePage/components/PageRender';
import './index.scss';

interface KFormProps {
    config: any,
    generatePage: {
        pageJSON: any
    }
}

class KForm extends Component<KFormProps> {
    static propTypes = {
        props: PropTypes.object
    };

    renderChildren = () => {
        const { config } = this.props;
        if (config.components && config.components.length) {
            return <PageRender
                dataSource={config.components}
                generatePage={this.props.generatePage}
            />;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div
                className={'form-container'}
            >
                <div className='form-container-background'>
                    {this.renderChildren()}
                </div>
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
