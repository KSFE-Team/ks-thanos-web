/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'TextArea',
    source: 'antd',
    default: false,
    props: {
        key: '',
        rows: '',
        placeholder: '',
    }
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'TextArea',
    icon: 'edit',
    componentName: 'TextArea'
});
