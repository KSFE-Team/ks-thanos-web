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
