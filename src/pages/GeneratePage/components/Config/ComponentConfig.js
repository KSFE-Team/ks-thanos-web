import React, {Component} from 'react';
import {actions} from 'kredux';
import {Drawer, Form, Input, Table, Button, Row, Col} from 'antd';

const FormItem = Form.Item;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

export default class ComponentConfig extends Component {

    state = {
        dataSource: [],
        count: 0,
        api: ''
    };

    /**
     * 获取显示配置的组件
     */
    getShowConfig = (components) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
            components = pageJSON.components;
        }
        let visible = false;
        components.forEach((component) => {
            if (!visible) {
                let childVisible = false;
                if (component.components) {
                    childVisible = this.getShowConfig(component.components).visible;
                }
                if (component.configVisible || childVisible) {
                    visible = true;
                }
            }
        })
        return {
            visible,
        }
    }

    onClose = (components) => {
        if (!components) {
            const {pageJSON} = this.props.generatePage;
            components = pageJSON.components;
        }
        components.forEach((component) => {
            if ('configVisible' in component) {
                component['configVisible'] = false;
                if (component.components) {
                    this.onClose(component.components);
                }
            }
        });
        this.setJSON({
            components
        })
    }

    /**
     * 设置redux
     */
    setRedux = (redux) => {
        actions.generatePage.setReducers(redux);
    };

    /**
     * 设置页面配置
     */
    setJSON = (json) => {
        const {pageJSON} = this.props.generatePage;
        this.setRedux({
            pageJSON: {
                ...pageJSON,
                ...json
            }
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            dataKey: '',
            tableName: '',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    saveTableData = () => {
        let {pageJSON} = this.props.generatePage;
        pageJSON.components = pageJSON.components.map((item) => {
            if (item.configVisible) {
                item.props.columns = this.state.dataSource.map((item) => {
                    return {
                        title: item.tableName,
                        dataIndex: item.dataKey
                    }
                });

                item.dependencies = [ // 数据依赖
                    {
                        type: 'fetch', // 数据来源类型 fetch 接口， dict 本地字典
                        api: this.state.api, // 接口地址
                        responseType: 'list', // 接口返回类型， // list 列表， object 对象
                    }]
            }
            return item
        });
        actions.generatePage.setReducers(pageJSON);
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        let { dataSource } = this.state,
        columns = [
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
                    render: (text, record) =>
                        this.state.dataSource.length >= 1 ? (
                            <Button title="Sure to delete?" tyep="danger" onClick={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">Delete</a>
                            </Button>
                        ) : null,
                }
            ],
        components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        columns = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <Drawer
                width={700}
                title="组件配置"
                placement={'right'}
                mask={false}
                onClose={() => {
                    this.onClose();
                }}
                visible={this.getShowConfig().visible}
            >
                <FormItem {...formItemLayout} label="接口地址">
                    <Input value={this.state.api}
                           placeholder="例：/userservice/media/upload"
                           onChange={e => {
                               const {value} = e.target;
                               this.setState({
                                   api: value
                               })
                           }}/>
                </FormItem>
                <Table
                    components={components}
                    dataSource={dataSource}
                    bordered
                    columns={columns}
                    pagination={false}
                />
                <Row style={{marginTop: '10px'}} type="flex" justify="end" gutter={1}>
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
            </Drawer>
        );
    }
}

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
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
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
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
