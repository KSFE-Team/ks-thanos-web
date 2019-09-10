import {actions} from 'kredux';
import {getUniqueID} from 'Src/utils';

export default {
    namespace: 'generatePage',
    initialState: {
        count: 0,
        pageJSON: {
            name: '', // 页面名称
            components: [] // 子组件
        }
    },
    reducers: {
        insertComponent: (payload, getState) => {
            const state = getState();
            const { generatePage } = state;
            let { pageJSON } = generatePage;
            const { components } = pageJSON;
            pageJSON = {
                ...pageJSON,
                components: [
                    ...components,
                    {
                        ...payload,
                        id: getUniqueID(),
                    }
                ]
            };
            actions.generatePage.setReducers({
                pageJSON
            });
            actions.operate.save({
                modelName: 'generatePage',
                data: {
                    pageJSON
                },
            });
        },
        insertFormComponent: (payload, getState) => {
            const state = getState();
            const { generatePage } = state;
            let { pageJSON } = generatePage;
            const { components } = pageJSON;
            const FormIndex = components.findIndex(({componentName, selected}) => componentName === 'Form' && selected);
            components[FormIndex] = {
                ...components[FormIndex],
                children: [
                    ...components[FormIndex].children || [],
                    {
                        ...payload,
                        id: getUniqueID(),
                    }
                ]
            };

            pageJSON = {
                ...pageJSON,
                components: [
                    ...components,
                ]
            };
            actions.generatePage.setReducers({
                pageJSON
            });
            actions.operate.save({
                modelName: 'generatePage',
                data: {
                    pageJSON
                },
            });
        }
    }
}
;
