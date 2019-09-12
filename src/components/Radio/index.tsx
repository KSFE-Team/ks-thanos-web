import React, { Component } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import RadioConfig from './config';
interface RadioProps {
    config: any;
    label: string;
    defaultValue: string;
}
class KRadio extends Component<RadioProps> {
    static propTypes = {
        props: PropTypes.object,
        config: PropTypes.object,

    };

    state={
        defaultValue: this.props.config.defaultValue,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            defaultValue: nextProps.config.defaultValue
        });
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <span style={{marginRight: '10px'}}>{this.props.config.label}:</span>
                <Radio.Group style={{display: 'flex'}} value={this.state.defaultValue} onChange={(e) => {
                    this.setState({
                        defaultValue: e.target.value
                    });
                }}>
                    {
                        this.props.config.options.map((item) => {
                            return <div key={item.rowKey} onClick={(e) => {
                                e.stopPropagation();
                            }}><Radio value={item.value} disabled={item.disabled}>{item.text}</Radio></div>;
                        })
                    }
                </Radio.Group>
            </div>

        );
    }
}

export {
    KRadio as component,
    getInitJson,
    getTools,
    RadioConfig as config
};
