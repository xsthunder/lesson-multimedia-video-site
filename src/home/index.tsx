import React from 'react';
import { Column } from '../data';
import { Carousel, Tooltip, Popover } from 'antd';
import Axios from 'axios';

interface Props{ 
    column:Column
    columnName :string
    handleVideoSelect:(selectedVideo:string)=>void
}
interface State{
    column:Column
}
const BASE_URL = 'http://localhost:8081/video/';
const ax = Axios.create({baseURL:BASE_URL});
async function getDescription(columnName:string, name:string){
    return await ax.get(`${columnName}/${name}.txt`)
}
function getImgUrl(columnName:string, name:string ){
    const ans = (`${BASE_URL}/${columnName}/${name}.png`)
    console.log(ans);
    return ans;
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
            columnName,
            column,
            handleVideoSelect
        } = this.props
        const {

        } = this.state
        console.log(column)
        getDescription(columnName, column.videos[0]).then(o=>console.log(o.data))
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Carousel autoplay>
                    {
                        column.videos.map(o=>(
                            <Popover title={o} content={o}>
                                <div onClick={()=>handleVideoSelect(o)}>
                                    <img src={getImgUrl(columnName, o)}></img>
                                </div>
                            </Popover>
                        ))
                    }
                </Carousel>,
            </div>
        )
    }
}
export default Home;