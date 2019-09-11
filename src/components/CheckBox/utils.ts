/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'CheckBox',
    source: 'antd',
    default: false,
    options: [{
        props: {
            disabled: false,
            checked: false,
            value: ''
        },
        text: '',
        rowKey: 0
    }],
    label: '',
    key: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'CheckBox',
    icon: 'check-circle',
    componentName: 'CheckBox'
});
