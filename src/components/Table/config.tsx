import React from 'react';
import { actions } from 'kredux';
import { Form, Input, Table, Button, Row, Col, Checkbox, Select, message } from 'antd';
import { getUniqueID } from '../../utils';
import { DATA_ENTRY } from 'Components';
const { Option } = Select;
const FormItem = Form.Item;
const EditableContext = React.createContext(null);
const EditableRow = ({ form, index, ...props }: any) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

interface TableConfigProps {
    pageJSON: any,
    onSave(pageJSON:any): any,
}

export default class TableConfig extends React.Component<TableConfigProps> {

    state = {
        dataSource: [], // table data
        tableCount: 0, // table key
        searchComponentChecked: false, // checkbox search component check flag
        api: '', // api path
        method: 'GET', // request method
        currentComponent: {
            stateName: '',
            id: ''
        }, // current component info
        currentComponentIdx: '' // current component index
    };

    static getDerivedStateFromProps(props, state) {
        const newState: any = {};
        if (state.dataSource.length === 0 || !state.api) {
            const currentComponent = props.pageJSON.components.find((item, index) => {
                if (item.configVisible) {
                    newState.currentComponentIdx = index;
                }
                return item.configVisible;
            });

            if (currentComponent) {
                newState.currentComponent = currentComponent;
                props.pageJSON.components.forEach((item) => {
                    if (item.parentId && item.parentId === currentComponent.id) {
                        newState.searchComponentChecked = true;
                    }
                });
                if (state.dataSource.length === 0) {
                    const dataSource = currentComponent.props.columns.map((item, index) => {
                        return {
                            key: index,
                            dataKey: item.dataIndex,
                            tableName: item.title
                        };
                    });
                    newState.dataSource = dataSource;
                    newState.tableCount = dataSource.length;
                }

                if (!state.api && currentComponent.dependencies) {
                    newState.api = currentComponent.dependencies.api || '';
                }

                if (currentComponent.dependencies.method) {
                    newState.method = currentComponent.dependencies.method;
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
        interface itemInterface{
            key: number|string
        }
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item:itemInterface) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, Object.assign({}, item, row));
        this.setState({ dataSource: newData });
    };

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
    };

    /**
     * @desc delete one row to the table
     * @param { String } key (table key)
     */
    handleTableRowDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        interface itemInterface{
            key: number|string
        }
        this.setState({ dataSource: dataSource.filter((item:itemInterface) => item.key !== key) });
    };

    /**
     * @desc save table data
     */
    saveTableData = () => {
        if (!this.checkData()) return;
        const pageJSON = this.props.pageJSON;
        const { currentComponent, api, method, dataSource } = this.state;
        pageJSON.components = pageJSON.components.map((item) => {
            if (item.configVisible) {
                item.stateName = currentComponent.stateName;
                item.props.columns = dataSource.map((item: any) => ({
                    title: item.tableName,
                    dataIndex: item.dataKey
                }));

                item.dependencies = {
                    type: 'fetch', // 数据来源类型 fetch 接口， dict 本地字典
                    responseType: 'list', // 接口返回类型， // list 列表， object 对象
                    api, // 接口地址
                    method
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
        const { api, method, dataSource, currentComponent } = this.state;
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
        } else if (!currentComponent.stateName) {
            message.error('表头名称不能为空');
            return false;
        }
        return true;
    };

    /**
     * @desc add a search component
     * @param { Object } e event
     */
    addSearchComponent = (e) => {
        const pageJSON = this.props.pageJSON;
        if (e.target.checked) {
            const { currentComponentIdx, currentComponent } = this.state;
            const InputData = {
                ...DATA_ENTRY.Input.getInitJson(),
                id: getUniqueID(),
                parentId: currentComponent.id
            };

            pageJSON.components.splice(currentComponentIdx, 0, InputData);

            actions.generatePage.setReducers(pageJSON);
        } else {
            const searchComponentIdx = pageJSON.components.findIndex((item) => {
                return item.parentId && item.parentId === this.state.currentComponent.id;
            });
            pageJSON.components.splice(searchComponentIdx, 1);
            actions.generatePage.setReducers(pageJSON);
        }
        this.setState({
            searchComponentChecked: e.target.checked
        });
    };

    /**
     * @desc method change event
     * @param { String } value
     */
    methodChange = (value) => {
        this.setState({
            method: value
        });
    };

    /**
     * @desc api input change event
     * @param { Object } event
     */
    apiInputChange = (event) => {
        const {value} = event.target;
        this.setState({
            api: value
        });
    };

    /**
     * @desc state name input change event
     * @param { Object } event
     */
    stateNameInputChange = (event) => {
        const {value} = event.target;
        this.setState({
            currentComponent: {
                ...this.state.currentComponent,
                stateName: value
            }
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        const { dataSource, searchComponentChecked } = this.state;
        let columns = [
            {
                title: '表头名称',
                dataIndex: 'tableName',
                editable: true
            },
            {
                title: '接口字段',
                dataIndex: 'dataKey',
                editable: true
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    return this.state.dataSource.length >= 2 ? (
                        <Button title="Sure to delete?" type="danger" onClick={() => this.handleTableRowDelete(record.key)}>
                                Delete
                        </Button>
                    ) : null;
                }
            }
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
                        placeholder="例：/userservice/media/upload"
                        onChange={this.apiInputChange}/>
                </FormItem>
                <FormItem {...formItemLayout} label="请求方式">
                    <Select defaultValue={this.state.method} style={{ width: 120 }} onChange={this.methodChange}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                    </Select>
                </FormItem>
                <FormItem {...formItemLayout} label="表格名称">
                    <Input value={this.state.currentComponent.stateName}
                        placeholder="组件存储数据Key, 使用英文且唯一"
                        onChange={this.stateNameInputChange}/>
                </FormItem>
                <Table
                    components={components}
                    dataSource={dataSource}
                    bordered
                    columns={columns}
                    pagination={false}
                />
                <Row style={{marginTop: '10px'}} type="flex" justify="end" gutter={1}>
                    <Checkbox checked={searchComponentChecked} onChange={this.addSearchComponent}>是否拥有条件搜索</Checkbox>
                </Row>
                <Row style={{marginTop: '20px'}} type="flex" justify="end" gutter={1}>
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
                </Row>
            </React.Fragment>
        );
    }
}

interface EditableCellProps{
    record: any,
    handleSave(params: any): void,
    dataIndex: number,
    title: string,
    editable: boolean,
    index: number
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
    };

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = (form) => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={(node) => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
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
    };

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
