
export const getInitJson = () => ({
    stateName: '',
    componentName: 'BizTimingSetting',
    source: 'Src/components/@ks/kms-biztimingsetting',
    props: {
        formFields: {},
        info: {},
        type: 'data',
        disabled: false,
        required: true,
    },
    defaultValue: ''
});
/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizTimingSetting',
    icon: 'edit',
    componentName: 'BizTimingSetting',
    cloudName: '@ks/kms-biztimingsetting'
});
/**
 * 默认的参数 - 默认为data 类型
 */
export const initState = {
    formData: {
        type: '',
        required: true,
        props: {}
    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    },
};
