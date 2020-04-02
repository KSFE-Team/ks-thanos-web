import React, { Component } from 'react';
import MyPage from 'Src/pages/ExistingPage/components/MyPage';
import BasicLayout from 'Src/layout';

export default class TempLateMgt extends Component {

    render() {
        return (
            <BasicLayout
                {...this.props}
            >
                <MyPage/>
            </BasicLayout>
        );
    }
}
