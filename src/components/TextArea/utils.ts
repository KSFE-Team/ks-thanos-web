/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Textarea',
    source: 'antd',
    default: false,
    props: {
        key: '',
        rows: '',
        placeholder: '',
    },
    key: '',
    label: '',
    placeholder: '',
    rows: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Textarea',
    icon: 'edit',
    componentName: 'Textarea'
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
