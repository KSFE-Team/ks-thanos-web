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
};
