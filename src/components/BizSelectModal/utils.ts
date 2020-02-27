/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'BizSelectModal',
    source: 'Src/components/@ks/kms-bizselectmodal',
    default: false,
    componentType: 'cloud',
    key: '',
    label: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectModal',
    icon: 'edit',
    componentName: 'BizSelectModal',
    cloudName: '@ks/kms-bizselectmodal'
});

/**
 * 初始化state
 */
export const initState = {
    formData: {
        type: ''
    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    }
};
