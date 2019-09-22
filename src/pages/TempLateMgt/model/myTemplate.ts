import request from '../../../utils/request';
import { API } from '../../../api/index';
import { actions } from 'kredux';

export default {
    namespace: 'myTemplate',
    initialState: {
        list: [],
        page: 1,
        limit: 15,
        totalPage: 0,
        total: 0,
        pageName: {
            value: ''
        }, // 模版名称
    },
    effects: {
        async getTemplateList(payload: any, getState: any) {
            const templateState = getState().myTemplate;
            const postData = {
                page: templateState.page,
                limit: templateState.limit,
                pageName: templateState.pageName.value
            };
            const response = await request(API.pageList.query, {
                method: 'GET',
                body: postData
            });
            if (response && !response.errcode) {
                const result = response.result;
                actions.myTemplate.setReducers({
                    list: result.list,
                    totalPage: result.totalPage,
                    total: result.total
                });
            }
        },
        async deleteTemplateItem(payload: any) {
            const response = await request(API.page.delete, {
                method: 'GET',
                body: {
                    pageName: payload.pageName
                }
            });

            if (response && !response.errcode) {
                actions.myTemplate.getTemplateList();
            }
        }
    }
};
