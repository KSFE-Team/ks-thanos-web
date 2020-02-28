import history from './history';
import { PROJECT_NAME } from './constants';
import { actions } from 'kredux';

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
    console.log(that);
    const pageJSON = that.getInitJson();
    const newData = that.props.pageJSON.components[0];
    for (const key in pageJSON) {
        newData[key] = pageJSON[key];
    }
    actions.generatePage.setReducers({
        pageJSON: {
            components: [newData]
        }
    });
    if (type === 'InputNumber' || type === 'Select' || type === 'RangePicker') {
        that.props.form.resetFields();
    }
    that.setState({...initState, isClear: true});
};
