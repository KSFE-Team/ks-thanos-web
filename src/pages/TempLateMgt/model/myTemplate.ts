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
        total: 0
    },
    effects: {
        async getTemplateList(payload, getState) {
            const templateState = getState().myTemplate;
            const response = await request(API.pageList.query, {
                method: 'GET',
                body: {
                    page: templateState.page,
                    limit: templateState.limit
                }
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
        async deleteTemplateItem(payload) {
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
