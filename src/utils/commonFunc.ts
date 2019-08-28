import history from './history';
import { PROJECT_NAME } from './constans';

/**
 * @desc 路由跳转方法
 * @param { string } route 需要跳转的路由
 */
export const goto = function(route) {
    history.push(`${PROJECT_NAME}/${route}`)
};