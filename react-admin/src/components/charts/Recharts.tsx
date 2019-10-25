import React, {useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';
import { getLotteryNum } from '../../axios'

const option = {
    color: (params: any) => {
        return params.data % 2 === 1 ? '#00FA9A' : '#FF4500'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[11, 52, 200, 334, 391, 330, 221]
        }
    ]
};

const EchartBar = () => {
    // @ts-ignore
    useEffect(async () => {
       let res: any = await getLotteryNum({lotCode: 'TEQ28'})
        console.log(res)
    }, [])

   return <ReactEcharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        className={'react_for_echarts'}
    />
}
export default EchartBar