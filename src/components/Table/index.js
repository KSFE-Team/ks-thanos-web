import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from "prop-types";

export default class KTable extends Component {
    static propTypes = {
        props: PropTypes.object
    };
    
    render() {
        return (
            <Table
                {...this.props}
            />
        );
    }
}