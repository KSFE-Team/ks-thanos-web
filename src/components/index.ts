import * as Table from './Table/index';
import * as RelationTable from './RelationTable/index';
import * as Input from './Input/index';
import * as Select from './Select/index';
import * as DatePicker from './DatePicker/index';
import * as InputNumber from './InputNumber/index';
import * as RangePicker from './RangePicker/index';
import * as TextArea from './TextArea/index';
import * as Radio from './Radio/index';
import * as CheckBox from './CheckBox';
import * as Form from './Form';
import * as Fragment from './Fragment';

/**
 * 展示类组件
 */
const DATA_ENTRY = {
    Input,
    Select,
    DatePicker,
    InputNumber,
    RangePicker,
    TextArea,
    Radio,
    CheckBox,
    Fragment
};

/**
 * 展示类组件
 */
const DATA_DISPLAY = {
    Table
};

/**
 * 其他组件
 */
const OTHER_COMPONENTS = {
    Form
};

/**
 * 父子Table
 */
const RELATION_TABLE = {
    RelationTable
};

/**
 * 所有组件
 */
const ALL_TOOLS = {
    ...DATA_DISPLAY,
    ...DATA_ENTRY,
    ...OTHER_COMPONENTS,
    ...RELATION_TABLE,
    ...Form,
    ...Table,
};

/**
 * 获取录入组件
 */
const getDataEntry = () => DATA_ENTRY;

export {
    DATA_DISPLAY,
    RELATION_TABLE,
    DATA_ENTRY,
    OTHER_COMPONENTS,
    ALL_TOOLS,
    getDataEntry
};