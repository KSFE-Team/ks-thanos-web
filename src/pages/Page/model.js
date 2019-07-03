export default {
    namespace: "page",
    initialState: {
        id: 2,
        pageJSON: {
            name: "", // 页面名称
            components: [
                // {
                //     name: "Form",
                //     source: "antd",
                //     default: false,
                //     components: [
                //         {
                //             name: "Input",
                //             source: "antd",
                //             default: false
                //         }
                //     ],
                //     props: {}
                // },
                {
                    name: "Table",
                    source: "antd",
                    id: 1,
                    default: false,
                    props: {
                        columns: [
                            {
                                title: "表头1",
                                dataIndex: "col1"
                            },
                            {
                                title: "表头2",
                                dataIndex: "col2"
                            },
                            {
                                title: "表头3",
                                dataIndex: "col3"
                            },
                            {
                                title: "表头4",
                                dataIndex: "col4"
                            }
                        ]
                    },
                    dependencies: [
                        // 
                    ]
                }
            ] // 子组件
        }
    }
};
