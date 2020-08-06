import html2canvas from 'html2canvas';
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
    const resData: any[] = [...data]; const tree: any[] = [];
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
export const changeConfig = (id: string, components: any[], visible: boolean) => {
    return components.map((item) => {
        item = {
            ...item,
            configVisible: id === item.id ? visible : false
        };
        if (item.components) {
            item.components = changeConfig(id, item.components, visible);
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
                // if (item.components) {
                //     result = findComponent(item.components);
                // } else {
                //     result = item;
                // }
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

/**
 * 找到当前的组件并且更改配置
 */
export const saveComponent = (targetId: string, components: any[], config: any) => {
    return components.map((item) => {
        const { id: currentId, components: children } = item;
        if (currentId === targetId) {
            item = {
                ...item,
                ...config
            };
        } else if (children && children.length) {
            item.components = saveComponent(targetId, children, config);
        }
        return item;
    });
};

/**
 * 匹配当前路由
 */
export const matchRouter = (path: string, routerList: any[]) => {
    const currentPath = path;
    return routerList.find(({ path }) => path === currentPath) || {};
};

/**
 * 获取组件配置
 * @param components Object
 */
export const getTools = (components: any) => {
    return Object.keys(components).map((key) => components[key].getTools());
};

/**
 * 块域中插入组件
 */
export const insertComponents = (payload: any, components: any[] = []) => {
    if (!payload.targetId || !components.length) {
        return;
    }
    let item,
        hadInsert: boolean = false;
    for (item of components) {
        if (hadInsert) {
            break;
        }
        if (payload.targetId === item.id) {
            item.components = [
                ...item.components || [],
                {
                    id: getUniqueID(),
                    ...payload.insertComponent
                }
            ];
            hadInsert = true;
        } else {
            insertComponents(payload, item.components);
        }
    }
};

/**
 * 获取同级区域块
 */
export const getFragments = (targetId: string, components: any[] = []) => {
    if (!targetId || !components.length) {
        return [];
    }
    let fragments: any[] = [],
        item;
    for (item of components) {
        if (fragments && fragments.length) {
            return fragments;
        }
        const { id: currentId, components: children } = item;
        if (currentId === targetId) {
            fragments = components.filter((it) => it.componentName === 'Fragment');
        } else if (children && children.length) {
            fragments = getFragments(targetId, children);
        }
    }
    return fragments;
};

/**
 * 通过 fragmentId 获取被关联区域块
 */
export const getCorrelationFragment = (targetId: string, components: any[] = [], fragmentId: string) => {
    const fragments = getFragments(targetId, components);
    return fragments.find((item) => fragmentId === item.id);
};

/**
 * 修改被关联区域块的属性值
 */
export const modifyCorrelationFragment = (components: any[] = [], stateName: string, type: string) => {
    components.forEach((item) => {
        item.stateName = stateName;
        item.formType = type;
        if (item.componentName === 'Fragment') {
            modifyCorrelationFragment(item.components, stateName, type);
        }
        // 单选关联区域块
        if (item.componentName === 'Radio') {
            let fragment;
            // 循环 Radio 的 Option
            item.options.forEach((option) => {
                // 如果 Option 关联了区域块
                if (option.fragmentId) {
                    // 找的被关联的同级区域块
                    fragment = getCorrelationFragment(item.id, components, option.fragmentId);
                    // 如果有的话，则给该区域块添加两个属性
                    if (fragment) {
                        fragment.showKey = item.key;
                        fragment.showValue = option.value;
                    }
                }
            });
        }
        // 多选关联区域块
        if (item.componentName === 'Checkbox') {
            // let fragment;
            // // 循环 Radio 的 Option
            // item.options.forEach((option) => {
            //     // 如果 Option 关联了区域块
            //     if (option.fragmentId) {
            //         // 找的被关联的同级区域块
            //         fragment = getCorrelationFragment(item.id, components, option.fragmentId);
            //         // 如果有的话，则给该区域块添加两个属性
            //         if (fragment) {
            //             fragment.showKey = item.key;
            //             fragment.showValue = option.value;
            //         }
            //     }
            // });
        }
    });
};

/* 灭霸水印 */
const WATERMARK = '灭霸预览图';
/* 截图+水印 */
export const getScreenShotByCanvas = async() => {
    /* 获取截屏 */
    const container: HTMLElement = document.querySelector('.thanos-generate-page-container') || document.body;
    const canvas = await html2canvas(container);
    const ctx: any = canvas.getContext('2d');
    ctx.save();
    ctx.translate(canvas.width / 4, canvas.height / 4);
    ctx.rotate(-(30 * Math.PI / 180));
    ctx.globalAlpha = 0.05;
    ctx.font = '100px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(WATERMARK, 0, 50);
    ctx.restore();
    return canvas.toDataURL('image/jpeg', 0.5);
};
