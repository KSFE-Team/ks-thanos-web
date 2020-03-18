import React, { Component } from 'react';
import { actions } from 'kredux';
import { DATA_ENTRY } from 'Src/components';
import { Form, Input, Table, Button, Row, Col, Select, message, Radio } from 'antd';
import ClearButton from 'Src/components/ClearButton';
import { getUniqueID } from 'Src/utils';
import {initState, getInitJson} from './utils';
import { TABLE_TYPE } from 'Src/utils/constants';
import { checkFieldData } from 'Src/utils/utils';
const { Option } = Select;
const FormItem = Form.Item;
const EditableContext = React.createContext(null);
const EditableRow = ({ form, index, ...props }: any) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

const columnDataIndex = [
    'dataKey',
    'tableName'
];
// import { TABLE_TYPE, CHARACTER_REG, CHARACTER_MESSAGE } from 'Src/utils/constants';
interface TableConfigProps {
    pageJSON: any;
    onSave(pageJSON: any): any;
}

export default class TableConfig extends Component<TableConfigProps> {

    state = initState

    static getDerivedStateFromProps(props, state) {
        const newState: any = {};
        if (!state.editDataFlag) {
            const current = props.pageJSON.components.find((item, index) => {
                if (item.configVisible) {
                    newState.currentIdx = index;
                    newState.editDataFlag = true;
                }
                return item.configVisible;
            });

            if (current) {
                newState.current = current;
                props.pageJSON.components.forEach((item) => {
                    if (item.parentId && item.parentId === current.id) {
                        newState.searchComponentChecked = true;
                    }
                });
                if (state.dataSource.length === 0) {
                    const dataSource = current.props.columns.filter(({ component }) => !component).map((item, index) => {
                        return {
                            dataKey: item.dataIndex,
                            key: index,
                            tableName: item.title,
                        };
                    });
                    newState.dataSource = dataSource;
                    newState.tableCount = dataSource.length;
                }

                if (!state.api && current.dependencies && current.dependencies.api) {
                    newState.api = current.dependencies.api.value || '';
                }

                if (current.dependencies.method) {
                    newState.method = current.dependencies.method;
                }
                if (current.showSelectedRows) {
                    newState.showSelectedRows = current.showSelectedRows;
                }
                if (current.showSelectedRows) {
                    newState.showSelectedRowsType = current.showSelectedRowsType;
                }
                if (current.tableType === TABLE_TYPE.PARENT_TABLE) {
                    newState.showSelectedRows = true;
                }
            }
        }
        return Object.keys(newState).length ? newState : null;
    }

    /**
     * @desc Edit the table automatic save
     * @param { Object } row (current row data)
     */
    handleTableInputSave = (row) => {
        interface ItemInterface {
            key: number | string;
        }
        const newData: any[] = [...this.state.dataSource];
        const index = newData.findIndex((item: ItemInterface) => row.key === item.key);
        const item = newData[index];
        const newItem = { ...item, ...row };
        newData.splice(index, 1, newItem);
        this.setState({ dataSource: newData });
    }

