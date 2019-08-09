import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from "prop-types";
import { getInitJson, getTools } from './utils';
import TableConfig from "./config";

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

KTable.getInitJson = getInitJson;
KTable.getTools = getTools;
KTable.config = TableConfig;
