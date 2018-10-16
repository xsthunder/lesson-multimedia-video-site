import React from 'react';
import ReactEcharts from 'echarts-for-react'
import { Rate, Card,Input, Divider, Button, List, Icon} from 'antd';
import ReactPlayer from 'react-player';
import { getOption } from './getOption';
import { Video, Column, Comment } from 'src/data';
import { Meta } from 'antd/lib/list/Item';
const {TextArea} = Input
class IconText extends React.Component<{ type:string, text:string, onClick:()=>void,liked:boolean }, any>{
    render(){
        const {
            type,text,onClick,liked
        } = this.props
        return (
            <span onClick={onClick}>
                <Icon type={type} style={{ marginRight: 8 }} theme={liked?"filled":"outlined"} />
                {text}
            </span>

        );
    }
}
export type Rates = [number, number, number, number, number];
interface Props {
    video: Video
    column: Column
    handleVideoSelect: (v: Video) => void
}
interface State {
    rates: Rates
    comment:Comment
}
class VideoPlayer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            comment:{
                hot:0,
                rate:3,
                content:'',
                liked:false
            },
            rates: [3, 2, 5, 6, 1],
        }
    }
    onTextChange = (content:string)=>{
        this.setState((prevState) => {
            let {comment } = prevState;
            comment= {...comment,content}
            return {
                comment
            }
        })
    }
    onRateChange = (rate: number) => {
        this.setState((prevState) => {
            const rates = prevState.rates.slice() as Rates;
            let {comment } = prevState;
            if (comment.rate !== 0) {
                rates[prevState.comment.rate - 1]--;
            }
            if(rate !== 0){
                rates[rate - 1]++;
            }
            comment = {...comment, rate}
            return (
                {
                    rates,
                    comment
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
            comment, rates
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
                    评分：<Rate value={comment.rate} onChange={this.onRateChange}></Rate>
                    <Button type="primary" onClick={
                        (e:any)=>{
                            // modifying props directly is not right!
                            video.comments.push(comment)
                            this.setState({})
                        }
                    }>提交</Button>
                    <TextArea onChange={(e)=>this.onTextChange(e.target.value)} style={{margin:4}} placeholder="可选文字评论" autosize={{ minRows: 2, maxRows: 6 }} />
                </div>
                <Divider>热帖</Divider>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={video.comments}
                    renderItem={(item: Comment) => (
                        <List.Item
                            key={item.content}
                            actions={[ <IconText onClick={()=>{
                            // modifying props directly is not right!
                                if(!item.liked){
                                    item.hot++;
                                }
                                else {
                                    item.hot--;
                                }
                                item.liked = !item.liked;
                                this.setState({})
                            }} type="like-o" text={item.hot.toString()} liked={item.liked} />]}
                        >
                            {item.content}
                        </List.Item>
                    )}
                />
                <Divider>为你推荐</Divider>
                {
                    column.videos.slice(1, 2).map(o => (
                        <Card
                            onClick={e => handleVideoSelect(o)}
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