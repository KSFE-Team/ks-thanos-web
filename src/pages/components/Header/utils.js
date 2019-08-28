/**
 * 整理JSON
 */
export const formatJSON = (JSON) => {
    let { components } = JSON,
        formChildren = {},
        result = [];
    components.forEach((component) => {
        const { parentId } = component;
        if (parentId) {
            let parent = components.find(({id}) => id === parentId);
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
                }
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
            componentName: "Form",
            source: "antd",
            default: false,
        }
        result.unshift(formChildren);
    }
    return {
        components: result
    }
}