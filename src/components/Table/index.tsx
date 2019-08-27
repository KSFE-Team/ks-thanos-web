import React from 'react';
import { Table } from 'antd';
import { getInitJson, getTools } from './utils';
import tableConfig from "./config";

class KTable extends React.Component {
    render() {
        return (
            <Table
                {...this.props}
            />
        );
    }
}

export {
    KTable as component,
    getInitJson,
    getTools,
    tableConfig as config
};