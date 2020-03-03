/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'DatePicker',
    source: 'antd',
    default: false,
    placeholder: '',
    key: '',
    label: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'DatePicker',
    icon: 'calendar',
    componentName: 'DatePicker'
});

/**
 * 初始化state
 */
export const initState = {
    showTime: true,
    format: 'YYYY-MM-DD',
    placeholder: '',
    key: '',
    label: '',
    current: {
        id: '',
        props: {}
    },
    isTouch: false,
};
