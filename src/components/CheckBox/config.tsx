import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Icon, Switch, Alert } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    }
};

const KEY = 'key';
const LABEL = 'label';
const IS_CHECK = 'isCheck'

interface CheckBoxConfigProps {
    onSave(pageJSON: any): void,
    pageJSON: any
}

export default class CheckBoxConfig extends Component<CheckBoxConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        formData: [{
            [KEY]: '',
            [LABEL]: '',
            [IS_CHECK]: false,
        }],
        isTouch: false,
        errMessage: ''
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            let { pageJSON } = props,
                { components } = pageJSON,
                current = components.find(({ configVisible }) => configVisible);
            return {
                formData: current.formData || [{
                    [KEY]: '',
                    [LABEL]: '',
                    [IS_CHECK]: false
                }]
            }
        } else {
            return state
        }
    }

    /**
     * @desc 保存修改
     */
    handleSave = () => {
        const { formData } = this.state;
        let { pageJSON, onSave } = this.props;
        for (let i = 0; i < formData.length; i++) {
            let item = formData[i];
            if (!item[KEY]) {
                this.setState({
                    errMessage: '请输入表单项Key'
                })
                return;
            } else if (!item[LABEL]) {
                this.setState({
                    errMessage: '请输入表单项名称'
                })
                return;
            }
        }
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    formData,
                    props: {
                        formData: formData
                    }
                }
            }
            return component;
        })
        onSave && onSave(pageJSON)
    }

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (key, index: number, e) => {
        const { formData } = this.state;
        const value = e.target.value;
        formData[index][key] = value;
        this.setState({
            formData,
            isTouch: true
        });
    };

    /**
     * @desc 添加项
     */
    handleAddCheck = (): void => {
        let { formData } = this.state;
        formData.push({
            [KEY]: '',
            [LABEL]: '',
            [IS_CHECK]: false
        });
        this.setState({
            formData,
            isTouch: true
        });
    }

    /**
     * @desc 删除项
     */
    handleDeleteChekItem = (index) => {
        let { formData } = this.state;
        formData.splice(index, 1);
        this.setState({
            formData
        });
    }

    /**
     * @desc    是否默认选中
     */
    handleSwitchChange = (index) => {
        let { formData } = this.state,
            data = formData[index],
            newData = !data[IS_CHECK];
        data[IS_CHECK] = newData;
        formData[index] = data;
        this.setState({
            formData,
            isTouch: true
        })
    }

    /**
     * @desc    错误提示关闭
     */
    handleAlertClose = () => {
        this.setState({
            errMessage: ''
        });
    }

    render() {
        const { formData, errMessage } = this.state;
        return <div>
            {
                errMessage
                    ? <Alert message={errMessage}
                        type='error'
                        closable
                        onClose={this.handleAlertClose}
                    ></Alert>
                    : null
            }
            {
                formData.map((item, index: number) => {
                    return <React.Fragment key={index}>
                        <FormItem label={'表单项Key'} {...formItemLayout} >
                            <Row type="flex" justify='space-between'>
                                <Col>
                                    <Input
                                        value={item[KEY]}
                                        placeholder='例如： name'
                                        onChange={this.handleChange.bind(this, KEY, index)}
                                    />
                                </Col>
                                {
                                    formData.length > 1
                                        ? <Col>
                                            <Icon type="close" onClick={(index) => { this.handleDeleteChekItem(index) }} />
                                        </Col>
                                        : null
                                }
                            </Row>
                        </FormItem>
                        <FormItem label={'表单项名称'} {...formItemLayout} >
                            <Row type="flex" justify='space-between'>
                                <Col>
                                    <Input
                                        value={item[LABEL]}
                                        placeholder='例如： 姓名'
                                        onChange={this.handleChange.bind(this, LABEL, index)}
                                    />
                                </Col>
                                <Col>
                                    是否选中：
                                    <Switch
                                        defaultChecked={item[IS_CHECK]}
                                        checkedChildren="是"
                                        unCheckedChildren="否"
                                        onChange={this.handleSwitchChange.bind(this, index)}
                                    />
                                </Col>
                            </Row>
                        </FormItem>
                    </React.Fragment>
                })
            }
            <FormItem>
                <Row type="flex" justify='space-between'>
                    <Col>
                        <Button onClick={this.handleAddCheck} type='primary' >添加项</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.handleSave} type='primary' >确定</Button>
                    </Col>
                </Row>
            </FormItem>
        </div>
    }
}