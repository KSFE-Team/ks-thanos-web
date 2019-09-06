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
        min: 0, // 最小值
        max: 0, // 最大值
        defaultValue: 0, // 默认值
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
