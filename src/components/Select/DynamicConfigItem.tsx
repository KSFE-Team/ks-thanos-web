
import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

let id = 0;

interface DynamicConfigItemProps {
    form: any;
    label: string;
    name: string;
    addText: string;
    defaultValue: any[];
};

export default class DynamicConfigItem extends Component<DynamicConfigItemProps> {
  remove = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
          return;
      }

      // can use data-binding to set
      form.setFieldsValue({
          keys: keys.filter((key) => key !== k),
      });
  };

  add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
          keys: nextKeys,
      });
  };

  render() {
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const { label, name, addText, defaultValue = [] } = this.props;
      const formItemLayout = {
          labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
          },
          wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
          },
      };
      const formItemLayoutWithOutLabel = {
          wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
          },
      };
      getFieldDecorator('keys', { initialValue: defaultValue.map((item, index) => index) });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => (
          <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? label : ''}
              required={false}
              key={k}
          >
              {getFieldDecorator(`${name}[${k}].label`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                      {
                          required: true,
                          whitespace: true,
                          message: '请填写label',
                      },
                  ],
                  initialValue: defaultValue[k] ? defaultValue[k].label : undefined
              })(<Input placeholder="请填写label" style={{ width: '40%', marginRight: 8 }} />)}
              {getFieldDecorator(`${name}[${k}].props.value`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                      {
                          required: true,
                          whitespace: true,
                          message: '请填写value',
                      },
                  ],
                  initialValue: defaultValue[k] ? defaultValue[k].props.value : undefined
              })(<Input placeholder="请填写value" style={{ width: '40%', marginRight: 8 }} />)}
              {keys.length > 1 ? (
                  <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      onClick={() => this.remove(k)}
                  />
              ) : null}
          </Form.Item>
      ));
      return (
          <React.Fragment>
              {formItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                      <Icon type="plus" /> {addText}
                  </Button>
              </Form.Item>
          </React.Fragment>
      );
  }
}
