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
export const formatJSON = (JSON) => {
    const { components } = JSON;
    const result: any[] = [];

    let formChildren: FormChildren = {};

    components.forEach((component) => {
        const { parentId } = component;
        if (parentId) {
            const parent = components.find(({id}) => id === parentId);
            if (parent) {
                formChildren = {
                    ...formChildren,
                    components: [...(formChildren.components || []), {
                        ...component,
                        stateName: parent.stateName,
                    }],
                    stateName: parent.stateName,
                    activeEvent: {
                        eventType: 'api',
                        dependencies: parent.dependencies
                    }
                };
            } else {
                result.push(component);
            }
        } else {
            result.push(component);
        }
    });
    if (Object.keys(formChildren).length > 0) {
        formChildren = {
            ...formChildren,
            componentName: 'Form',
            source: 'antd',
            default: false,
        };
        result.unshift(formChildren);
    }
    return {
        components: result
    };
};