    /**
     * @desc add one row to the table
     */
    handleAdd = () => {
        let { tableCount, dataSource } = this.state;
        const newData = {
            key: ++tableCount,
            dataKey: '',
            tableName: '',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            tableCount,
        });
    }

    /**
     * @desc delete one row to the table
     * @param { String } key (table key)
     */
    handleTableRowDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        interface ItemInterface {
            key: number | string;
        }
        this.setState({ dataSource: dataSource.filter((item: ItemInterface) => item.key !== key) });
    }

    /**
     * @desc save table data
     */
    saveTableData = () => {
        if (!this.checkData()) { return; }
        const flag = checkFieldData('arr', this.state.dataSource, columnDataIndex);
        if (flag) {
            message.error('请填写完整表格信息。');
            return;
        }
        const pageJSON = this.props.pageJSON;
        const { current, api, method, dataSource, showSelectedRows, showSelectedRowsType } = this.state;
        pageJSON.components = pageJSON.components.map((item) => {
            if (item.configVisible) {
                item.stateName = current.stateName;
                item.listName = current.listName;
                item.showSelectedRows = showSelectedRows;
                if (item.showSelectedRows === true) {
                    item.showSelectedRowsType = showSelectedRowsType;
                }
                item.props.columns = dataSource.map((item: any) => ({
                    title: item.tableName,
                    dataIndex: item.dataKey,
                }));

                item.dependencies = {
                    type: 'fetch', // 数据来源类型 fetch 接口， dict 本地字典
                    responseType: 'list', // 接口返回类型， // list 列表， object 对象
                    api: {
                        key: 'query',
                        value: api
                    }, // 接口地址
                    method,
                    actionType: 'get',
                };
            }
            return item;
        });
        this.props.onSave(pageJSON);
    }

    /**
     * @desc check require option
     */
    checkData = () => {
        const { api, method, dataSource, current} = this.state;
        if (!api) {
            message.error('api不可为空');
            return false;
        } else if (!method) {
            message.error('请求方式不可为空');
            return false;
        } else if (!method) {
            message.error('请求方式不可为空');
            return false;
        } else if (!dataSource.length) {
            message.error('表头数据不能为空');
            return false;
        } else if (!current.stateName) {
            message.error('表头名称不能为空');
            return false;
        }
        return true;
    }

    /**
     * @desc add a search component
     * @param { Object } e event
     */
    addSearchComponent = (e) => {
        const pageJSON = this.props.pageJSON;
        if (e.target.checked) {
            const { currentIdx, current } = this.state;
            const InputData = {
                ...DATA_ENTRY.Input.getInitJson(),
                id: getUniqueID(),
                parentId: current.id,
            };

            pageJSON.components.splice(currentIdx, 0, InputData);

            actions.generatePage.setReducers(pageJSON);
        } else {
            const searchComponentIdx = pageJSON.components.findIndex((item) => {
                return item.parentId && item.parentId === this.state.current.id;
            });
            pageJSON.components.splice(searchComponentIdx, 1);
            actions.generatePage.setReducers(pageJSON);
        }
        this.setState({
            searchComponentChecked: e.target.checked,
        });
    }

    /**
     * getInitJson
     */
    getInitJson = () => {
        return getInitJson();
    }

    /**
     * @desc method change event
     * @param { String } value
     */
    methodChange = (value) => {
        this.setState({
            method: value,
        });
    }

    /**
     * @desc showSelectedRows change event
     * @param { Object } event
     */
    showSelectedRowsChange = (event) => {
        const { value } = event.target;
        this.setState({
            showSelectedRows: value,
        });
    }

    /**
     * @desc showSelectedRowsType change event
     * @param { Object } event
     */
    showSelectedRowsTypeChange = (value) => {
        this.setState({
            showSelectedRowsType: value,
        });
    }

    /**
     * @desc api input change event
     * @param { Object } event
     */
    apiInputChange = (event) => {
        const { value } = event.target;
        this.setState({
            api: value,
        });
    }

    /**
     * @desc state name input change event
     * @param { Object } event
     */
    stateNameInputChange = (event) => {
        const { value } = event.target;
        const current = {
            ...this.state.current,
            stateName: value,
        };
        this.setState({
            current,
        });
    }

    /**
     * 表格列表名称
     * */
    tableNameInputChange =(event) => {
        const { value } = event.target;
        const current = {
            ...this.state.current,
            listName: value,
        };
        this.setState({
            current,
        });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const { dataSource, current } = this.state;
        let columns = [
            {
                title: '表头名称',
                dataIndex: 'tableName',
                editable: true,
            },
            {
                title: '接口字段',
                dataIndex: 'dataKey',
                editable: true,
            },
            {
                title: 'operation',
                render: (text: string, record: any) => {
                    return this.state.dataSource.length >= 2 ? (
                        <div>
                            <Button title="Sure to delete?" type="danger" onClick={() => this.handleTableRowDelete(record.key)}>
                                Delete
                            </Button>
                        </div>

                    ) : null;
                },
            },
        ];
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        columns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleTableInputSave,
                }),
            };
        });

        return (
            <React.Fragment>
                <FormItem {...formItemLayout} label="接口地址">
                    <Input value={this.state.api}
                        placeholder="例：/user/list"
                        onChange={this.apiInputChange} />
                </FormItem>
                <FormItem {...formItemLayout} label="请求方式">
                    <Select defaultValue={this.state.method} key={this.state.method} style={{ width: 120 }} onChange={this.methodChange}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                    </Select>
                </FormItem>
                <FormItem {...formItemLayout} label={current && current.tableType !== TABLE_TYPE.NORMAL ? '绑定组件的key' : '表格名称'}>
                    <Input value={this.state.current.stateName}
                        placeholder="组件存储数据Key, 使用英文且唯一"
                        onChange={this.stateNameInputChange} />
                </FormItem>
                {
                    current && current.tableType !== TABLE_TYPE.NORMAL ? <FormItem {...formItemLayout} label={'列表名称'}>
                        <Input value={this.state.current.listName}
                            placeholder="表格列表名称"
                            onChange={this.tableNameInputChange} />
                    </FormItem> : ''
                }

                <FormItem {...formItemLayout} label="是否显示selectedRows">
                    <Radio.Group value={this.state.showSelectedRows} onChange={this.showSelectedRowsChange}>
                        <Radio value={false}>不显示</Radio>
                        <Radio value={true}>显示</Radio>
                    </Radio.Group>
                </FormItem>
                {
                    this.state.showSelectedRows && <FormItem {...formItemLayout} label="选择类型">
                        <Select defaultValue={this.state.showSelectedRowsType} style={{ width: 120 }} onChange={this.showSelectedRowsTypeChange}>
                            <Option value="radio">单选</Option>
                            <Option value="checkbox">多选</Option>
                        </Select>
                    </FormItem>
                }
                <Table
                    components={components}
                    dataSource={dataSource}
                    bordered={true}
                    columns={columns}
                    pagination={false}
                />
                {/* <Row style={{marginTop: '10px'}} type="flex" justify="end" gutter={1}>
                    <Checkbox checked={searchComponentChecked} onChange={this.addSearchComponent}>是否拥有条件搜索</Checkbox>
                </Row> */}
                <Row style={{ marginTop: '20px' }} type="flex" justify="end" gutter={1}>
                    <Col>
                        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                            Add a row
                        </Button>
                    </Col>
                    <Col offset={1}>
                        <Button type="primary" onClick={this.saveTableData}>
                            确定
                        </Button>
                    </Col>
                    <Col offset={1}>
                        <ClearButton initState={initState} that={this}/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

interface EditableCellProps {
    record: any;
    dataIndex: number;
    title: string;
    editable: boolean;
    index: number;
    handleSave(params: any): void;
}

class EditableCell extends React.Component<EditableCellProps> {
    state = {
        editing: false,
    };

    input: any;

    form: any;

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    renderCell = (form) => {
        this.form = form;
        const { children, dataIndex, record } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                <Input value={record[dataIndex]} ref={(node) => (this.input = node)} onPressEnter={this.save} onBlur={this.save} onChange={() => {}}/>
                {/* {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (rule.field === 'dataKey') {
                                    if (CHARACTER_REG.test(value)) {
                                        callback(new Error(CHARACTER_MESSAGE));
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={(node) => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)} */}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24, minHeight: '21px' }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    }

    render() {
        const {
            editable,
            children,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}
