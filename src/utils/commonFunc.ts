import history from './history';
import { PROJECT_NAME } from './constants';
import { ALL_TOOLS } from 'Src/components';
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
    const id = that.state.current.id; // 当前操作的组件id
    const currentComponentName = that.state.current.componentName; // 当前组件的名称
    console.log(currentComponentName);
    const pageJSON = ALL_TOOLS[currentComponentName].getInitJson();
    const components = that.props.pageJSON.components; // 页面里的所有组件：数组
    const index = components.findIndex((item) => {
        return item.id === id;
    });
    if (index === -1) {
        let itemIndex, parentIndex;
        components.forEach((item, index) => {
            if (item.components) {
                item.components.forEach((item, indexs) => {
                    if (item.id === id) {
                        parentIndex = index;
                        itemIndex = indexs;
                    }
                });
            }
        });
        const newData = that.props.pageJSON.components[parentIndex].components[itemIndex];
        for (const key in pageJSON) {
            newData[key] = pageJSON[key];
        }
        const newArray = that.props.pageJSON.components;
        newArray[parentIndex].components[itemIndex] = newData;
        actions.generatePage.setReducers({
            pageJSON: {
                components: newArray
            }
        });
    } else {
        const newData = that.props.pageJSON.components[index];
        for (const key in pageJSON) {
            newData[key] = pageJSON[key];
        }
        const newArray = that.props.pageJSON.components;
        newArray[index] = newData;
        actions.generatePage.setReducers({
            pageJSON: {
                components: newArray
            }
        });
    }

    if (type === 'InputNumber' || type === 'Select' || type === 'RangePicker') {
        that.props.form.resetFields();
    }
    that.setState({...initState, isClear: true});
};
