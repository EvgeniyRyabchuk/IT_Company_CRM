import React from 'react';
import ReactEcharts from "echarts-for-react";
// import obama_budget_2012 from './data1.json';
import {numberWithCommas} from '../../../utils/utils';

import diskData from './data.json';


const BiggestProjects = ({ height, color = [], data}) => {


    const household_america_2012 = 113616229;

    function buildData(mode, originList) {
        let out = [];
        for (let i = 0; i < originList.length; i++) {
            let node = originList[i];
            let newNode = cloneNodeInfo(node);
            if (!newNode) {
                continue;
            }
            out[i] = newNode;
            let value = newNode.value;
            // Calculate amount per household.
            // value[3] = value[0] / household_america_2012;
            // if mode === 0 and mode === 2 do nothing
            if (mode === 1) {
                // Set 'Change from 2010' to value[0].
                let tmp = value[1];
                value[1] = value[0];
                value[0] = tmp;
            }
            if (node.children) {
                newNode.children = buildData(mode, node.children);
            }
        }
        return out;
    }

    function cloneNodeInfo(node) {
        if (!node) {
            return;
        }
        const newNode = {};
        newNode.name = node.name;
        newNode.id = node.id;
        newNode.value = (node.value || []).slice();
        return newNode;
    }
    function getLevelOption(mode) {
        return [
            {
                color:
                    mode === 2
                        ? [
                            '#c23531',
                            '#314656',
                            '#61a0a8',
                            '#dd8668',
                            '#91c7ae',
                            '#6e7074',
                            '#61a0a8',
                            '#bda29a',
                            '#44525d',
                            '#c4ccd3'
                        ]
                        : undefined,
                colorMappingBy: 'id',
                itemStyle: {
                    borderWidth: 3,
                    gapWidth: 3
                }
            },
            {
                colorAlpha: mode === 2 ? [0.5, 1] : undefined,
                itemStyle: {
                    gapWidth: 1
                }
            }
        ];
    }



    function isValidNumber(num) {
        return num != null && isFinite(num);
    }

    function getTooltipFormatter(mode) {
        let amountIndex = mode === 1 ? 1 : 0;
        let amountIndex2011 = mode === 1 ? 0 : 1;
        return function (info) {
            let value = info.value;
            const id = info.data.id;
            const description = info.data.description;
            let amount = value[amountIndex];
            amount = isValidNumber(amount)
                ? numberWithCommas(amount) + '$'
                : '-';
            let amount2011 = value[amountIndex2011];
            amount2011 = isValidNumber(amount2011)
                ? numberWithCommas(amount2011) + '$'
                : '-';
            // let perHousehold = value[3];
            // perHousehold = isValidNumber(perHousehold)
            //     ? numberWithCommas(+perHousehold.toFixed(4)) + '$'
            //     : '-';
            let change = parseFloat(value[2]);
            change = isValidNumber(change) ? change.toFixed(2) + '%' : '-';
            return [
                '<div class="tooltip-title">' +
                // ReactEcharts.format.encodeHTML(info.name) +
                '</div>',
                'Paid : &nbsp;&nbsp;' + value[0] + '<br>',
                'Budget: &nbsp;&nbsp;' + value[2] + '<br>',
                'Project ID: &nbsp;&nbsp;' + id + '<br>',
                'Description: &nbsp;&nbsp;'
            ].join('');
        };
    }

    function createSeriesCommon(mode) {
        return {
            type: 'treemap',
            tooltip: {
                formatter: getTooltipFormatter(mode)
            },
            label: {
                position: 'insideTopLeft',
                formatter: function (params) {
                    let arr = [
                        '{name|' + params.name + '}',
                        '{hr|}',
                        '{paid|$ ' +
                        numberWithCommas(parseFloat(params.value[2])) +
                        '} {label|budget}'
                    ];
                    mode !== 1 &&
                    arr.push(
                        '{budget|$ ' +
                        numberWithCommas(parseFloat(params.value[0]).toFixed(2)) +
                        '} {label|paid}'
                    );
                    return arr.join('\n');
                },
                rich: {
                    budget: {
                        fontSize: 22,
                        lineHeight: 30,
                        color: 'yellow'
                    },
                    household: {
                        fontSize: 14,
                        color: '#fff'
                    },
                    label: {
                        fontSize: 9,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        color: '#fff',
                        borderRadius: 2,
                        padding: [2, 4],
                        lineHeight: 25,
                        align: 'right'
                    },
                    name: {
                        fontSize: 12,
                        color: '#fff'
                    },
                    hr: {
                        width: '100%',
                        borderColor: 'rgba(255,255,255,0.2)',
                        borderWidth: 0.5,
                        height: 0,
                        lineHeight: 10
                    }
                }
            },
            itemStyle: {
                borderColor: 'black'
            },
            levels: getLevelOption(0)
        };
    }
    let modes = [''];

    const option = {
        title: {
            top: 5,
            left: 'center',
            text: 'Biggest Projects',
            // subtext: 'Obama’s 2012 Budget Proposal'
        },
        legend: {
            data: modes,
            selectedMode: 'single',
            top: 55,
            itemGap: 5,
            borderRadius: 5
        },
        tooltip: {},
        series: modes.map(function (mode, idx) {
            let seriesOpt = createSeriesCommon(idx);
            seriesOpt.name = mode;
            seriesOpt.top = 80;
            seriesOpt.visualDimension = idx === 2 ? 2 : undefined;
            seriesOpt.data = buildData(idx, data);
            seriesOpt.levels = getLevelOption(idx);
            return seriesOpt;
        })
};




    return <ReactEcharts style={{ height: height }} option={option} />;
};

export default BiggestProjects;