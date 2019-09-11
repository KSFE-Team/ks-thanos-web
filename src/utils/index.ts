export { default as request } from './request';

// 生成随机码
export const getUniqueID = () => {
    return Math.random().toString(36).substring(2);
};

/**
 * 数组转化 树形数组
 *
 * @typedef {Object} attrParams
 * @property {number} rootId Top parentId
 * @property {string} id 当前Id
 * @property {string} parentId 父级Id
 *
 * @param {Array} 转化的数组
 * @type {attrParams}
 * @return {Array}  返回树形数组
 */
export function toTreeData(data, {
    id,
    parentId,
    rootId
}) {
    const resData:any[] = [...data]; const tree:any[] = [];
    function run(chiArr) {
        if (resData.length !== 0) {
            for (let i = 0; i < chiArr.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (chiArr[i][id] === resData[j][parentId]) {
                        chiArr[i].children = chiArr[i].children || [];
                        chiArr[i].children.push(resData[j]);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                if (chiArr[i].children) {
                    run(chiArr[i].children);
                }
            }
        }
    }

    for (let i = 0; i < resData.length; i++) {
        if (resData[i][parentId] === rootId) {
            tree.push(resData[i]);
            resData.splice(i, 1);
            i--;
        } else if (data.every((res) => res[id] !== resData[i][parentId])) {
            tree.push(resData[i]);
            resData.splice(i, 1);
            i--;
        }
    }
    run(tree);
    return tree;
};

/**
     * 修改配置显隐藏
     */
export const changeConfig = (id: string, components: any[], config: any) => {
    return components.map((item) => {
        if (item.id === id) {
            item = {
                ...item,
                ...config
            };
        } else if (item.components) {
            item.components = changeConfig(id, item.components, config);
        }
        return item;
    });
};

/**
 * 找到当前显示的
 * @param components
 */
export const findComponent = (components: any[]) => {
    let result: any;
    components.forEach((item: any) => {
        if (!result) {
            if (item.configVisible) {
                result = item;
            } else if (item.components) {
                const tempResult = findComponent(item.components);
                if (tempResult) {
                    result = tempResult;
                }
            }
        }
    });
    return result;
};
