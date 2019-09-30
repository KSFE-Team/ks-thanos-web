const server = process.env.BABEL_ENV === 'production' ? 'http://kaishufe.kaishustory.com' : 'http://10.0.23.7:3000/api';
// const server = 'http://localhost:3012';
console.log('server', server);
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
