import { FORM_TYPES } from './constants';
const [{ key: NORMAL_FORM }] = FORM_TYPES;
/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Form',
    source: 'antd',
    default: false,
    type: NORMAL_FORM,
    key: '',
    label: ''
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Form',
    icon: 'form',
    componentName: 'Form'
});
