export const CONTENT_ARR = [
    {
        label: '专辑',
        value: 'album'
    },
    {
        label: '故事',
        value: 'story'
    }
];
/**
 * 默认的参数
 */
export const initState = {
    formData: {
        props: {
            params: {
                contentArr: ['album', 'story'],
                typeLabel: '内容类型',
                typeField: 'contnetType',
                contentField: 'contentId',
                aliasArry: [],
                initComponentValue: {}
            }
        }
    },
    isTouch: false,
    current: {
        id: '',
        props: {}
    },
};

/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'SelectTypeContent',
    source: 'Src/components/@ks/kms-selecttypecontent',
    default: false,
    props: {
        params: {
            contentArr: [],
            typeLabel: '内容类型',
            typeField: 'contnetType',
            contentField: 'contentId',
            aliasArry: [],
            initComponentValue: {}
        }
    },
    options: []
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'SelectTypeContent',
    icon: 'edit',
    componentName: 'SelectTypeContent',
    cloudName: '@ks/kms-selecttypecontent'
});
