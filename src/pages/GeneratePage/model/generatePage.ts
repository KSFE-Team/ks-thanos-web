import {actions} from 'kredux';
import {getUniqueID, request, insertComponents} from 'Src/utils';
import {API} from 'Src/api';
import {goto} from 'Src/utils/commonFunc';
import {message, Modal} from 'antd';

export const STATE = {
    count: 0,
    pageJSON: {
        name: '', // 页面名称
        components: [] // 子组件
    },
    pageName: '', // 页面名称
    chooseTabName: '',
    selectedComponentId: '', // 被选中组件ID
    cloudComponentList: [], // 云组件列表
};

export default {
    namespace: 'generatePage',
    initialState: {...STATE},
    effects: {
        /* 获取模版 */
        getTemplateItem: async(payload: any) => {
            const {pageOrTemp, pageName} = payload;
            const response = await request(API[pageOrTemp].get, {
                method: 'GET',
                body: {
                    [pageOrTemp + 'Name']: pageName
                }
            });
            if (response && !response.errcode) {
                const result = response.result;
                const components = JSON.parse(result[pageOrTemp + 'Data']).components;
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
                        name: result[pageOrTemp + 'Name'],
                        components: components[0].componentName === 'RelationTable' ? components[0].components : components
                    },
                    pageName: result[pageOrTemp + 'Name']
                });
            }
        },
        /* 新增修改模版 */
        addOrUpdateItem: async(payload: any) => {
            const {pageOrTemp, postDate} = payload;
            const response = await request(API[pageOrTemp].addOrUpdate, {
                method: 'post',
                body: {
                    ...postDate
                }
            });
            if (response && response.errcode === 0) {
                const text = postDate.id ? '修改' : '新增';

                if (pageOrTemp === 'template') {
                    message.success(`${text}模板配置成功`);
                    Modal.confirm({
                        title: `是否前往模板列表查看`,
                        okText: 'YES',
                        cancelText: 'NO',
                        onOk: () => {
                            goto(`myTemplate`);
                        },
                    });
                } else {
                    message.success(`${text}页面配置成功`);
                    goto('');
                }
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
