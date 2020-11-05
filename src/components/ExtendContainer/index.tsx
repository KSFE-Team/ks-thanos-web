import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import ExtendContainerConfig from './config';
import PageRender from 'Src/pages/GeneratePage/components/PageRender';
import './index.scss';

interface KExtendContainerProps {
    config: any,
    generatePage: {
        pageJSON: any
    }
}

class KExtendContainer extends Component<KExtendContainerProps> {
    static propTypes = {
        props: PropTypes.object
    };

    renderChildren = () => {
        const { config } = this.props;
        if (config.components && config.components.length) {
            return <PageRender
                dataSource={config.components}
                generatePage={this.props.generatePage}
                parentComponent={config}
            />;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div
                className={'extendContainer-container'}
            >
                <div className='extendContainer-container-background'>
                    <div>加减容器</div>
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export {
    KExtendContainer as component,
    getInitJson,
    getTools,
    ExtendContainerConfig as config
};
