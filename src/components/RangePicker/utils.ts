/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'RangePicker',
    source: 'antd',
    default: false,
    key: '',
    label: '时间区间',
    parentComponentName: 'DatePicker',
    props: {
        placeholder: ['开始时间', '截止时间']
    }
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'RangePicker',
    icon: 'calendar',
    componentName: 'RangePicker'
});
