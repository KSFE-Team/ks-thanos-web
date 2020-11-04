import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio, Input } from 'antd';
import { FORMITEM_LAYOUT } from 'Src/utils/constants';
import { getInitJson, getTools, CONTENT_ARR } from './utils';
import BizSelectTypeContentConfig from './config';

const RadioGroup = Radio.Group;

interface KBizSelectTypeContentProps {
    config: any;
    generatePage: {
        pageJSON: any
    },
    params: any
}

class KBizSelectTypeContent extends Component<KBizSelectTypeContentProps> {
    static propTypes = {
        props: PropTypes.object
    };

    render() {
        const typeLabel = '内容类型';
        return (
            <Fragment>
                <Form.Item
                    label={typeLabel}
                    {...FORMITEM_LAYOUT}
                    style={{ marginBottom: 0 }}
                >
                    <RadioGroup
                        value={CONTENT_ARR[0].value}
                    >
                        {
                            CONTENT_ARR.map(({ value, label }) => {
                                return <Radio value={value} key={value}>{label}</Radio>;
                            })
                        }
                    </RadioGroup>
                </Form.Item>
                <Form.Item
                    label={CONTENT_ARR[0].label}
                    {...FORMITEM_LAYOUT}
                    style={{ marginBottom: 0 }}
                >
                    <Input.Search
                        placeholder={typeLabel}
                        style={{
                            width: '300px'
                        }}
                    />
                </Form.Item>
            </Fragment>
        );
    }
}

export {
    KBizSelectTypeContent as component,
    getInitJson,
    getTools,
    BizSelectTypeContentConfig as config
};
