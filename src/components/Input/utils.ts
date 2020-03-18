/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Input',
    source: 'antd',
    default: false,
    key: '',
    label: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Input',
    icon: 'edit',
    componentName: 'Input'
});

/**
 * 初始化state
 */
export const initState = {
    formData: {

    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    }
};
