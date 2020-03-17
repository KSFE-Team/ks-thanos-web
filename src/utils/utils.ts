
/**
 * 提交校验 - 是否信息都已填完整
 * type 类型
 * data 要校验的数据源
 * field 要校验的字段
 */
export function checkFieldData(type: string, data: any, field: any) {
    let flag = false, arr = [];
    switch (type) {
        case 'arr':
            return typeArr(data, field, 'arr');
        case 'obj':
            return typeArr(data, field, 'obj');
        case 'form':
            if (data.type === 'normal') {
                return typeArr(data, field, 'obj');
            } else if (data.type === 'search') {
                if (!data.stateName) {
                    flag = true;
                }
                return flag;
            }
        case 'checkoutArr':
            arr = data.map((item: any) => {
                return {
                    text: item.text,
                    value: item.props.value
                };
            });
            return typeArr(arr, field, 'arr');
        case 'radioArr':
            arr = data.map((item: any) => {
                return {
                    text: item.text,
                    value: item.value
                };
            });
            return typeArr(arr, field, 'arr');

    }
};

function typeArr(data, field, type) {
    let flag = false;
    switch (type) {
        case 'arr':
            data.forEach((item: any) => {
                field.find((key: any) => {
                    if (!item[key]) {
                        flag = true;
                        return true;
                    }
                });
            });
            break;
        case 'obj':
            Object.getOwnPropertyNames(data).forEach(() => {
                field.find((key: any) => {
                    if (!data[key]) {
                        flag = true;
                        return true;
                    }
                });
            });
            break;
    }
    return flag;
}
