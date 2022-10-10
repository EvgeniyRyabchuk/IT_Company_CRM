import React from 'react';
import ReactEcharts from "echarts-for-react";
import {values} from "lodash";



const FunnelSalas = ({ height, color = [], data}) => {

    const option = {
        title: {
            text: 'Funnel'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            bottom: 0,
            data: data.stack.map(e => e.status.name) // ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
        },
        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: data.total,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                // center: ['10%', '10%'],
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: data.stack.map(e => ({value: e.percent, name: e.status.name}))

                // [
                //     { value: 60, name: 'Visit' },
                //     { value: 40, name: 'Inquiry' },
                //     { value: 20, name: 'Order' },
                //     { value: 80, name: 'Click' },
                //     { value: 100, name: 'Show' }
                // ]
            }
        ]
    };


    return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default FunnelSalas;