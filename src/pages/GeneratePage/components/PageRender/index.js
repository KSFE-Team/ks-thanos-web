import React, { Component } from 'react';
import { actions } from 'kredux';
import { DND } from 'BizComponents';
import * as Components from 'Components';


export default class PageRender extends Component {

     /**
     * 渲染组件
     */
    renderComponent = component => {
        const ComponentName = Components[component.name];
        if (!ComponentName) {
            console.error('thanos：no present component');
            return null;
        }
        let props = {
            ...(component.props || {})
        };
        return <ComponentName {...props} />;
    };

    /**
     * 显示配置界面
     */
    showConfig = (index) => {
        const { pageJSON } = this.props.generatePage;
        let { components } = pageJSON;
        components[index]['configVisible'] = true;
        this.setJSON({
            components
        });
    };

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
        const { pageJSON } = this.props.generatePage;
        this.setRedux({
            pageJSON: {
                ...pageJSON,
                ...json
            }
        });
    };

    render() {
        const { pageJSON } = this.props.generatePage;
        const { components: dataSource } = pageJSON;
        return(
            <div
                style={{
                    backgroud: 'rgba(0, 0, 0, .2)',
                    padding: '8px 10px',
                    border: '1px dashed #000',
                    borderRadius: '5px'
                }}
            >
                <DND
                    onRender={(data, index) => {
                        return (
                            <div
                                onClick={() => {
                                    this.showConfig(index);
                                }}
                            >
                                {this.renderComponent(data)}
                            </div>
                        );
                    }}
                    dataSource={dataSource}
                    onDragStart={() => {}}
                    onDragEnd={dataSource => {
                        this.setJSON({
                            components: dataSource
                        });
                    }}
                />
            </div>
        );
    }
}
