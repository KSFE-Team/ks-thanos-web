import React, { Component } from 'react';
// echarts 依赖
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/sankey';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/chart/treemap';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/chart/boxplot';
import 'echarts/lib/chart/graph';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/parallel';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/brush';
// 样式
import './index.scss';

// 官方shine主题
const colorPalette = [
    '#c12e34',
    '#e6b600',
    '#0098d9',
    '#2b821d',
    '#005eaa',
    '#339ca8',
    '#cda819',
    '#32a487'
];

const theme = {
    color: colorPalette,

    title: {
        textStyle: {
            fontWeight: 'normal'
        }
    },

    visualMap: {
        color: ['#1790cf', '#a2d4e6']
    },

    toolbox: {
        iconStyle: {
            normal: {
                borderColor: '#06467c'
            }
        }
    },

    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    dataZoom: {
        dataBackgroundColor: '#dedede',
        fillerColor: 'rgba(154,217,247,0.2)',
        handleColor: '#005eaa'
    },

    timeline: {
        lineStyle: {
            color: '#005eaa'
        },
        controlStyle: {
            normal: {
                color: '#005eaa',
                borderColor: '#005eaa'
            }
        }
    },

    candlestick: {
        itemStyle: {
            normal: {
                color: '#c12e34',
                color0: '#2b821d',
                lineStyle: {
                    width: 1,
                    color: '#c12e34',
                    color0: '#2b821d'
                }
            }
        }
    },

    graph: {
        color: colorPalette
    },

    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#c12e34'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#c12e34'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: '#eee',
                areaColor: '#ddd'
            },
            emphasis: {
                areaColor: '#e6b600'
            }
        }
    },

    gauge: {
        axisLine: {
            show: true,
            lineStyle: {
                color: [
                    [0.2, '#2b821d'],
                    [0.8, '#005eaa'],
                    [1, '#c12e34']
                ],
                width: 5
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 8,
            lineStyle: {
                color: 'auto'
            }
        },
        axisLabel: {
            textStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 12,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            length: '90%',
            width: 3,
            color: 'auto'
        },
        title: {
            textStyle: {
                color: '#333'
            }
        },
        detail: {
            textStyle: {
                color: 'auto'
            }
        }
    }
};

echarts.registerTheme('shine', theme);

export default class Chart extends Component<{
    option: any;
}> {
    private instance: any;
    private container: any;

    public componentDidMount() {
        this.renderChart(this.props);
    }

    public componentDidUpdate() {
        this.renderChart(this.props);
    }

    public componentWillUnmount() {
        if (this.instance) this.instance.dispose();
    }

    private renderChart = (props) => {
        if (!this.instance) {
            this.instance = echarts.init(this.container, 'default');
        } else {
            this.instance.dispose();
            this.instance = echarts.init(this.container, 'default');
        }

        this.instance.setOption(props.option);
        this.instance.resize();
    };

    render() {
        return (
            <div
                className="echart-wrapper"
                ref={(f) => (this.container = f)}
            ></div>
        );
    }
}
