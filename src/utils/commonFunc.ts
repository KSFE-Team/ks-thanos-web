import history from './history';
import { PROJECT_NAME } from './constants';
import { ALL_TOOLS } from 'Src/components';
import { actions } from 'kredux';

/**
 * @desc 路由跳转方法
 * @param { string } route 需要跳转的路由
 */
export const goto = function(route) {
    // history.push(`${PROJECT_NAME}${route}`);
    history.push(`${PROJECT_NAME}/${route}`);
};

/**
 * 获取层级数组的索引
 */
export const getComponents = (components, id = '') => {
    let nodeArray:Array<any> = [];
    if (id) {
        nodeArray = components.map((item) => {
            if (item.id === id) {
                const pageJSON = ALL_TOOLS[item.componentName].getInitJson();
                for (const key in pageJSON) {
                    if (item.componentName === 'Table' && key === 'tableType') {
                        if (item.tableType === 2 || item.tableType === 3) {
                            item.tableType = item[key];
                        }
                    } else {
                        item[key] = pageJSON[key];
                    }
                }
            } else {
                if (item.components && item.components.length) {
                    getComponents(item.components, id);
                }
            }
            return item;
        });
    } else {
        nodeArray = components.map((item) => {
            const pageJSON = ALL_TOOLS[item.componentName].getInitJson();
            for (const key in pageJSON) {
                if (item.componentName === 'Table' && key === 'tableType') {
                    if (item.tableType === 2 || item.tableType === 3) {
                        item.tableType = item[key];
                    }
                } else {
                    item[key] = pageJSON[key];
                }
            }
            if (item.components && item.components.length) {
                getComponents(item.components);
            }
            return item;
        });
    }

    return nodeArray;
};

/**
 * 清除数据
 * @param route
 */
export const clearData = (that, initState, type = '') => {
    const id = that.state.current.id; // 当前操作的组件id
    const components = that.props.pageJSON.components; // 页面里的所有组件：数组
    const newComponents = getComponents(components, id);
    actions.generatePage.setReducers({
        pageJSON: {
            components: newComponents
        }
    });
    if (type === 'InputNumber' || type === 'Select' || type === 'RangePicker') {
        that.props.form.resetFields();
    }
    that.setState({...initState, isClear: true});
};

/**
 * 清空所有配置
 */
export const clearAllData = (components) => {
    const newComponents = getComponents(components);
    actions.generatePage.setReducers({
        pageJSON: {
            components: newComponents
        }
    });
};
