import React, { Component } from 'react';
import MyTemplate from 'Src/pages/TempLateMgt/components/MyTemplate';
import BasicLayout from 'Src/layout';

export default class TempLateMgt extends Component {

    render() {
        return (
            <BasicLayout
                {...this.props}
            >
                <MyTemplate pageOrTemp='page' title='页面'/>
            </BasicLayout>
        );
    }
}
