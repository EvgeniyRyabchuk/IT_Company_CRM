import React from 'react';
import ReactEcharts from "echarts-for-react";


import diskData from './data.json';


const UndoCasesTreemap = ({ height, color = [], data}) => {

    const formatUtil = ReactEcharts.format;
    function getLevelOption() {
        return [
            {
                itemStyle: {
                    borderWidth: 0,
                    gapWidth: 3
                }
            },
            {
                itemStyle: {
                    gapWidth: 1
                }
            },
            {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                    gapWidth: 1,
                    borderColorSaturation: 0.6
                }
            }
        ];
    }

    const option = {
        title: {
            text: 'Disk Usage',
            left: 'center'
        },
        tooltip: {
            formatter: function (info) {
                var value = info.value;
                var treePathInfo = info.treePathInfo;
                var treePath = [];
                for (var i = 1; i < treePathInfo.length; i++) {
                    treePath.push(treePathInfo[i].name);
                }
                return [
                    '<div class="tooltip-title">' +
                    formatUtil.encodeHTML(treePath.join('/')) +
                    '</div>',
                    'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
                ].join('');
            }
        },
        series: [
            {
                name: 'Disk Usage',
                type: 'treemap',
                visibleMin: 300,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                itemStyle: {
                    borderColor: '#fff',
                },
                levels: getLevelOption(),
                data: diskData
            }
        ]
    };

    console.log(option);


    return <ReactEcharts style={{ height: height }} option={option} />;
};

export default UndoCasesTreemap;