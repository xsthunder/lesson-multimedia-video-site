import React from 'react';
import { Column, Video } from '../data';
import { Carousel, Tooltip, Popover } from 'antd';

interface Props{ 
    column:Column
    handleVideoSelect:(selectedVideo:Video)=>void
}
interface State{
    column:Column
}

const category2music = {
    anime:'鈴湯 - 夏空の光.mp3',
    korean:'文玄雅 - 크리켓송.mp3'
}
class Home extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        let column = this.props.column
        column = {...column}
        this.state={
            column
        }
    }
    render(){
        const {
            column,
            handleVideoSelect
        } = this.props
        const {

        } = this.state
        console.log(column)
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Carousel autoplay pauseOnHover>
                    {
                        column.videos.map(o=>(
                            <Popover  title={o.name} content={o.content}>
                                <div onClick={()=>handleVideoSelect(o)}>
                                    <img src={o.imgUrl}></img>
                                </div>
                            </Popover>
                        ))
                    }
                </Carousel>
                <audio controls src={`http://localhost:8081/music/${category2music[column.name as "anime"|"korean"]}`}></audio>
            </div>
        )
    }
}
export default Home;