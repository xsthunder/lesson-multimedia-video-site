import React from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import  { Video, Columns, Column } from './data';
import Home from './home';
import VideoPlayer from './video-player';

const { Header, Content, Footer } = Layout;
interface State{
    selectedColumn:Column
    selectedVideo:Video | null
    data:Columns
}
interface Props{ 
    data:Columns
}
export default class App extends React.Component<Props, State>{
    static getDerivedStateFromProps(props:Props, state:State|null){
        const data = props.data;
        console.log(data);
        if(!state){
            return {
            selectedColumn:data[0],
            selectedVideo:null,
            data,
            }
        }
        return {
            ...state,
            data
        }
    }
    constructor(props: Props) {
        super(props);
        this.state = App.getDerivedStateFromProps(props, null);
    }
    handleNavSelect = (selectedColumnName:string) =>{
        const data = this.props.data;
        const selectedColumn = data.filter(o=>o.name===selectedColumnName)[0];
        this.setState({
            selectedColumn,
            selectedVideo:null
        })
    }
    handleVideoSelect = (selectedVideo:Video)=>{
        this.setState({
            selectedVideo
        })
    }
    handleUpper = ()=>{
        this.setState({
            selectedVideo:null
        })
    }
    render() {
        const {
            selectedColumn,
            selectedVideo,
            data,
        } = this.state;
        return (
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[selectedColumn.name]}
                        style={{ lineHeight: '64px' }}
                        onSelect={(e)=>this.handleNavSelect(e.selectedKeys[0])}
                    >
                    {
                        data.map(
                            (o)=>(
                                <Menu.Item key={o.name}>{o.alias}</Menu.Item>
                            )
                        )
                    }
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>
                        <a onClick={e=>this.handleUpper()}>{selectedColumn.alias}</a>
                        </Breadcrumb.Item>
                        {
                            selectedVideo&&<Breadcrumb.Item>{selectedVideo.name}</Breadcrumb.Item>
                        }
                    </Breadcrumb>
                    {
                        selectedVideo?(
                            <VideoPlayer video={selectedVideo} column={selectedColumn} handleVideoSelect={this.handleVideoSelect}/>
                        ):(
                            <Home column={selectedColumn} handleVideoSelect={this.handleVideoSelect}/>
                        )
                    }
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Created by Jianjun Zeng©2018
                </Footer>
            </Layout>)
    }
}