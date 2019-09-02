import React, { Component } from 'react';
import { Icon, Select, Form, Button } from 'antd';
import './index.scss';
import { actions } from 'kredux';
import * as Components from 'Components';

const Option = Select.Option;
const FormItem = Form.Item;

/**
 * 组件库
 */

const TOOLS = Object.keys(Components).map((key) => Components[key].getTools());
console.log(TOOLS);

export default class TopToolbar extends Component {

    state = {
        currComp: ''
    }

    render() {
        {/* <ul className="thanos-top-toolbar">
                {
                    TOOLS.map(({name, icon, componentName}, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    actions.generatePage.insertComponent(Components[componentName].getInitJson())
                                }}
                            >
                                <Icon type={icon} />
                                <div>{name}</div>
                            </li>
                        )
                    })
                }
            </ul> */}
        return (
            <Form
                layout="inline"
                className="thanos-top-toolbar"
            >
                <FormItem
                    label="页面组件"
                >
                    <Select
                        allowClear
                        style={{width: '160px'}}
                        placeholder="请选择添加组件"
                        onChange={(val: string) => {
                            this.setState({
                                currComp: val
                            });
                            if (!val) {
                                return;
                            }
                            actions.generatePage.insertComponent(Components[val].getInitJson())
                        }}
                    >
                        {
                            TOOLS.map(({name, icon, componentName}, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={componentName}
                                    >
                                        <Icon type={icon} /> {name}
                                    </Option>
                                );
                            })
                        }
                    </Select>
                </FormItem>
                {this.state.currComp && <FormItem>
                    <Button
                        type='primary'
                        onClick={() => {
                            actions.generatePage.insertComponent(Components[this.state.currComp].getInitJson())}
                        }
                    >再来一个</Button>
                </FormItem>}
            </Form>
        );
    }
}

