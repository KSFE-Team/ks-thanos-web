export const env = process.env.NODE_ENV;
export const PROJECT_NAME = env === 'production' ? '/h5/ks-thanos' : '';

/**
 * 表单布局
 */
export const FORMITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

/**
 * 表单配置常量定义
 */
export const ALIAS = {
    KEY: '表单Key', // 表单绑定key
    LABEL: '表单Label', // 表单对应展示名称
    PLACEHOLDER: 'Placeholder',
    DATE_FORMAT: '日期格式',
    SHOW_TIME: '是否有选择时间功能',
    TIME_FORMAT: '时间格式',
    TYPE: '类型',
};
