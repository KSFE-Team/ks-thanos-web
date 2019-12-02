/**
 * 获取初始化JSON
 */
import {TABLE_TYPE} from 'utils/constants';

export const getInitJson = (tableType: any = TABLE_TYPE.NORMAL) => ({
    stateName: '',
    componentName: 'Table',
    source: 'antd',
    default: false,
    tableType: tableType,
    props: {
        columns: [{ title: '序号', dataIndex: 'sortNum' }]
    },
    dependencies: {},
    tableName: '',
    components: [],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Table',
    icon: 'table',
    componentName: 'Table'
});
