/**
 * 获取初始化JSON
 */
export const getInitJson = () => ({
    stateName: '',
    componentName: 'Checkbox',
    source: 'antd',
    default: false,
    options: [{
        props: {
            disabled: false,
            checked: false,
            value: ''
        },
        text: '',
        rowKey: 0
    }],
    label: '',
    key: '',
});

/**
 * 获取组件Tools配置
 */
export const getTools = () => ({
    name: 'Checkbox',
    icon: 'check-circle',
    componentName: 'Checkbox'
});

/**
 * 初始化state
 */
const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const CHECK = 'checked';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const KEY = 'key';
const ROW_KEY = 'rowKey';
export const initState = {
    formData: {
        [OPTIONS]: [{
            props: {
                [DISABLED]: false,
                [CHECK]: false,
                [VALUE]: ''
            },
            [TEXT]: '',
            [ROW_KEY]: 0
        }],
        [LABEL]: '',
        [KEY]: '',
    },
    isTouch: false,
    errMessage: '',
    current: {
        id: '',
        props: {}
    }
};
