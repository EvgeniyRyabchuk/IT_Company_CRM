import React from 'react';
import ReactEcharts from "echarts-for-react";

// const updateFrequency = 2000;
// const dimension = 0;
//
// const countryColors = {
//     Australia: '#00008b',
//     Canada: '#f00',
//     China: '#ffde00',
//     Cuba: '#002a8f',
//     Finland: '#003580',
//     France: '#ed2939',
//     Germany: '#000',
//     Iceland: '#003897',
//     India: '#f93',
//     Japan: '#bc002d',
//     'North Korea': '#024fa2',
//     'South Korea': '#000',
//     'New Zealand': '#00247d',
//     Norway: '#ef2b2d',
//     Poland: '#dc143c',
//     Russia: '#d52b1e',
//     Turkey: '#e30a17',
//     'United Kingdom': '#00247d',
//     'United States': '#b22234'
// };


const BarRace = ({ height, color = [], data}) => {

        const option = {
            grid: {
                top: 10,
                bottom: 30,
                left: 300,
                right: 80
            },
            xAxis: {
                max: 'dataMax',
                // axisLabel: {
                //     formatter: function (n) {
                //         console.log(n)
                //         return n;
                //     }
                // },
                // data: data.map(e => e.total),
            },
            // data: data.map(e => e.status.name),
            // dataset: {
            //     source: data.map(e => e.total),
            // },
            yAxis: {
                data: data.map(e => e.status.name),
                type: 'category',
                inverse: true,
                // max: 10,
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function (e) {
                        return e;
                    },
                    rich: {
                        flag: {
                            fontSize: 25,
                            padding: 5
                        }
                    }
                },
                animationDuration: 300,
                animationDurationUpdate: 300
            },
            series: [
                {
                    data: data.map(e => ({
                            value: e.total,
                            itemStyle: {
                                color: e.status.bgColor
                            }
                        })
                    ),
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    label: {
                        show: true,
                        precision: 1,
                        position: 'right',
                        valueAnimation: true,
                        fontFamily: 'monospace'
                    }
                    // itemStyle: {
                    //     color: function (param) {
                    //         return  data.map(e => e.status.id  countryColors[param.value[3]] || '#5470c6';
                    //     }
                    // },

                }
            ],

        };


    return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default BarRace;