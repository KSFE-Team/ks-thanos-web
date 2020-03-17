import React, { Component } from 'react';
import { Input, Button, Row, Col, Icon, Switch, Table, Form, Select, message } from 'antd';
import PropTypes from 'prop-types';
import { ALIAS, FIELD_ARR, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent, getFragments } from 'Src/utils';
import { checkFieldData } from 'Src/utils/utils';
const Option = Select.Option;

const VALUE = 'value';
const LABEL = 'label';
const TEXT = 'text';
const DISABLED = 'disabled';
const OPTIONS = 'options';
const SELECT = 'fragmentId';
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

const fieldArr = [
    'text',
    'value'
];

interface RadioConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}
export default class RadioConfig extends Component<RadioConfigProps> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = {
        formData: {
            [OPTIONS]: [{
                [DISABLED]: false,
                [VALUE]: '',
                [TEXT]: '',
                [ROW_KEY]: 0,
                [SELECT]: ''
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
        },
        selectOption: []
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
        {
            title: '区域块',
            dataIndex: 'fragmentName',
            key: 'fragmentName',
            width: 100,
            render: (item, record, index) => <Select
                allowClear={true}
                style={{ width: '100%' }}
                value={record[SELECT]}
                onChange={this.handleChange.bind(this, SELECT, index)}
            >
                {
                    this.state.selectOption.length > 0 && this.state.selectOption.map((item:any, ind) => {
                        return <Option key={ind} value={item.fragmentId}>{item.fragmentName}</Option>;
                    })
                }
            </Select>
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
            render: (item, record, index) =>
                this.state.formData.options.length > 1
                    ? <Col>
                        <Icon type="close" onClick={() => { this.handleDeleteRadioItem(index); }} />
                    </Col>
                    : <></>

        }
    ];

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);

            const fragment = getFragments(current.id, props.pageJSON.components);
            return {
                formData: {
                    [OPTIONS]: current.options || [{
                        [DISABLED]: false,
                        [VALUE]: '',
                        [TEXT]: '',
                        [ROW_KEY]: 0,
                        [SELECT]: ''
                    }],
                    [LABEL]: current.label || '',
                    [KEY]: current.key || '',
                    isRequired: state.formData.isRequired,
                    defaultValue: current.defaultValue || state.formData.defaultValue
                },
                current,
                selectOption: fragment.map((item) => {
                    return {
                        fragmentName: item.fragmentName,
                        fragmentId: item.id
                    };
                })
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
        const flag = checkFieldData('obj', {key: formData.key, label: formData.label}, FIELD_ARR);
        const columnFlag = checkFieldData('radioArr', formData.options, fieldArr);
        // 提交检验
        if (flag || columnFlag) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, formData);
        onSave && onSave(pageJSON);
    }

    /**
     * @desc    框内数据发生变化
     */
    handleChange = (itemKey, index: number, e) => {
        const { formData } = this.state;
        const value = typeof e === 'object' ? e.target.value : e;
        switch (itemKey) {
            case LABEL:
            case KEY:
                formData[itemKey] = value;
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
    handleAddRadioItem = (): void => {
        const { formData } = this.state;
        formData.options.push({
            [DISABLED]: false,
            [VALUE]: '',
            [TEXT]: '',
            [ROW_KEY]: formData.options[formData.options.length - 1][ROW_KEY] + 1,
            [SELECT]: ''
        });
        this.setState({
            formData,
            isTouch: true
        });
    }

    /**
     * @desc 删除项
     */
    handleDeleteRadioItem = (index) => {
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
        const { formData } = this.state;
        return <div>
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
                    <Button onClick={this.handleAddRadioItem} type='primary' >添加项</Button>
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
        </div>;
    }
}
