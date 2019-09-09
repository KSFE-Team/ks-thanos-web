import React, { Component } from 'react';
import { Input, Button, Row, Col, Icon, Switch, Alert, Table } from 'antd';
import PropTypes from 'prop-types';
import Form from 'antd/es/form';

const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const CHECK = 'checked';
const DISABLED = 'disabled';
const CHECK_ITEM = 'checkItem';

interface CheckBoxConfigProps {
    onSave(pageJSON: any): void,
    pageJSON: any
}

export default class CheckBoxConfig extends Component<CheckBoxConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        options: {
            [CHECK_ITEM]: [{
                props: {
                    [DISABLED]: false,
                    [CHECK]: false,
                    [TEXT]: ''
                },
                [VALUE]: ''
            }],
            [LABEL]: ''
        },
        isTouch: false,
        errMessage: ''
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            return {
                options: current.options || {
                    [CHECK_ITEM]: [{
                        props: {
                            [DISABLED]: false,
                            [CHECK]: false,
                            [TEXT]: ''
                        },
                        [VALUE]: ''
                    }],
                    [LABEL]: ''
                }
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
        if (!options[LABEL]) {
            this.setState({
                errMessage: '请输入表单名称'
            });
            return;
        }
        for (let i = 0; i < options[CHECK_ITEM].length; i++) {
            const item = options[CHECK_ITEM][i];
            if (!item.props[TEXT]) {
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
        const value = typeof e === 'boolean' ? e : e.target.value;
        switch (key) {
            case LABEL:
                options[LABEL] = value;
                break;
            case VALUE:
                options[CHECK_ITEM][index][key] = value;
                break;
            case CHECK:
            case DISABLED:
                options[CHECK_ITEM][index].props[VALUE] = value;
                break;
            default:
                options[CHECK_ITEM][index].props[key] = value;
                break;
        }
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
        options[CHECK_ITEM].push({
            props: {
                [DISABLED]: false,
                [CHECK]: false,
                [TEXT]: ''
            },
            [VALUE]: '',
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
        options[CHECK_ITEM].splice(index, 1);
        this.setState({
            options
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
                key: 'key',
                render: (item, record, index) => <Input
                    value={record[VALUE]}
                    placeholder='例如： 选项'
                    onChange={this.handleChange.bind(this, VALUE, index)}
                />
            },
            {
                title: '表单项名称',
                dataIndex: 'value',
                key: 'value',
                render: (item, record, index) => <Input
                    value={record.props[TEXT]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, TEXT, index)}
                />
            },
            {
                title: '是否默认选中',
                dataIndex: 'isCheck',
                key: 'isCheck',
                render: (item, record, index) =>
                    <Switch
                        defaultChecked={record[CHECK]}
                        checkedChildren="是"
                        unCheckedChildren="否"
                        onChange={this.handleChange.bind(this, CHECK, index)}
                    />
            },
            {
                title: '是否禁用',
                dataIndex: 'isDisabled',
                key: 'isDisabled',
                render: (item, record, index) =>
                    <Switch
                        defaultChecked={record[DISABLED]}
                        checkedChildren="是"
                        unCheckedChildren="否"
                        onChange={this.handleChange.bind(this, DISABLED, index)}
                    />
            },
            {
                title: '删除',
                dataIndex: 'delete',
                key: 'delete',
                render: () =>
                    options[CHECK_ITEM].length > 1
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
            <Form.Item
                label='label'
            >
                <Input
                    value={options[LABEL]}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL, 0)}
                />
            </Form.Item>
            <Table dataSource={options[CHECK_ITEM]} columns={columns} bordered pagination={false} />
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
