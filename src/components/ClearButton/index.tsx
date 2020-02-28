import React from 'react';
import {Button} from 'antd';
// import { connect } from 'kredux';
import {clearData} from 'Src/utils/commonFunc';

interface Props {
    initState: object,
    that: object,
    type?: string,
    generatePage?: any;
    showTopToolbar?: boolean;
}

// @connect(({ generatePage = {}}) => ({
//     generatePage,
// }))
export default class ClearButton extends React.Component<Props> {

    render() {
        const { that, initState, type } = this.props;
        return (
            <Button type="primary" onClick={() => { clearData(that, initState, type); }}>
                清除配置
            </Button>
        );
    }
}
