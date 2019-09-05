import React, { Component } from 'react';
import { Input, Button, Row, Col, Icon, Switch, Alert, Table } from 'antd';
import PropTypes from 'prop-types';

const KEY = 'key';
const LABEL = 'label';
const IS_CHECK = 'isCheck';
const IS_DISABLED = 'isDisabled';

interface CheckBoxConfigProps {
    onSave(pageJSON: any): void,
    pageJSON: any
}

export default class CheckBoxConfig extends Component<CheckBoxConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        options: [{
            [IS_DISABLED]: false,
            [IS_CHECK]: false,
            [KEY]: 0,
            [LABEL]: '',
        }],
        isTouch: false,
        errMessage: ''
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            return {
                options: current.options || [{

                    [IS_DISABLED]: false,
                    [IS_CHECK]: false,
                    [KEY]: 0,
                    [LABEL]: '',
                }]
            };
        } else {
            return state;
        }
    }

    /**
     * @desc 保存修改
     */
    handleSave = () => {
        const { options } = this.state;
        const { pageJSON, onSave } = this.props;
        for (let i = 0; i < options.length; i++) {
            const item = options[i];
            if (!item[LABEL]) {
                this.setState({
                    errMessage: '请输入表单项名称'
                });
                return;
            }
        }
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    options,
                    props: {
                        options
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    }

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (key, index: number, e) => {
        const { options } = this.state;
        const value = e.target.value;
        options[index][key] = value;
        this.setState({
            options,
            isTouch: true
        });
    };

    /**
     * @desc 添加项
     */
    handleAddCheck = (): void => {
        const { options } = this.state;
        // number = options[options.length - 1][KEY];
        options.push({
            [IS_DISABLED]: false,
            [IS_CHECK]: false,
            [KEY]: options[options.length - 1][KEY] + 1,
            [LABEL]: '',
        });
        this.setState({
            options,
            isTouch: true
        });
    }

    /**
     * @desc 删除项
     */
    handleDeleteChekItem = (index) => {
        const { options } = this.state;
        options.splice(index, 1);
        this.setState({
            options
        });
    }

    /**
     * @desc    是否默认选中
     */
    listenIsSelect = (index) => {
        const { options } = this.state;
        const data = options[index];
        const newData = !data[IS_CHECK];
        data[IS_CHECK] = newData;
        options[index] = data;
        this.setState({
            options,
            isTouch: true
        });
    }

    /**
     * @desc    是否禁用
     */
    listenIsDisabled = (index) => {
        const { options } = this.state;
        const data = options[index];
        const newData = !data[IS_DISABLED];
        data[IS_DISABLED] = newData;
        options[index] = data;
        this.setState({
            options,
            isTouch: true
        });
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
        const { options, errMessage } = this.state;
        const columns = [
            {
                title: '表单项Key',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: '表单项名称',
                dataIndex: 'label',
                key: 'label',
                render: (item, record, index) => <Input
                    value={record[LABEL]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, LABEL, index)}
                />
            },
            {
                title: '是否默认选中',
                dataIndex: 'isCheck',
                key: 'isCheck',
                render: (item, record, index) =>
                    <Switch
                        defaultChecked={record[IS_CHECK]}
                        checkedChildren="是"
                        unCheckedChildren="否"
                        onChange={this.listenIsSelect.bind(this, index)}
                    />
            },
            {
                title: '是否禁用',
                dataIndex: 'isDisabled',
                key: 'isDisabled',
                render: (item, record, index) =>
                    <Switch
                        defaultChecked={record[IS_CHECK]}
                        checkedChildren="是"
                        unCheckedChildren="否"
                        onChange={this.listenIsDisabled.bind(this, index)}
                    />
            },
            {
                title: '删除',
                dataIndex: 'delete',
                key: 'delete',
                render: () =>
                    options.length > 1
                        ? <Col>
                            <Icon type="close" onClick={(index) => { this.handleDeleteChekItem(index); }} />
                        </Col>
                        : <></>

            }
        ];
        return <>
            {
                errMessage
                    ? <Alert message={errMessage}
                        type='error'
                        closable
                        onClose={this.handleAlertClose}
                    ></Alert>
                    : null
            }
            <br />
            <Table dataSource={options} columns={columns} bordered pagination={false} />
            <br />
            <Row type="flex" justify='space-between'>
                <Col>
                    <Button onClick={this.handleAddCheck} type='primary' >添加项</Button>
                </Col>
                <Col>
                    <Button onClick={this.handleSave} type='primary' >确定</Button>
                </Col>
            </Row>
        </>;
    }
}
