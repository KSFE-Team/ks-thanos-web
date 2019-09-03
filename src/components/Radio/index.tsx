import React, { Component } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import { getInitJson, getTools } from './utils';
import RadioConfig from './config';

interface RadioProps {
    list: any,
    label:string,
    defaultValue:string
};
class KRadio extends Component<RadioProps> {
    static propTypes = {
        props: PropTypes.object,
    };

    render() {
        return (
            <div style={{display: 'flex'}}>
                <span style={{marginRight: '10px'}}>{this.props.label}:</span>
                <Radio.Group style={{display: 'flex'}}>
                    {
                        this.props.list.map((item) => {
                            return <div key={item.id} onClick={(e) => {
                                e.stopPropagation();
                            }}><Radio value={item.value}>{item.label}</Radio></div>;
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
