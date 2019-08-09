/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    name: "Table",
    source: "antd",
    id: 1,
    default: false,
    props: {
        columns: []
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
