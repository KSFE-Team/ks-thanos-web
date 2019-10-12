import { actions } from 'kredux';
import { getUniqueID, request } from 'Src/utils';
import { API } from 'Src/api';
import { goto } from 'Src/utils/commonFunc';
import { message } from 'antd';

const ONLY_ONCE_COMPONENTS = ['Table', 'Form'];

// const [TABLE, FORM] = ONLY_ONCE_COMPONENTS;

export default {
    namespace: 'generatePage',
    initialState: {
        count: 0,
        pageJSON: {
            name: '', // 页面名称
            components: [] // 子组件
        },
        pageName: '', // 页面名称
        selectedComponentId: '',
    },
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
                actions.generatePage.setReducers({
                    pageJSON: {
                        name: result.pageName,
                        components: JSON.parse(result.pageData).components
                    },
                    pageName: result.pageName
                });
            }
        },
        addTemplateItem: async(payload?) => {
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
            const { generatePage } = state;
            let { pageJSON } = generatePage;
            const { components } = pageJSON;
            if (ONLY_ONCE_COMPONENTS.includes(payload.componentName) && components.some(({ componentName }) => componentName === payload.componentName)) {
                message.warn('该组件只能配置一次');
                return;
            }
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
            const { generatePage } = state;
            let { pageJSON } = generatePage;
            const { components } = pageJSON;
            const FormIndex = components.findIndex(({ componentName, configVisible }) => componentName === 'Form' && configVisible);
            components[FormIndex] = {
                ...components[FormIndex],
                components: [
                    ...components[FormIndex].components || [],
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
