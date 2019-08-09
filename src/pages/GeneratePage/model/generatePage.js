import { actions } from 'kredux';
import { getUniqueID } from 'Src/utils';

export default {
    namespace: 'generatePage',
    initialState: {
        count: 0,
        pageJSON: {
            name: "", // 页面名称
            components: [] // 子组件
        }
    },
    reducers: {
        insertComponent: (payload, getState, dispatch) => {
            const state = getState();
            let { generatePage } = state,
                { pageJSON } = generatePage,
                { components } = pageJSON;
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
    }
}