import React, { Component } from 'react';
import { Input, Button, Row, Col, Icon, Switch, Alert, Table, Form } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';

const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const CHECK = 'checked';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const KEY = 'key';
const ROW_KEY = 'rowKey';
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
interface CheckBoxConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

export default class CheckBoxConfig extends Component<CheckBoxConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        formData: {
            [OPTIONS]: [{
                [DISABLED]: false,
                [VALUE]: '',
                [TEXT]: '',
                [ROW_KEY]: 0
            }],
            [LABEL]: '',
            [KEY]: '',
            isRequired: true,
            defaultValue: 1
        },
        isTouch: false,
        errMessage: '',
        // isRequired: true,
        // defaultValue: 1
        current: {
            id: '',
            props: {}
        }
    };

    columns = [
        {
            title: '表单项Key',
            dataIndex: 'value',
            key: 'value',
            render: (item, record, index) => <Input
                value={record[VALUE]}
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
        // {
        //     title: '是否默认选中',
        //     dataIndex: 'check',
        //     key: 'check',
        //     render: (item, record, index) =>
        //         <Switch
        //             defaultChecked={record[CHECK]}
        //             checkedChildren="是"
        //             unCheckedChildren="否"
        //             onChange={this.handleChange.bind(this, CHECK, index)}
        //         />
        // },
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
            render: (item, record, index) =>
                this.state.formData.options.length > 1
                    ? <Col>
                        <Icon type="close" onClick={() => { this.handleDeleteChekItem(index); }} />
                    </Col>
                    : <></>

        }
    ];

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [OPTIONS]: current.options || [{
                        [DISABLED]: false,
                        // [CHECK]: false,
                        [VALUE]: '',
                        [TEXT]: '',
                        [ROW_KEY]: 0
                    }],
                    [LABEL]: current.label || '',
                    [KEY]: current.key || '',
                    isRequired: state.formData.isRequired,
                    defaultValue: current.defaultValue || state.formData.defaultValue
                },
                current
            };
        } else {
            return state;
        }
    }

    /**
     * @desc 保存修改
     */
    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        if (!formData.label) {
            this.setState({
                errMessage: '请输入表单名称'
            });
            return;
        }
        for (let i = 0; i < formData.options.length; i++) {
            const item = formData.options[i];
            if (!item[TEXT]) {
                this.setState({
                    errMessage: '请输入表单项名称'
                });
                return;
            }
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, formData);
        onSave && onSave(pageJSON);
    }

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (itemKey, index: number, e) => {
        const { formData } = this.state;
        const value = typeof e === 'boolean' ? e : e.target.value;
        switch (itemKey) {
            case LABEL:
                formData.label = value;
                break;
            case KEY:
                formData.key = value;
                break;
            case TEXT:
                formData.options[index][itemKey] = value;
                break;
            case CHECK:
            case DISABLED:
                formData.options[index][itemKey] = value;
                break;
            default:
                formData.options[index][itemKey] = value;
                break;
        }
        this.setState({
            formData,
            isTouch: true
        });
    };

    /**
     * @desc 添加项
     */
    handleAddCheck = (): void => {
        const { formData } = this.state;
        formData.options.push({
            [DISABLED]: false,
            // [CHECK]: false,
            [VALUE]: '',
            [TEXT]: '',
            [ROW_KEY]: formData.options[formData.options.length - 1][ROW_KEY] + 1
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
        const { formData } = this.state;
        formData.options.splice(index, 1);
        this.setState({
            formData
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
        const { formData, errMessage } = this.state;
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
                {...formItemLayout}
                label={ALIAS.LABEL}
            >
                <Input
                    value={formData.label}
                    placeholder='例如： label'
                    onChange={this.handleChange.bind(this, LABEL, 0)}
                />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label={ALIAS.KEY}
            >
                <Input
                    value={formData.key}
                    placeholder='例如： key'
                    onChange={this.handleChange.bind(this, KEY, 0)}
                />
            </Form.Item>
            <Table rowKey="rowKey" dataSource={formData.options} columns={this.columns} bordered pagination={false} />
            <br />
            <Row type="flex" justify='space-between'>
                <Col>
                    <Button onClick={this.handleAddCheck} type='primary' >添加项</Button>
                </Col>
                {/* <Col span={6} style={{marginLeft: '10px'}}>
                    <Radio.Group style={{display: 'flex', alignItems: 'center'}} defaultValue={formData.isRequired} onChange={(e) => {
                        const formData = Object.assign({}, this.state.formData, { isRequired: e.target.value });
                        this.setState({
                            formData
                        });
                    }}>
                        <Radio value={true}>必填</Radio>
                        <Radio value={false}>非必填</Radio>
                    </Radio.Group>
                </Col>
                {formData.isRequired && <Col span={5} style={{marginLeft: '10px'}}>
                    <Input placeholder={`默认选中value${formData.defaultValue}`} onChange={(e) => {
                        const formData = Object.assign({}, this.state.formData, { defaultValue: e.target.value });
                        this.setState({
                            formData
                        });
                    }}/>
                </Col>} */}
                <Col>
                    <Button onClick={this.handleSave} type='primary' >确定</Button>
                </Col>
            </Row>
        </>;
    }
}
