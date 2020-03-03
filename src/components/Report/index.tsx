import React from 'react';
import Report from './echarts';
import { getInitJson, getTools, getOption } from './utils';
import tableConfig from './config';

interface KTableProps {
    type: any;
}

class KReport extends React.Component<KTableProps> {

    render() {
        console.log(this.props);

        return (
            <Report
                option={getOption(this.props.type)}
            />
        );
    }
}

export {
    KReport as component,
    getInitJson,
    getTools,
    tableConfig as config
};
