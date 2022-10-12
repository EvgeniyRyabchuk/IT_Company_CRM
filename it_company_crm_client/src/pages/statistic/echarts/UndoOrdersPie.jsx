import React from 'react';
import ReactEcharts from "echarts-for-react";
import {values} from "lodash";



const UndoOrdersPie = ({ height, color = [], data}) => {

    const option = {
        // backgroundColor: '#2c343c',
        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show: false,
            min: 0,
            max: data.total,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: 'Active/Undo Ratio',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: data.payload.sort(function (a, b) {
                    return a.value - b.value;
                }),
                // roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    // shadowBlur: 200,
                    // shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };


    return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default UndoOrdersPie;