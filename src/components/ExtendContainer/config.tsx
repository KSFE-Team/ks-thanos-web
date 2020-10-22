import React, { Component } from 'react';
import { actions, connect } from 'kredux';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { getDataEntry, ALL_TOOLS, getCloudComponents } from 'Src/components';
import {findComponent, getTools, getUniqueID, saveComponent} from 'Src/utils';
import ComponentType from 'Src/pages/GeneratePage/components/Config/ComponentType';
import { filterCloudComponents } from './utils';
import { checkFieldData } from 'Src/utils/utils';
import { FORM_MESSAGE } from 'Src/utils/constants';

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

const FORMKEY = 'formKey';
const SORTKEY = 'sortKey';
const ADDBUTTONTEXT = 'addButtonText';

interface ExtendContainerConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any,
    generatePage: any
}

interface ExtendContainerConfigState {
    formData: {
        extendContainerName: any
        addButtonText: any
        formKey: any
        sortKey: any
    };
    isTouch: boolean;
    current: {
        id: string;
        components: any[]
    }
}
@connect(({ generatePage }) => ({
    generatePage
}))
export default class ExtendContainerConfig extends Component<ExtendContainerConfigProps, ExtendContainerConfigState> {

    constructor(props) {
        super(props);
        const { pageJSON } = props;
        const { components } = pageJSON;
        const current = findComponent(components);
        this.state = {
            formData: {
                extendContainerName: '',
                addButtonText: '',
                formKey: '',
                sortKey: ''
            },
            isTouch: false,
            current
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [FORMKEY]: current[FORMKEY],
                    [SORTKEY]: current[SORTKEY],
                    [ADDBUTTONTEXT]: current[ADDBUTTONTEXT],
                }
            };
        } else {
            return state;
        }
    }

    /**
     * 插入组件事件
     */
    handleClick = (componentName: string) => {
        const insertComponent = ALL_TOOLS[componentName].getInitJson();
        let { current } = this.state;
        current = {
            ...current,
            components: [
                ...current.components || [],
                {
                    ...insertComponent,
                    id: getUniqueID(),
                }
            ]
        };
        actions.generatePage.insertFormComponent({insertComponent, targetId: current.id});
        this.setState({
            current
        });
    }

    handleSave = () => {
        const { formData, current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { error } = checkFieldData('ExtendContainer', formData);
        // 提交检验
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        pageJSON.components = saveComponent(current.id, pageJSON.components, {
            ...current,
            ...formData,
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key: string, value: string|boolean) => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    componentDidMount() {
        actions.generatePage.loadCloudComponentList();
    }

    render() {
        const { formData } = this.state;
        const { generatePage } = this.props;
        const { cloudComponentList } = generatePage;
        const dataSource = getTools(getDataEntry());
        const cloudDataSource = getTools(filterCloudComponents(cloudComponentList, getCloudComponents()));
        return <div>
            <FormItem
                label={'字段key'}
                {...formItemLayout}
                required={true}
            >
                <Input
                    value={formData[FORMKEY]}
                    placeholder='例如： storyList'
                    required={true}
                    onChange={(e) => {
                        const value = e.target.value;
                        this.handleChange(FORMKEY, value);
                    }}
                />
            </FormItem>
            <FormItem
                label={'排序key'}
                {...formItemLayout}
                required={true}
            >
                <Input
                    value={formData[SORTKEY]}
                    placeholder='例如： __keys'
                    onChange={(e) => {
                        const value = e.target.value;
                        this.handleChange(SORTKEY, value);
                    }}
                />
            </FormItem>
            <FormItem
                label={'按钮文案'}
                {...formItemLayout}
                required={true}
            >
                <Input
                    value={formData[ADDBUTTONTEXT]}
                    placeholder='例如： 添加'
                    onChange={(e) => {
                        const value = e.target.value;
                        this.handleChange(ADDBUTTONTEXT, value);
                    }}
                />
            </FormItem>
            <FormItem
                label={'可配置组件'}
                {...formItemLayout}
            >
                <ComponentType
                    dataSource={[dataSource.filter((data) => data.name !== 'ExtendContainer')] || []}
                    span={12}
                    onClick={this.handleClick}
                    title={''}
                />
            </FormItem>
            <FormItem
                label={'云组件'}
                {...formItemLayout}
            >
                <ComponentType
                    dataSource={[cloudDataSource] || []}
                    span={12}
                    onClick={this.handleClick}
                    title={''}
                />
            </FormItem>
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                </Row>
            </FormItem>
        </div>;
    }
}
