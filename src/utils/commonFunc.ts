import history from './history';
import { PROJECT_NAME } from './constants';

/**
 * @desc 路由跳转方法
 * @param { string } route 需要跳转的路由
 */
export const goto = function(route) {
    history.push(`${PROJECT_NAME}/${route}`);
};

/**
 * 清除数据
 * @param route
 */
export const clearData = (that, initState, type = '') => {
    if (type === 'InputNumber' || type === 'Select' || type === 'RangePicker') {
        that.props.form.resetFields();
    }
    that.setState({...initState});
};
