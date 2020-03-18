/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Select',
    source: 'antd',
    default: false,
    key: '',
    label: '',
    props: {
        placeholder: '',
        disabled: false,
        allowClear: true,
        showSearch: false
    }
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Select',
    icon: 'down-square',
    componentName: 'Select'
});

/**
 * 初始化state
 */
export const initState = {
    formData: {},
    isTouch: false,
    current: {
        id: '',
        props: {
            placeholder: '',
            disabled: false,
            allowClear: true,
            showSearch: false
        }
    }
};
