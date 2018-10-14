import { Rates } from './index';
export const getOption = (data: Rates) => {
    return ({
        title: {
            text: '评分'
        },
        tooltip: {},
        xAxis: {
            data: Array.from("一二三四五").map(o => `${o}星`)
        },
        yAxis: {},
        series: [{
            name: '评分',
            type: 'bar',
            data
        }]
    });
};