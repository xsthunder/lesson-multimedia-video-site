import React from 'react';
import ReactEcharts from 'echarts-for-react'
import { Rate} from 'antd';
import ReactPlayer from 'react-player';
import { getOption } from './getOption';

export type Rates = [number,number,number,number,number];
interface Props{

}
interface State{
    rates:Rates
    rate:number
}
class VideoPlayer extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = {
            rate: 3,
            rates: [3, 2, 5, 6, 1],
        }
    }
    onRateChange = (rate: number) => {
        this.setState((prevState) => {
            const rates = prevState.rates.slice() as Rates;
            if(prevState.rate !== 0){
                rates[prevState.rate - 1]--;
            }
            if(rate !== 0){
                rates[rate - 1]++;
            }
            return (
                {
                    rate,
                    rates
                }
            );
        })
    }
    render(){
        const{
            rate, rates
        } = this.state;
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Rate value={rate} onChange={this.onRateChange}></Rate>
                <ReactPlayer url='http://localhost:8081/1.mp4' controls muted
                    width="100%"
                    height="100%"
                ></ReactPlayer>
                <ReactEcharts option={getOption(rates)}></ReactEcharts>
            </div>
        )
    }
}
export default VideoPlayer