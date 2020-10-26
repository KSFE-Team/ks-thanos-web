/**
 * 提交校验 - 是否信息都已填完整
 * type 类型
 * data 要校验的数据源
 * field 要校验的字段
 */

interface checkFieldDataResult {
    error: boolean;
    message: string;
}
// 通用校验
const FIELD_ARR = ['key', 'label'];
// Form
const FORM_FIELD = ['stateName', 'type', 'saveApi', 'updateApi', 'getApi', 'paramKey'];
// Select
const SELECT_FIELD = ['label', 'value'];
// Radio Checkbox
const RADIO_CHECKBOX_FIELD = ['text', 'value'];
// BizSelectModal
const BIZ_FIELD = ['key', 'label', 'type'];
// Table
const TABLE_FIELD = {
    config: [
        'dependencies',
        'stateName',
    ],
    dataSource: [
        'dataKey',
        'tableName'
    ]
};
// ExtendContainer
const EXTEND_FIELD = ['label', 'formKey', 'sortKey', 'addButtonText'];

export function checkFieldData(type: string, data: any, source?: string): checkFieldDataResult {
    let tempArr = [];
    switch (type) {
        case 'Form':
            if (data.type === 'normal') {
                return {
                    error: checkCommonFn(data, FORM_FIELD),
                    message: 'Form'
                };
            } else if (data.type === 'search') {
                return {
                    error: !data.stateName,
                    message: 'Form'
                };
            }
        case 'Input':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'Input'
            };
        case 'Select':
            tempArr = data.options.map((item) => {
                return {
                    value: item.props.value,
                    label: item.label
                };
            });
            return {
                error: checkCommonFn(data, FIELD_ARR) || checkArrayCommonFn(tempArr, SELECT_FIELD),
                message: 'Select'
            };
        case 'DatePicker':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'DatePicker'
            };
        case 'InputNumber':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'InputNumber'
            };
        case 'RangePicker':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'RangePicker'
            };
        case 'Textarea':
            return {
                error: checkCommonFn(data, FIELD_ARR),
                message: 'Textarea'
            };
        case 'Radio':
            return {
                error: checkCommonFn(data, FIELD_ARR) || checkArrayCommonFn(data.options, RADIO_CHECKBOX_FIELD),
                message: 'Radio'
            };
        case 'Checkbox':
            tempArr = data.options.map((item: any) => {
                return {
                    text: item.text,
                    value: item.props.value
                };
            });
            return {
                error: checkCommonFn(data, FIELD_ARR) || checkArrayCommonFn(tempArr, RADIO_CHECKBOX_FIELD),
                message: 'Checkbox'
            };
        case 'BizSelectModal':
            return {
                error: checkCommonFn(source ? { ...data, type: data.props.type } : data, BIZ_FIELD),
                message: 'BizSelectModal'
            };
        case 'Table':
            if (source) {
                tempArr = data.props.columns.map((item) => {
                    return {
                        dataKey: item.dataIndex,
                        tableName: item.title
                    };
                });
            } else {
                tempArr = data.dataSource;
            }
            return {
                error: checkCommonFn(data, TABLE_FIELD.config) || checkArrayCommonFn(tempArr, TABLE_FIELD.dataSource),
                message: 'Table'
            };
        case 'ExtendContainer':
            return {
                error: checkCommonFn(data, EXTEND_FIELD),
                message: 'ExtendContainer'
            };
    }
    return {
        error: false,
        message: ''
    };
};

function checkCommonFn(data, field) {
    // let flag = false;
    return field.some((validateKey: string) => !data[validateKey]);
    // Object.keys(data).forEach(() => {
    //     field.find((key: any) => {
    //         if (!data[key]) {
    //             flag = true;
    //             return true;
    //         }
    //     });
    // });
    // return flag;
};

function checkArrayCommonFn(data, field) {
    let flag = false;
    if (data.length > 0) {
        data.forEach((item: any) => {
            field.find((key: any) => {
                if (!item[key] && item[key] !== 0) {
                    flag = true;
                    return true;
                }
            });
        });
    } else {
        flag = true;
    }
    return flag;
}
