// const server = window.location.origin;
const server = 'http://kaishufe.kaishustory.com';
export const API = {
    page: {
        get: server + '/api/ks-thanos/v1/page/get',
        addOrUpdate: server + '/api/ks-thanos/v1/page/add', // 保存更新JSON
        delete: server + '/api/ks-thanos/v1/page/delete', // 删除模版
    },
    pageList: {
        query: server + '/api/ks-thanos/v1/page/list'
    },
    templateList: {
        query: server + '/api/ks-thanos/v1/template/list'
    },
    template: {
        get: server + '/api/ks-thanos/v1/template/get',
        addOrUpdate: server + '/api/ks-thanos/v1/template/addOrUpdate', // 保存更新JSON
        delete: server + '/api/ks-thanos/v1/template/delete', // 删除模版
    },
    // 云组件
    cloudComponent: {
        query: server + '/api/ks-component-cloud/v1/component/thanosList', // 列表
    }
};
