// import { ISREQUIRED_TYPE } from 'Src/utils/constants';
/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'TimingSetting',
    source: 'Src/components/@ks/kms-timingsetting',
    default: false,
    props: {
        formFields: {},
        info: {},
        type: '',
        disabled: false,
        required: true,
    },
    defaultValue: ''
});
/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'TimingSetting',
    icon: 'edit',
    componentName: 'TimingSetting',
    cloudName: '@ks/kms-timingsetting'
});
/**
 * 默认的参数 - 默认为data 类型
 */
export const initState = {
    formData: {
        type: 'data',
        key: 'timeSetting'
    }
};
