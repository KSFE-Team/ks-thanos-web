/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'ExtendContainer',
    source: 'ks-cms-ui',
    default: false,
    label: '',
    formKey: '',
    sortKey: '',
    addButtonText: '',
    components: [], // 区域块内的组件
});

/**
 * 初始数据
 */
export const initState = {
    formData: {
        label: '',
        formKey: '',
        sortKey: '',
        addButtonText: '',
        // components: [], // 区域块内的组件
    },
    isTouch: false,
    // current: {
    //     id: '',
    //     props: {}
    // },
};

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'ExtendContainer',
    icon: 'menu',
    componentName: 'ExtendContainer'
});

/**
 * 过滤云组件
 */
export const filterCloudComponents = (serverList: any[], localCloudConfig: any) => {
    return Object.keys(localCloudConfig).reduce((prev: any, key: string) => {
        const { getTools } = localCloudConfig[key];
        const { cloudName = '' } = getTools();
        if (cloudName && serverList.some(({ name }) => `${name}` === `${cloudName}`)) {
            prev = {
                ...prev,
                [key]: localCloudConfig[key]
            };
        }
        return prev;
    }, {});
};
