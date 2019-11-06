import { FORM_TYPES } from 'Src/components/Form/constants';
import { modifyCorrelationFragment } from 'Src/utils';
const [{ key: NORMAL_FORM }, { key: SEARCH_FORM }] = FORM_TYPES;

interface FormChildren {
    components?: any;
    stateName?: string;
    activeEvent?: {};
    componentName?: string;
    source?: string;
    default?: boolean;
}

/**
 * 整理JSON
 */
export const formatComponents = (components: any[]): Array<any> => {
    return components.map((item: any,) => {
        const { components: children = [], componentName } = item;
        if (componentName === 'Form' && children.length) {
            // Form下的特殊处理
            const { type, stateName } = item;
            item.components = formatComponents(children).map((item) => ({
                ...item,
                formType: type,
                stateName: stateName
            }));

            // Form 内部的组件
            modifyCorrelationFragment(item.components, stateName, type);
            // item.components.forEach((it) => {
            //     if (it.componentName === 'Radio') {
            //     //
            //     }
            // })

            if (type === NORMAL_FORM) {
                item.activeEvents = [
                    {
                        eventType: 'request',
                        dependencies: {
                            type: 'fetch',
                            api: {
                                key: 'save',
                                value: item.saveApi
                            },
                            actionType: 'save',
                            responseType: 'object',
                            method: 'post',
                        }
                    },
                    {
                        eventType: 'request',
                        dependencies: {
                            type: 'fetch',
                            api: {
                                key: 'update',
                                value: item.updateApi
                            },
                            actionType: 'update',
                            responseType: 'object',
                            method: 'post',
                        }
                    },
                    {
                        eventType: 'request',
                        dependencies: {
                            type: 'fetch',
                            api: {
                                key: 'get',
                                value: item.getApi
                            },
                            actionType: 'get',
                            responseType: 'object',
                            method: 'get',
                        }
                    },
                ];
            } else if (type === SEARCH_FORM) {
                const tableIndex = components.findIndex(({ componentName }) => componentName === 'Table');
                if (tableIndex > 0) {
                    item.activeEvents = [
                        {
                            eventType: 'request',
                            dependencies: {
                                ...components[tableIndex].dependencies,
                                responseType: 'list'
                            }
                        },
                        // {
                        //     eventType: 'link',
                        //     dependencies: {
                        //         ...components[tableIndex].dependencies,
                        //         responseType: 'list'
                        //     }
                        // }
                    ];
                }
            }
        }
        if (componentName === 'Table') {
            // Table 的特殊册立
            // item.props.columns = [
            //     ...item.props.columns,
            //     {
            //         title: '操作',
            //         component: {
            //             componentName: 'a', // 组件名称
            //             type: 'link',
            //             href: 'http://www.baidu.com',
            //         }
            //     }
            // ];
            item.props.columns = item.props.columns.filter(({ component }) => !component);
        }
        return item;
    });
};

/**
 * 查找Form中的paramKey
 * @param components any[]
 */
export const findParamKey = (components: any[]): string => {
    let key = '';
    components.forEach(({ componentName, paramKey }) => {
        if (componentName === 'Form') {
            key = paramKey;
        }
    });
    return key;
};
