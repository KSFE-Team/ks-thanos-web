import {actions} from 'kredux';
import {getUniqueID, request, insertComponents} from 'Src/utils';
import {API} from 'Src/api';
import {goto} from 'Src/utils/commonFunc';
import {message} from 'antd';

export const STATE = {
    count: 0,
    pageJSON: {
        name: '', // 页面名称
        components: [] // 子组件
    },
    pageName: '', // 页面名称
    selectedComponentId: '',
    chooseTabName: '',
};

export default {
    namespace: 'generatePage',
    initialState: {...STATE},
    effects: {
        getTemplateItem: async(payload) => {
            const response = await request(API.page.query, {
                method: 'GET',
                body: {
                    pageName: payload.pageName
                }
            });
            if (response && !response.errcode) {
                const result = response.result;
                const components = JSON.parse(result.pageData).components;
                if (components[0].componentName === 'RelationTable') {
                    actions.generatePage.setReducers({
                        chooseTabName: 'RelationTable'
                    });
                } else {
                    actions.generatePage.setReducers({
                        chooseTabName: ''
                    });
                }
                actions.generatePage.setReducers({
                    pageJSON: {
                        name: result.pageName,
                        components: components[0].componentName === 'RelationTable' ? components[0].components : components
                    },
                    pageName: result.pageName
                });
            }
        },
        addTemplateItem: async(payload?) => {
            // console.log('addTemplateItem payload =>>', JSON.stringify(payload));
            const response = await request(API.page.save, {
                method: 'post',
                body: {
                    ...payload
                }
            });
            if (response && response.errcode === 0) {
                message.success('提交配置成功');
                goto('');
            }
        },
        updateTemplateItem: async(payload) => {
            const response = await request(API.page.update, {
                method: 'post',
                body: {
                    ...payload
                }
            });
            if (response && response.errcode === 0) {
                message.success('更新配置成功');
            }
        }
    },
    reducers: {
        insertComponent: (payload: any, getState: any) => {
            const state = getState();
            const {generatePage} = state;
            let {pageJSON} = generatePage;
            const {components} = pageJSON;
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
        insertFormComponent: (payload: any, getState) => {
            const state = getState();
            const {generatePage} = state;
            let pageJSON = {...generatePage.pageJSON};
            const {components} = pageJSON;
            insertComponents(payload, components);
            // console.log('had insert components =>', components);

            // // from 组件可配置时
            // const FormVisibleIndex = components.findIndex(({ componentName, configVisible }) => componentName === 'Form' && configVisible);
            // // 配置 From 组件
            // if (FormVisibleIndex >= 0) {
            //     components[FormVisibleIndex] = {
            //         ...components[FormVisibleIndex],
            //         components: [
            //             ...components[FormVisibleIndex].components || [],
            //             {
            //                 ...insertComponent,
            //                 id: getUniqueID(),
            //             }
            //         ]
            //     };
            // } else {
            //     // 配置 Fragment 组件
            //     const FormIndex = components.findIndex(({ componentName }) => componentName === 'Form');
            //     if (FormIndex >= 0) {
            //         const FragmentVisibleIndex = components[FormIndex].components.findIndex(({ componentName, configVisible }) => componentName === 'Fragment' && configVisible);
            //         components[FormIndex].components[FragmentVisibleIndex] = {
            //             ...components[FormIndex].components[FragmentVisibleIndex],
            //             components: [
            //                 ...components[FormIndex].components[FragmentVisibleIndex].components,
            //                 {
            //                     ...insertComponents,
            //                     id: getUniqueID()
            //                 }
            //             ]
            //         };
            //     }
            // }

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
        },
        changeTemplateName: (payload: { name: string }) => {
            return {
                pageName: payload.name
            };
        },
        selectComponent: (payload) => {
            return {
                selectedComponentId: payload.id
            };
        }
    }
}
;
