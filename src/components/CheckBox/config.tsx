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
const KEY = 'key';
const ROW_KEY = 'rowKey';

interface CheckBoxConfigProps {
    onSave(pageJSON: any): void,
    pageJSON: any
}

export default class CheckBoxConfig extends Component<CheckBoxConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        [CHECK_ITEM]: [{
            props: {
                [DISABLED]: false,
                [CHECK]: false,
                [VALUE]: ''
            },
            [TEXT]: '',
            [ROW_KEY]: 0
        }],
        [LABEL]: '',
        [KEY]: '',
        isTouch: false,
        errMessage: ''
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            return {
                CHECK_ITEM: current[CHECK_ITEM],
                LABEL: current[LABEL],
                KEY: current[KEY]
                // options: current.options || {
                //     [CHECK_ITEM]: [{
                //         props: {
                //             [DISABLED]: false,
                //             [CHECK]: false,
                //             [VALUE]: ''
                //         },
                //         [TEXT]: '',
                //         [ROW_KEY]: 0
                //     }],
                //     [LABEL]: '',
                //     [KEY]: ''
                // }
            };
        } else {
            return state;
        }
    }

    /**
     * @desc 保存修改
     */
    handleSave = () => {
        const { checkItem, label, key } = this.state;
        const { pageJSON, onSave } = this.props;
        if (!label) {
            this.setState({
                errMessage: '请输入表单名称'
            });
            return;
        }
        for (let i = 0; i < checkItem.length; i++) {
            const item = checkItem[i];
            if (!item[TEXT]) {
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
                    checkItem,
                    label,
                    key
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    }

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (itemKey, index: number, e) => {
        let { checkItem, label, key } = this.state;
        const value = typeof e === 'boolean' ? e : e.target.value;
        switch (itemKey) {
            case LABEL:
                label = value;
                break;
            case KEY:
                key = value;
                break;
            case TEXT:
                checkItem[index][itemKey] = value;
                break;
            case CHECK:
            case DISABLED:
                checkItem[index].props[itemKey] = value;
                break;
            default:
                checkItem[index].props[itemKey] = value;
                break;
        }
        this.setState({
            checkItem,
            label,
            key,
            isTouch: true
        });
    };

    /**
     * @desc 添加项
     */
    handleAddCheck = (): void => {
        const { checkItem } = this.state;
        checkItem.push({
            props: {
                [DISABLED]: false,
                [CHECK]: false,
                [VALUE]: ''
            },
            [TEXT]: '',
            [ROW_KEY]: checkItem[checkItem.length - 1][KEY] + 1
        });
        this.setState({
            checkItem,
            isTouch: true
        });
    }

    /**
     * @desc 删除项
     */
    handleDeleteChekItem = (index) => {
        const { checkItem } = this.state;
        checkItem.splice(index, 1);
        this.setState({
            checkItem
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
        const { checkItem, label, key, errMessage } = this.state;
        const columns = [
            {
                title: '表单项Key',
                dataIndex: 'value',
                key: 'value',
                render: (item, record, index) => <Input
                    value={record.props[VALUE]}
                    placeholder='例如： 选项'
                    onChange={this.handleChange.bind(this, VALUE, index)}
                />
            },
            {
                title: '表单项名称',
                dataIndex: 'text',
                key: 'text',
                render: (item, record, index) => <Input
                    value={record[TEXT]}
                    placeholder='例如： 姓名'
                    onChange={this.handleChange.bind(this, TEXT, index)}
                />
            },
            {
                title: '是否默认选中',
                dataIndex: 'check',
                key: 'check',
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
                dataIndex: 'disabled',
                key: 'disabled',
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
                    checkItem.length > 1
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
                    value={label}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL, 0)}
                />
            </Form.Item>
            <Form.Item
                label='表单key'
            >
                <Input
                    value={key}
                    placeholder='例如： key'
                    onChange={this.handleChange.bind(this, KEY, 0)}
                />
            </Form.Item>
            <Table rowKey="rowKey" dataSource={checkItem} columns={columns} bordered pagination={false} />
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
