// const server = process.env.BABEL_ENV === 'production' ? 'http://kaishufe.kaishustory.com' : 'http://10.0.23.7:3000/api';
const server = 'http://kaishufe.kaishustory.com';

export const API = {
    page: {
        save: server + '/api/ks-thanos/v1/obtainJson', // 保存JSON
    }
};
