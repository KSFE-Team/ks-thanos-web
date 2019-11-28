import { actions } from 'kredux';
import { getUniqueID, request } from 'Src/utils';
import { API } from 'Src/api';
import { goto } from 'Src/utils/commonFunc';
import { message } from 'antd';

/**
 * 只能配置一次的组件
 */
const ONLY_ONCE_COMPONENTS = ['Table', 'Form'];

export const STATE = {
    count: 0,
    pageJSON: {
        name: '', // 页面名称
        components: [] // 子组件
    },
    pageName: '', // 页面名称
    selectedComponentId: '', // 被选中组件ID
    cloudComponentList: [], // 云组件列表
};

export default {
    namespace: 'generatePage',
    initialState: {...STATE},
    effects: {
        /* 获取模版 */
        getTemplateItem: async(payload: any) => {
            const response = await request(API.page.get, {
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
        /* 新增模版 */
        addTemplateItem: async(payload: any) => {
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
        /* 更新模版 */
        updateTemplateItem: async(payload: any) => {
            const response = await request(API.page.update, {
                method: 'post',
                body: {
                    ...payload
                }
            });
            if (response && response.errcode === 0) {
                message.success('更新配置成功');
            }
        },
        /* 加载云组件列表 */
        loadCloudComponentList: async() => {
            const response = await request(API.cloudComponent.query, {
                method: 'get'
            });
            if (response && response.errcode === 0) {
                actions.generatePage.setReducers({
                    cloudComponentList: response.result.list
                });
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
