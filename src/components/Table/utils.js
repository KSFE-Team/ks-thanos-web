/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    name: "Table",
    source: "antd",
    id: 1,
    default: false,
    props: {
        columns: [
            {
                title: "表头1",
                dataIndex: "col1"
            },
            {
                title: "表头2",
                dataIndex: "col2"
            },
        ]
    },
    dependencies: [
        // 
    ],
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Table',
    icon: 'table',
    componentName: 'Table'
});
