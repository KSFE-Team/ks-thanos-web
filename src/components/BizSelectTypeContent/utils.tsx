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
        contentArr: '',
        typeLabel: '内容类型',
        typeField: 'contentType',
        contentField: 'contentId'
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
    componentName: 'BizSelectTypeContent',
    source: 'Src/components/@ks/kms-bizselecttypecontent',
    default: false,
    props: {
        params: '{"contentArr": "", "typeLabel": "", "typeField": "","contentField": "","initComponentValue": {}}'
    }
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'BizSelectTypeContent',
    icon: 'edit',
    componentName: 'BizSelectTypeContent',
    cloudName: '@ks/kms-bizselecttypecontent'
});

/**
 *  跳转类型
 */
export const LINK_OPTIONS = [
    {
        value: 'web',
        name: '网页'
    },
    {
        value: 'link',
        name: '网页'
    }
];
/**
 *  跳转类型
 */
export const NOJUMP_OPTIONS = [
    {
        value: 'static_pic',
        name: '不跳转'
    },
    {
        value: 'member_center',
        name: '会员中心'
    },
    {
        value: 'member_buy',
        name: '会员购买页'
    },
    {
        value: 'app_weixin',
        name: '微信服务号通知'
    },
    {
        value: 'top',
        name: '回到顶部'
    },
    {
        value: 'all_categories',
        name: '全部分类页'
    },

];
/**
 *  其他类型
 */
export const POTHER_OPTIONS = [
    {
        value: 'applets',
        name: '小程序'
    },
    {
        value: 'funland_answer',
        name: '凯叔答题'
    }
];
