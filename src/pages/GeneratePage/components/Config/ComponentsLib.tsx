
import React, { Component } from 'react';
import { actions } from 'kredux';
import { Form, Input } from 'antd';
import { DATA_DISPLAY, DATA_ENTRY, OTHER_COMPONENTS, ALL_TOOLS, RELATION_TABLE } from 'Src/components';
import ComponentType from './ComponentType';
import { getTools } from 'Src/utils';
import {TABLE_TYPE} from 'utils/constants';
import './index.scss';
const { Search } = Input;
const FormItem = Form.Item;
const SPLIT_COUNT = 2;

/**
 * 组件库
 */
const TOOLS = {
    DATA_DISPLAY: getTools(DATA_DISPLAY),
    DATA_ENTRY: getTools(DATA_ENTRY),
    OTHER_COMPONENTS: getTools(OTHER_COMPONENTS),
    RELATION_TABLE: getTools(RELATION_TABLE),
};

interface PageConfigProps{
    generatePage: {
        pageJSON: {
            components: any[];
            name: string;
        };
    };
}

export default class ComponentsLib extends Component<PageConfigProps> {

    state = {
        search: ''
    }

    /**
     * 插入组件事件
     */
    handleClick = (componentName: string) => {
        if (componentName === 'RelationTable') {
            actions.generatePage.insertComponent(ALL_TOOLS.Form.getInitJson());
            actions.generatePage.insertComponent(ALL_TOOLS.Table.getInitJson(TABLE_TYPE.PARENT_TABLE));
            actions.generatePage.insertComponent(ALL_TOOLS.Form.getInitJson());
            const childrenObj = ALL_TOOLS.Table.getInitJson(TABLE_TYPE.CHILDREN_TABLE);
            actions.generatePage.insertComponent({childrenObj, relationParentKey: 'selectedRowKeys'});
        } else {
            actions.generatePage.insertComponent(ALL_TOOLS[componentName].getInitJson());
        }
    }

    /**
     * 过滤组件
     */
    fliterComponent = (tools: any) => {
        const { search } = this.state;
        return tools.filter(({ name }) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).reduce((prev, record) => {
            const lastItem = prev[prev.length - 1];
            if (!lastItem || lastItem.length === SPLIT_COUNT) {
                prev.push([record]);
            } else {
                lastItem.push(record);
            }
            return prev;
        }, []);
    }

    render() {
        const span = 24 / SPLIT_COUNT;
        const dataDisplayTools = this.fliterComponent(TOOLS.DATA_DISPLAY);
        // const dataEntryTools = this.fliterComponent(TOOLS.DATA_ENTRY);
        const otherTools = this.fliterComponent(TOOLS.OTHER_COMPONENTS);
        const relationTable = this.fliterComponent(TOOLS.RELATION_TABLE);
        return (
            <div className='thanos-page-config'>
                <div className='thanos-page-config-title'>组件库</div>
                <div className='thanos-page-config-form'>
                    <FormItem>
                        <Search
                            placeholder="组件查询"
                            onSearch={(value) => this.setState({ search: value })}
                        />
                    </FormItem>
                    {/* <ComponentType
                        dataSource={dataEntryTools}
                        span={span}
                        onClick={this.handleClick}
                        title={'录入组件'}
                    /> */}
                    <ComponentType
                        dataSource={dataDisplayTools}
                        span={span}
                        onClick={this.handleClick}
                        title={'展示组件'}
                    />
                    <ComponentType
                        dataSource={relationTable}
                        span={span}
                        onClick={this.handleClick}
                        title={'关联Table'}
                    />
                    <ComponentType
                        dataSource={otherTools}
                        span={span}
                        onClick={this.handleClick}
                        title={'其他组件'}
                    />
                </div>
            </div>
        );
    }
}
