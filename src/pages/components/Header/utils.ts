import { FORM_TYPES } from 'Src/components/Form/constants';
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
            const { type, stateName } = item;
            item.components = formatComponents(children).map((item) => ({
                ...item,
                formType: type,
                stateName: stateName
            }));
            if (type === NORMAL_FORM) {
                item.activeEvents = [
                    {
                        eventType: 'request',
                        dependencies: {
                            type: 'fetch',
                            api: item.saveApi,
                            actionType: 'save',
                            responseType: 'object',
                            method: 'post',
                        }
                    },
                    {
                        eventType: 'request',
                        dependencies: {
                            type: 'fetch',
                            api: item.updateApi,
                            actionType: 'update',
                            responseType: 'object',
                            method: 'post',
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
        return item;
    });
};
