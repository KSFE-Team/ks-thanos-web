import React from 'react';
import { Table } from 'antd';
import { getInitJson, getTools } from './utils';
import tableConfig from './config';

interface KRelationTableProps {
    columns: any[],
}

class KRelationTable extends React.Component<KRelationTableProps> {

    render() {
        const { columns, ...OTHER_PROPS } = this.props;
        let showColumns = [...columns];
        showColumns = showColumns.filter(({ component }) => !component);
        return (
            <div>
                <Table
                    {...OTHER_PROPS}
                    columns={showColumns}
                />
            </div>
        );
    }
}

export {
    KRelationTable as component,
    getInitJson,
    getTools,
    tableConfig as config
};
