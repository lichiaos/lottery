import React, {useEffect, useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import { notification } from 'antd';
import { getLotteryNum } from '../../axios'

const position = 0
const ordNumArr = ['3', '4', '5', '6', '7']
const option = {
    color: (params: any) => {
        return ordNumArr.includes(params.data) ? '#00FA9A' : '#FF4500'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
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
            data : [],
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
            name:'号码',
            type:'bar',
            data:[],
            label: {
                show: true
            }
        }
    ],
    dataZoom: [
        {
            show: true,
            start: 0,
            end: 50
        },
    ],
};
let timeid: any
const EchartsBar = (): React.ReactElement => {
    let [options, setOptions] = useState(option);
    useEffect(() => {
        async function fetchData() {
            let res: Array<object> = await getLotteryNum({lotCode: 'TEQ28'})
            const xData = res.map((k: any) => k.qiHao.slice(k.qiHao.length - 3, k.qiHao.length))
            const yData = res.map((k: any) => k.haoMa.charAt(position))
            if (!res) return
            let times: number = 0
            let max: number = 0
            res.forEach((num: any) => {
                let haoMao: string = num.haoMa.charAt(position)
                if (!ordNumArr.includes(haoMao)) {
                    times++
                } else {
                    if (times > max) {
                        max = times
                    }
                    times = 0
                }
            })
            notification.warning({
                message: `总共连续没中${max}期`
            })
            setOptions(oldOptions => ({
                ...oldOptions,
                xAxis : [
                    {
                        type : 'category',
                        data : xData,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                series : [
                    {
                        name: position === 0 ? '百位': position === 2 ? '十位' : '个位',
                        type:'bar',
                        data: yData,
                        label: {
                            show: true
                        }
                    },
                ]
            }))
        }
        fetchData()
       timeid = setInterval(() => fetchData(), 60000)
        return ( ) => clearInterval(timeid)
    }, []);

    return <ReactEcharts
    option={options}
    style={{height: '100%', width: '100%'}}
    className={'react_for_echarts'}
    />
};
export default EchartsBar
