import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';
import { getInitJson, getTools } from './utils';
import TimingSettingConfig from './config';

const RadioGroup = Radio.Group;
const CONFIG_TYPE = [
    {
        label: '分时',
        value: 1
    },
    {
        label: '分日',
        value: 2
    }
];

interface KTimingSettingProps {
    config: any;
    generatePage: {
        pageJSON: any
    }
}

class KTimingSetting extends Component<KTimingSettingProps> {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        // const { config } = this.props;
        return (
            <Form.Item
                label={'定时配置'}
                {...FORMITEM_LAYOUT}
                style={{ marginBottom: 0 }}
            >
                <RadioGroup
                    value={CONFIG_TYPE[1].value}
                >
                    {
                        CONFIG_TYPE.map(({ value, label }) => {
                            return <Radio value={value} key={value}>{label}</Radio>;
                        })
                    }
                </RadioGroup>
            </Form.Item>
        );
    }
}

export {
    KTimingSetting as component,
    getInitJson,
    getTools,
    TimingSettingConfig as config
};
