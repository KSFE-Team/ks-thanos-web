/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'InputNumber',
    source: 'antd',
    default: false,
    key: '', // 唯一
    label: '数字框', // 名称
    props: {
        min: '', // 最小值
        max: '', // 最大值
        defaultValue: '', // 默认值
        placeholder: '',
        disabled: false, // 是否禁用
        precision: 0, // 精度
        step: 1 // 步数
    }
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'InputNumber',
    icon: 'number',
    componentName: 'InputNumber'
});
