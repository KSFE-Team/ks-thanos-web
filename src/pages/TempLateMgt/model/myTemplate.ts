import request from '../../../utils/request';
import { API } from '../../../api/index';
import { actions } from 'kredux';
import { message } from 'antd';

export const STATE = {
    list: [],
    page: 1,
    limit: 10,
    totalPage: 0,
    total: 0,
    pageName: {
        value: ''
    }, // 模版名称
    type: {
        value: ''
    }, // 模板类型
    cuTempLateModalVisible: false
};
export default {
    namespace: 'myTemplate',
    initialState: { ...STATE },
    effects: {
        async getTemplateList(payload: any, getState: any) {
            const templateState = getState().myTemplate;
            const {pageOrTemp, type} = payload;
            const postData = {
                page: templateState.page,
                limit: templateState.limit,
                type: type,
                [pageOrTemp + 'Name']: templateState.pageName.value
            };
            const response = await request(API[pageOrTemp + 'List'].query, {
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
            const {pageOrTemp, pageName} = payload;
            const response = await request(API[payload.pageOrTemp].delete, {
                method: 'POST',
                body: {
                    [pageOrTemp + 'Name']: pageName
                }
            });

            if (response && !response.errcode) {
                const text = pageOrTemp === 'page' ? '页面' : '模板';
                message.success(`删除${text}${pageName}成功`);
                actions.myTemplate.getTemplateList(pageOrTemp);
            }
        }
    }
};
