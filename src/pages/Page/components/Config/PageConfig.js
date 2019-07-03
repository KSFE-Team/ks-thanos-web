import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { actions } from 'kredux';
import './index.scss';
const FormItem = Form.Item;

export default class PageConfig extends Component {

    /**
     * 变更页面名称
     */
    changePageName = (name) => {
        this.setJSON({
            name
        });
    };

    /**
     * 设置redux
     */
    setRedux = (redux) => {
        actions.page.setReducers(redux);
    };

    /**
     * 设置页面配置
     */
    setJSON = (json) => {
        const { pageJSON } = this.props.page;
        this.setRedux({
            pageJSON: {
                ...pageJSON,
                ...json
            }
        });
    };

    render() {
        const { pageJSON } = this.props.page;
        return (
            <div className="thanos-page-config">
                <div className="thanos-page-config-title">页面配置</div>
                <div className="thanos-page-config-form">
                    <FormItem>
                        <Input
                            value={pageJSON.name}
                            placeholder="页面名称"
                            onChange={e => {
                                const { value } = e.target;
                                this.changePageName(value);
                            }}
                        />
                    </FormItem>
                </div>
            </div>
        );
    }
}
