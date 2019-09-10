import React, { Component } from 'react';
import { Form } from 'antd';
import './index.scss';

export default class TopToolbar extends Component {

    state = {
        currComp: ''
    }

    render() {
        return (
            <Form
                layout="inline"
                className="thanos-top-toolbar"
            >
            </Form>
        );
    }
}
