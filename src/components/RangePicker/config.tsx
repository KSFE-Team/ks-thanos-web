import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Switch, message } from 'antd';
import PropTypes from 'prop-types';
import { FormComponentProps } from 'antd/es/form';
import { ALIAS, FORMITEM_LAYOUT, FORM_MESSAGE } from 'Src/utils/constants';
import { findComponent, saveComponent } from 'Src/utils';
import ClearButton from 'Src/components/ClearButton';
import { initState } from './utils';
import { checkFieldData } from 'Src/utils/utils';

const FormItem = Form.Item;
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const KEY = 'key';
const LABEL = 'label';
const PLACEHOLDER = 'placeholder';
const FORMAT = 'format';
const SHOWTIME = 'showTime';
const SHOWTIMEFORMAT = 'showTimeFormat';

interface RangePickerConfigProps extends FormComponentProps {
    pageJSON: any;
    onSave(pageJSON: any): void;
}

interface RangePickerConfigState {
    formData: {
        props: {
            showTime: boolean;
        };
    };
    isTouch: boolean;
    current: any;
}

class RangePickerConfig extends Component<RangePickerConfigProps, RangePickerConfigState> {
    static propTypes = {
        onSave: PropTypes.func
    };

    state = initState

    static getDerivedStateFromProps(props, state) {
        if (!state.isTouch) {
            const { pageJSON } = props;
            const { components } = pageJSON;
            const current = findComponent(components);
            return {
                formData: {
                    [KEY]: current[KEY],
                    [LABEL]: current[LABEL],
                    props: current.props
                },
                current
            };
        } else {
            return state;
        }
    }

    handleSave = () => {
        const { formData, formData: { props: fieldProps } } = this.state;
        const { current } = this.state;
        const { pageJSON, onSave } = this.props;
        const { error } = checkFieldData('RangePicker', formData);
        if (error) {
            message.error(FORM_MESSAGE);
            return false;
        }
        this.setState({
            isTouch: true
        });
        const postFormData = {
            key: formData[KEY],
            label: formData[LABEL] || '',
            props: {
                ...current.props,
                placeholder: fieldProps[PLACEHOLDER] || '',
                format: fieldProps[FORMAT],
                showTime: fieldProps[SHOWTIMEFORMAT] ? { format: fieldProps[SHOWTIMEFORMAT] } : fieldProps.showTime,
            }
        };
        pageJSON.components = saveComponent(current.id, pageJSON.components, postFormData);
        onSave && onSave(pageJSON);
    }

    handleChangeValue = ({ type, ...other }) => {
        const isChild = type.split('.');
        let provPro = JSON.parse(JSON.stringify(this.state.formData));
        if (isChild[0] === 'props') {
            provPro = {
                ...provPro,
                props: {
                    ...provPro.props,
                    ...other
                }
            };
        } else {
            provPro = {
                ...provPro,
                ...other
            };
        }
        this.setState({
            formData: {
                ...provPro
            },
            isTouch: true
        });
    }

    render() {
        const { formData, formData: { props: stateProps = {} } } = this.state;
        return <div>
            <FormItem
                label={ALIAS.KEY}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    placeholder='例如： rangePicker'
                    value={formData[KEY]}
                    onChange={(e) => { this.handleChangeValue({ key: e.target.value, type: 'key' }); }}
                />

            </FormItem>
            <FormItem
                label={ALIAS.LABEL}
                {...FORMITEM_LAYOUT}
                required={true}
            >
                <Input
                    placeholder='例如： 时间区间'
                    value={formData[LABEL]}
                    onChange={(e) => { this.handleChangeValue({ label: e.target.value, type: 'label' }); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.PLACEHOLDER}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    placeholder='例如： 开始时间/截止时间'
                    value={stateProps[PLACEHOLDER] ? stateProps[PLACEHOLDER].join('/') : '开始时间/截止时间'}
                    onChange={(e) => { this.handleChangeValue({ placeholder: e.target.value.split('/'), type: 'props.placeholder' }); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.DATE_FORMAT}
                {...FORMITEM_LAYOUT}
            >
                <Input
                    placeholder={`例如：${DATE_FORMAT} ${TIME_FORMAT}`}
                    value={stateProps[FORMAT]}
                    onChange={(e) => { this.handleChangeValue({ format: e.target.value, type: 'props.format' }); }}
                />
            </FormItem>
            <FormItem
                label={ALIAS.SHOW_TIME}
                {...FORMITEM_LAYOUT}
            >
                <Switch
                    onChange={(value) => {
                        if (!value) {
                            this.handleChangeValue({ showTime: false, format: DATE_FORMAT, type: 'props.showTime'});
                        } else {
                            this.handleChangeValue({ showTime: true, format: `${DATE_FORMAT} ${TIME_FORMAT}`, type: 'props.showTime'});
                        }
                    }}
                    defaultChecked={(stateProps[SHOWTIME] || stateProps[SHOWTIME] === false) ? stateProps[SHOWTIME] : true}
                />
            </FormItem>
            {
                ('showTime' in formData.props && formData.props.showTime) && <FormItem
                    label={ALIAS.TIME_FORMAT}
                    {...FORMITEM_LAYOUT}
                >
                    <Input
                        placeholder={`例如：${TIME_FORMAT}`}
                        value={stateProps[SHOWTIMEFORMAT]}
                        onChange={(e) => { this.handleChangeValue({ showTimeFormat: e.target.value, type: 'props.showTimeFormat'}); }}
                    />
                </FormItem>
            }
            <FormItem>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleSave}
                            type='primary'
                        >确定</Button>
                    </Col>
                    <ClearButton initState={initState} that={this} type='RangePicker' />
                </Row>
            </FormItem>
        </div>;
    }
}

// @ts-ignore
export default Form.create<RangePickerConfigProps>()(RangePickerConfig);
