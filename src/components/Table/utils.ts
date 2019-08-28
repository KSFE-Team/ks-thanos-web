/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: "Table",
    source: "antd",
    default: false,
    props: {
        columns: [{title: '示例', dataIndex: 'example'}]
    },
    dependencies: {},
    components: []
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Table',
    icon: 'table',
    componentName: 'Table'
});