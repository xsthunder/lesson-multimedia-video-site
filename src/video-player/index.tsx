import React from 'react';
import ReactEcharts from 'echarts-for-react'
import { Rate, Card,Input, Divider } from 'antd';
import ReactPlayer from 'react-player';
import { getOption } from './getOption';
import { Video, Column } from 'src/data';
import { Meta } from 'antd/lib/list/Item';
const {TextArea} = Input

export type Rates = [number,number,number,number,number];
interface Props{
    video:Video
    column:Column
    handleVideoSelect:(v:Video)=>void
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
        const {
            video,
            column,
            handleVideoSelect,
        } = this.props
        const{
            rate, rates
        } = this.state;
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <ReactPlayer url={video.videoUrl} controls muted
                    width="100%"
                    height="100%"
                ></ReactPlayer>
                <ReactEcharts option={getOption(rates)}></ReactEcharts>
                <Divider>评价一下</Divider>
                <div>
                    评分：<Rate value={rate} onChange={this.onRateChange}></Rate>
                    <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
                </div>
                <Divider>为你推荐</Divider>
                {
                    column.videos.slice(1,2).map(o=>(
                        <Card
                        onClick={e=>handleVideoSelect(o)}
                            hoverable
                            cover={<img src={o.imgUrl}></img>}
                        >
                            <Meta
                            title={o.name}
                            description={o.content}
                            >
                            </Meta>
                        </Card>
                    ))
                }
            </div>
        )
    }
}
export default VideoPlayer