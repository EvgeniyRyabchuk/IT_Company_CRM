import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ height, color = [], data }) => {

    const option = {
        xAxis: {
            type: 'category',
            data: data.titles // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.values,  // [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };

    return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default LineChart;
