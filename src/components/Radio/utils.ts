/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: "",
    componentName: "Radio",
    source: "antd",
    default: false,
    key: '',
    label:'状态',
    isRequired:true,
    props: {
        configList: [{ id: 1,label:'启用',value:1 },{ id: 2,label:'禁用',value:0 }],
        label:'状态',
        defaultValue:1
    },
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Radio',
    icon: 'edit',
    componentName: 'Radio'
});