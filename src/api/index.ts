const server = '/thanos-api';
export const API = {
    page: {
        query: server + '/api/ks-thanos/v1/page/get',
        save: server + '/api/ks-thanos/v1/page/add', // 保存JSON
        update: server + '/api/ks-thanos/v1/page/add', // 更新JSON
        delete: server + '/api/ks-thanos/v1/page/delete'
    },
    pageList: {
        query: server + '/api/ks-thanos/v1/page/list'
    }
};
