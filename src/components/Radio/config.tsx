import React, { Component } from 'react';
import { Form, Button, Row, Col,Input,message } from 'antd';
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
    pageJSON: any
}

export default class RadioConfig extends Component<RadioConfigProps> {
    static propTypes = {
        onSave: PropTypes.func,
        form:PropTypes.object
    };

    state={
        formData: {
        
        },
        isTouch: false,
        choiceNodeList: [{ id: 1 },{ id: 2 }],
        choiceNodeId:2
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            let { pageJSON } = props,
                { components } = pageJSON;
            let  current = components.find(({ configVisible }) => configVisible);
            if(!current.key){
                current.key='status'
            }
            if(!current.label){
                current.label='状态'
            }
            return {
                choiceNodeList: [...current.props.list],
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL]
                }
            }
        } else {
            return state
        }
    }

    handleSave = () => {
        const { formData } = this.state;
        let { pageJSON, onSave } = this.props;
        if (!this[`key`].state.value) {
            message.error('表单项Key不可为空');
            return ;
        }else if (!this[`label`].state.value) {
            message.error('表单项名称不可为空');
            return ;
        }       
              
        let length = this.state.choiceNodeList.filter((item:object ,index:number)=>{
            return !this[`label${index}`].state.value||!(this[`value${index}`].state.value)
        }).length;
        if(length>0){
            message.error('表单项名称不可为空');
            return ;
        }
        let array:Array<object> = [];
        this.state.choiceNodeList.forEach((item,index)=>{
            array.push({
                id: item.id,
                label:this[`label${index}`].state.value,
                value:this[`value${index}`].state.value
           })
        })
        pageJSON.components = pageJSON.components.map((component) => {
            if (component.configVisible) {
                component = {
                    ...component,
                    ...formData,
                    props: {
                        ...component.props,
                        placeholder: formData[LABEL],
                        list:array,
                        label:this[`label`].state.value
                    }
                }
            }
            return component;
        })
        onSave && onSave(pageJSON)
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
    
    handleChangeChoice = (key,index,e) => {
        const { choiceNodeList } = this.state;
        const value = e.target.value;
        choiceNodeList[index][key]=value
        this.setState({
            choiceNodeList
        });
    };
    render() {
        const { formData,choiceNodeId,choiceNodeList } = this.state;
        console.log(choiceNodeList,'choiceNodeList')
        return <div>
             <FormItem
                label={'表单项Key'}
                {...formItemLayout}
            >
                <Input
                    value={formData[KEY]}
                    placeholder='例如: status'
                    ref={(ref)=>this[`key`]=ref}
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
                    ref={(ref)=>this[`label`]=ref}
                    onChange={this.handleChange.bind(this, LABEL)}
                />
            </FormItem>
            <div>
                {
                    choiceNodeList && choiceNodeList.map((item, index) => {
                        return (
                            <Row key={item.id} type='flex'>
                            <Col span={10}>
                            <FormItem
                                label={`选项Label${index+1}`}
                                {...formItemLayoutRadio}
                            >
                                <Input
                                    value={item['label']}
                                    ref={(ref)=>this[`label${index}`]=ref}
                                    placeholder='启用'
                                    onChange={this.handleChangeChoice.bind(this, LABEL,index)}

                                />
                            </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem
                                    label={`选项value${index+1}`}
                                    {...formItemLayoutRadio}
                                >
                                    <Input
                                        value={item['value']}
                                        placeholder={'请填入值'}
                                        ref={(ref)=>this[`value${index}`]=ref}
                                        onChange={this.handleChangeChoice.bind(this, VALUE,index)}
                                    />
                                </FormItem>
                            
                            </Col>
                                {
                                    (index + 1) !== choiceNodeList.length && choiceNodeList.length > 2 && <React.Fragment>
                                        <Col span={2}>
                                            <Button shape="circle" size='small' icon='minus' onClick={() => {
                                                let tempNodeList = [...choiceNodeList];
                                                tempNodeList.splice(index, 1);
                                                this.setState({
                                                    choiceNodeList: tempNodeList
                                                })
                                            }}></Button>
                                        </Col>
                                    </React.Fragment>
                                }
                                {
                                    (index + 1) === choiceNodeList.length && <React.Fragment>
                                        <Col span={2}>
                                            <Button shape="circle" size='small' icon='plus' onClick={() => {
                                                this.setState({
                                                        choiceNodeList: [...choiceNodeList, { id: choiceNodeId + 1 }],
                                                        choiceNodeId: choiceNodeId + 1
                                                })
                                            }}></Button>
                                            {
                                                choiceNodeList.length && choiceNodeList.length > 2 && <Button className='mar-l-4' shape="circle" size='small' icon='minus' onClick={() => {
                                                    let tempNodeList = [...choiceNodeList];
                                                    tempNodeList.splice(index, 1);
                                                    this.setState({
                                                            choiceNodeList: tempNodeList

                                                    })
                                                }}></Button>
                                            }
                                        </Col>
                                    </React.Fragment>
                                }
                            </Row>
                        );
                    })
                }
           </div>

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
        </div>
    }
}