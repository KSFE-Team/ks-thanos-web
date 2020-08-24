import React, { Component } from 'react';
import './index.scss';
import { Input, Form } from 'antd';
import { actions, connect } from 'kredux';

const FormItem = Form.Item;

interface PageConfigProps {
    generatePage: any;
}

class PageConfig extends Component<PageConfigProps> {

    handleChangeName = (event) => {
        const { value = '' } = event.target;
        actions.generatePage.changeTemplateName({
            name: value.trim()
        });
    }

    render() {
        return (
            <div className="thanos-page-config">
                <div className='thanos-page-config-title'>页面配置</div>
                <div className='thanos-page-config-form'>
                    <FormItem>
                        <Input
                            placeholder="页面名称"
                            value={this.props.generatePage.pageName}
                            onChange={this.handleChangeName}
                        />
                    </FormItem>
                </div>
            </div>
        );
    }
}

export default connect(({ generatePage }) => ({ generatePage }))(PageConfig);
