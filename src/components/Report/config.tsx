import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Select, message } from 'antd';
const { Option } = Select;
const FormItem = Form.Item;

interface ReportConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): any;
}

export default class ReportConfig extends Component<ReportConfigProps> {
    state = {
        api: '', // api path
        currentComponent: {
            stateName: '',
            props: {
                type: ''
            }
        }, // current component info
        currentComponentIdx: '', // current component index
        editDataFlag: false,
        method: 'GET' // request method
    };

    static getDerivedStateFromProps(props, state) {
        const newState: any = {};
        if (!state.editDataFlag) {
            const currentComponent = props.pageJSON.components.find(
                (item, index) => {
                    if (item.configVisible) {
                        newState.currentComponentIdx = index;
                        newState.editDataFlag = true;
                    }
                    return item.configVisible;
                }
            );

            if (currentComponent) {
                newState.currentComponent = currentComponent;

                if (
                    !state.api &&
                    currentComponent.dependencies &&
                    currentComponent.dependencies.api
                ) {
                    newState.api =
                        currentComponent.dependencies.api.value || '';
                }

                if (currentComponent.dependencies.method) {
                    newState.method = currentComponent.dependencies.method;
                }
            }
        }

        return Object.keys(newState).length ? newState : null;
    }

    /**
     * @desc 保存报表数据
     */
    saveReportData = () => {
        if (!this.checkData()) {
            return;
        }
        const pageJSON = this.props.pageJSON;
        const { currentComponent, api, method } = this.state;
        pageJSON.components = pageJSON.components.map((item) => {
            if (item.configVisible) {
                item.stateName = currentComponent.stateName;
                item.props = {
                    type: currentComponent.props.type
                };

                item.dependencies = {
                    type: 'fetch', // 数据来源类型 fetch 接口， dict 本地字典
                    responseType: 'list', // 接口返回类型， // list 列表， object 对象
                    api: {
                        key: 'query',
                        value: api
                    }, // 接口地址
                    method,
                    actionType: 'get'
                };
            }
            return item;
        });
        this.props.onSave(pageJSON);
    };

    /**
     * @desc check require option
     */
    checkData = () => {
        const { api, method, currentComponent } = this.state;
        if (!api) {
            message.error('api不可为空');
            return false;
        } else if (!method) {
            message.error('请求方式不可为空');
            return false;
        } else if (!method) {
            message.error('请求方式不可为空');
            return false;
        } else if (!currentComponent.stateName) {
            message.error('表头名称不能为空');
            return false;
        }
        return true;
    };

    /**
     * @desc api接口地址变更
     * @param { Object } event
     */
    handleApiChange = (event) => {
        const { value } = event.target;
        this.setState({
            api: value
        });
    };

    /**
     * @desc 请求方法变更
     * @param { String } value
     */
    handleMethodChange = (value) => {
        this.setState({
            method: value
        });
    };

    /**
     * 报表名称(组件存储数据Key, 使用英文且唯一)
     * */
    handleStateNameChange = (event) => {
        const { value } = event.target;
        const currentComponent = {
            ...this.state.currentComponent,
            stateName: value
        };
        this.setState({
            currentComponent
        });
    };

    /**
     * @desc 报表类型变更
     * @param { String } value
     */
    handleTypeChange = (value) => {
        const currentComponent = {
            ...this.state.currentComponent,
            props: {
                type: value
            }
        };
        this.setState({
            currentComponent
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        };
        const { currentComponent } = this.state;

        return (
            <React.Fragment>
                <FormItem {...formItemLayout} label="接口地址">
                    <Input
                        value={this.state.api}
                        placeholder="例：/user/list"
                        onChange={this.handleApiChange}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="请求方式">
                    <Select
                        defaultValue={this.state.method}
                        style={{ width: 120 }}
                        onChange={this.handleMethodChange}
                    >
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                    </Select>
                </FormItem>
                <FormItem {...formItemLayout} label="报表名称">
                    <Input
                        value={currentComponent.stateName}
                        placeholder="组件存储数据Key, 使用英文且唯一"
                        onChange={this.handleStateNameChange}
                    />
                </FormItem>
                <FormItem {...formItemLayout} label="报表类型">
                    <Select
                        style={{ minWidth: 150 }}
                        value={currentComponent.props.type}
                        placeholder="请选择报表类型"
                        onChange={this.handleTypeChange}
                    >
                        <Option value="line">折线图</Option>
                        <Option value="pie">饼状图</Option>
                    </Select>
                </FormItem>
                <Row
                    style={{ marginTop: '20px' }}
                    type="flex"
                    justify="end"
                    gutter={1}
                >
                    <Col offset={1}>
                        <Button type="primary" onClick={this.saveReportData}>
                            确定
                        </Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
