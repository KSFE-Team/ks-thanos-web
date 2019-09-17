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
        }
        return item;
    });
};
