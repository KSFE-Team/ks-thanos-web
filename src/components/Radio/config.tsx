import React, { Component } from 'react';
<<<<<<< HEAD
import { Form, Button, Row, Col,Input,message,Radio } from 'antd';
=======
import { Form, Button, Row, Col, Input, message } from 'antd';
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
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
const formItemLayoutRadio = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
    }
};

const KEY = 'key';
const LABEL = 'label';
const VALUE = 'value';

interface RadioConfigProps{
    onSave(pageJSON:any): void,
    pageJSON: any,
    isRequired:boolean
}

export default class RadioConfig extends Component<RadioConfigProps> {
    static propTypes = {
        onSave: PropTypes.func,
        form: PropTypes.object
    };

    state={
        formData: {

        },
        isTouch: false,
<<<<<<< HEAD
        choiceNodeList: [{ id: 1},{ id: 2}],
        choiceNodeId:2,
        defaultValue:1,
        isRequired:true,
=======
        choiceNodeList: [{ id: 1 }, { id: 2 }],
        choiceNodeId: 2
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
    };

    key: any;
    label: any;

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
<<<<<<< HEAD
            let { pageJSON } = props,
                { components } = pageJSON;
            let  current = components.find(({ configVisible }) => configVisible);
            let index=current.props.configList.length-1;
            if(!current.key){
                current.key='status'
=======
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = components.find(({ configVisible }) => configVisible);
            if (!current.key) {
                current.key = 'status';
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
            }
            if (!current.label) {
                current.label = '状态';
            }
            return {
<<<<<<< HEAD
                choiceNodeList: [...current.props.configList],
                choiceNodeId:current.props.configList[index].id,
=======
                choiceNodeList: [...current.props.list],
                choiceNodeId: current.props.list.length + 1,
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL]
                }
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
<<<<<<< HEAD
        const { formData,choiceNodeList,isRequired,defaultValue } = this.state;
        let { pageJSON, onSave } = this.props;
        if (!this[`key`].state.value) {
=======
        const { formData } = this.state;
        const { pageJSON, onSave } = this.props;
        if (!this.key.state.value) {
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
            message.error('表单项Key不可为空');
            return;
        } else if (!this.label.state.value) {
            message.error('表单项名称不可为空');
<<<<<<< HEAD
            return ;
        }       
              
        let length =  choiceNodeList.filter((item:object ,index:number)=>{
            return !this[`label${index}`].state.value||this[`value${index}`].state.value===undefined||this[`value${index}`].state.value===''
=======
            return;
        }

        const length = this.state.choiceNodeList.filter((item:any, index:number) => {
            return !this[`label${index}`].state.value || !(this[`value${index}`].state.value);
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
        }).length;
        if (length > 0) {
            message.error('选项不可为空');
            return;
        }
        const array:Array<any> = [];
        this.state.choiceNodeList.forEach((item, index) => {
            array.push({
                id: item.id,
<<<<<<< HEAD
                label:this[`label${index}`].state.value,
                value:isNaN(this[`value${index}`].state.value)?this[`value${index}`].state.value:this[`value${index}`].state.value*1
           })
        })
=======
                label: this[`label${index}`].state.value,
                value: this[`value${index}`].state.value
            });
        });
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    ...formData,
                    isRequired:isRequired,
                    props: {
                        ...component.props,
<<<<<<< HEAD
                        configList:array,
                        label:this[`label`].state.value,
                        defaultValue:isRequired?isNaN(defaultValue)?defaultValue:defaultValue*1:undefined,
=======
                        placeholder: formData[LABEL],
                        list: array,
                        label: this.label.state.value
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
                    }
                };
            }
            return component;
        });
        onSave && onSave(pageJSON);
    }

    handleChange = (key, e) => {
        const { formData } = this.state;
        const value = e.target.value;
        this.setState({
            formData: {
                ...formData,
                [key]: value
            },
            isTouch: true
        });
    };

    handleChangeChoice = (key, index, e) => {
        const { choiceNodeList } = this.state;
        const value = e.target.value;
        choiceNodeList[index][key] = value;
        this.setState({
            choiceNodeList
        });
    };

    render() {
<<<<<<< HEAD
        const { formData,choiceNodeId,choiceNodeList,isRequired } = this.state;
=======
        const { formData, choiceNodeId, choiceNodeList } = this.state;
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
        return <div>
            <FormItem
                label={'表单项Key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如: status'
                    ref={(ref) => {
                        this.key = ref;
                    }}
                    onChange={this.handleChange.bind(this, KEY)}
                />
            </FormItem>
            <FormItem
                label={'表单项名称'}
                {...formItemLayout}
            >
                <Input
                    value={formData[LABEL]}
                    placeholder='例如: 状态'
                    ref={(ref) => {
                        this.label = ref;
                    }}
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
            <div>
                {
                    choiceNodeList && choiceNodeList.map((item: any, index) => {
                        return (
                            <Row key={item.id} type='flex'>
                                <Col span={10}>
                                    <FormItem
                                        label={`选项Label${index + 1}`}
                                        {...formItemLayoutRadio}
                                    >
                                        <Input
                                            value={item.label}
                                            ref={(ref) => {
                                                this[`label${index}`] = ref;
                                            }}
                                            placeholder='启用'
                                            onChange={this.handleChangeChoice.bind(this, LABEL, index)}

                                        />
                                    </FormItem>
                                </Col>
                                <Col span={10}>
                                    <FormItem
                                        label={`选项value${index + 1}`}
                                        {...formItemLayoutRadio}
                                    >
                                        <Input
                                            value={item.value}
                                            placeholder={'请填入值'}
                                            ref={(ref) => {
                                                this[`value${index}`] = ref;
                                            }}
                                            onChange={this.handleChangeChoice.bind(this, VALUE, index)}
                                        />
                                    </FormItem>

                                </Col>
                                {
                                    (index + 1) !== choiceNodeList.length && choiceNodeList.length > 2 && <React.Fragment>
                                        <Col span={2}>
                                            <Button shape="circle" size='small' icon='minus' onClick={() => {
                                                const tempNodeList = [...choiceNodeList];
                                                tempNodeList.splice(index, 1);
                                                this.setState({
                                                    choiceNodeList: tempNodeList
                                                });
                                            }}></Button>
                                        </Col>
                                    </React.Fragment>
                                }
                                {
                                    (index + 1) === choiceNodeList.length && <React.Fragment>
                                        <Col span={2}>
                                            <Button shape="circle" size='small' icon='plus' onClick={() => {
                                                // const tempNodeList = [...choiceNodeList, { id: choiceNodeId + 1 }];
                                                this.setState({
                                                    choiceNodeList: [...choiceNodeList, { id: choiceNodeId + 1 }],
                                                    choiceNodeId: choiceNodeId + 1,
                                                    isTouch: true
                                                });
                                            }}></Button>
                                            {
                                                choiceNodeList.length && choiceNodeList.length > 2 && <Button className='mar-l-4' shape="circle" size='small' icon='minus' onClick={() => {
                                                    const tempNodeList = [...choiceNodeList];
                                                    tempNodeList.splice(index, 1);
                                                    this.setState({
                                                        choiceNodeList: tempNodeList

                                                    });
                                                }}></Button>
                                            }
                                        </Col>
                                    </React.Fragment>
                                }
                            </Row>
                        );
                    })
                }
<<<<<<< HEAD
           </div>
            <FormItem
            >
                <Row  type='flex' align='middle'>
=======
            </div>

            <FormItem>
                <Row>
>>>>>>> 405c17b17b028a1680b7d13cb92d779ba4878ab6
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <Col span={6} style={{marginLeft:'10px'}}>
                    <Radio.Group style={{display:'flex',alignItems:'center'}} defaultValue={isRequired} onChange={(e)=>{
                        this.setState({
                            isRequired:e.target.value
                        })
                    }}>
                        <Radio value={true}>必填</Radio>
                        <Radio value={false}>非必填</Radio>
                    </Radio.Group>
                    </Col>
                    {isRequired&&<Col span={5} style={{marginLeft:'10px'}}>
                        <Input placeholder='默认选中value1'  onChange={(e)=>{
                            this.setState({
                                defaultValue:e.target.value
                            })
                        }}/>
                    </Col>}
                </Row>
            </FormItem>
        </div>;
    }
}
