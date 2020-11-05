/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Conditions',
    source: 'Src/components/@ks/kms-Conditions',
    default: false,
    componentType: 'cloud',
    props: {
        formfields: [{
            key: 'tagCode', // PropTypes.string.isRequired
            isRequired: true, // PropTypes.bool 默认true
            type: 1, // 1kaishu、2huiben 默认1
        }]
    },
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Conditions',
    icon: 'edit',
    componentName: 'Conditions',
    cloudName: '@ks/kms-Conditions'
});

/**
 * 初始化state
 */
export const initState = {
    formData: {
        formfields: [{
            key: 'tagCode', // PropTypes.string.isRequired
            isRequired: true, // PropTypes.bool 默认true
            type: 1, // 1kaishu、2huiben 默认1
        }]
    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    },
    inputType: ''
};

export const optionValue = {
    tagCode: 'tagCode',
    memberTag: 'memberTag',
    clients: 'clients',
    filterCondition: 'filterCondition',
    includeChannelId: 'includeChannelId',
    excludeChannelId: 'excludeChannelId',
    isBeta: 'isBeta',
    isAbTest: 'isAbTest',
    status: 'status',
    sort: 'sort',
};

export const DEFAULT_OPTIONS = [
    {
        value: optionValue.tagCode,
        name: '用户标签'
    },
    {
        value: optionValue.memberTag,
        name: '会员标签',
    },
    {
        value: optionValue.clients,
        name: '终端类型'
    },
    {
        value: optionValue.filterCondition,
        name: '条件'
    },
    {
        value: optionValue.includeChannelId,
        name: '渠道'
    },
    {
        value: optionValue.excludeChannelId,
        name: '指定渠道不投放'
    },
    {
        value: optionValue.isBeta,
        name: '是否内测'
    },
    {
        value: optionValue.isAbTest,
        name: '是否启用AB测试'
    },
    {
        value: optionValue.status,
        name: '状态'
    },
    {
        value: optionValue.sort,
        name: '排序号'
    }
];