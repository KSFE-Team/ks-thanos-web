export interface SelectProps {
  disabled: boolean;
  placeholder: string;
  showSearch: boolean;
  allowClear: boolean;
}

interface OptionData {
  props: {
    disabled: boolean;
    key: string;
    title: string;
    value: string | number;
    className: string;
  };
  lable: string | number;
}

interface OptGroupData {
  key: string;
  laber: string;
  options: OptionData[];
}

export interface SelectData {
  stateName: string;
  componentName: "Select";
  source: "antd";
  default: false;
  props: SelectProps;
  defaultValue: string | number;
  options: OptionData[];
  optGroup: OptGroupData[];
  // dependencies: {
  //     type: fetch;
  //     responseType: list;
  //     api: /api/ser;
  //     method: GET
  // };
}
