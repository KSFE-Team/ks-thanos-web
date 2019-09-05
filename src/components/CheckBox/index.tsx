import React from 'react';
import { Checkbox } from 'antd';
import { getInitJson, getTools } from './utils';
import Config from './config';

interface Props {
    options: [{
        isDisabled: boolean;
        isCheck: boolean;
        key: string;
        label: string;
    }]
}

class KCheckBox extends React.Component<Props> {

    render() {
        const { options } = this.props;
        console.log(this.props);
        return (
            options
                ? options.map((ele, index) => {
                    return <Checkbox
                        key={index}
                        checked={ele.isCheck}
                        disabled={ele.isDisabled}
                    >{ele.label}</Checkbox>;
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
};
