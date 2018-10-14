import React from 'react';
import { Column } from '../data';
import { Carousel } from 'antd';


interface Props{ 
    column:Column
}
interface State{

}
class Home extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        
    }
    render(){
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Carousel autoplay>
                    <div>sadfasdfoijew</div>
                </Carousel>,
            </div>
        )
    }
}
export default Home;