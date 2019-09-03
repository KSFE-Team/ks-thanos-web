import React from 'react';
import { Checkbox } from 'antd';
import { getInitJson, getTools } from './utils';
import Config from './config';

interface prp {
    formData: [{
        key: string,
        label: string,
        isCheck: boolean
    }]
}

class KCheckBox extends React.Component<prp> {

    render() {
        const { formData } = this.props;
        return (
            formData
                ? formData.map((ele, index) => {
                    return <Checkbox
                        key={index}
                        checked={ele.isCheck}
                    >{ele.label}</Checkbox>
                })
                : <div></div>
        );
    }
}

export {
    KCheckBox as component,
    getInitJson,
    getTools,
    Config as config
}
