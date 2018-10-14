import React from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import data from './data';
import Home from './home';
import VideoPlayer from './video-player';
const dataKeys = Object.keys(data);

const { Header, Content, Footer } = Layout;
interface State{
    selectedColumn:string
    selectedVideo: string
}
interface Props{ }
export default class extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedColumn:dataKeys[0],
            selectedVideo:''
        }
    }
    handleNavSelect = (e:{key:string}) =>{
        this.setState({
            selectedColumn:e.key,
            selectedVideo:''
        })
    }
    handleVideoSelect = (selectedVideo:string)=>{
        this.setState({
            selectedVideo
        })
    }
    render() {
        const {
            selectedColumn,
            selectedVideo
        } = this.state;
        return (
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[selectedColumn]}
                        style={{ lineHeight: '64px' }}
                        onSelect={this.handleNavSelect}
                    >
                    {
                        dataKeys.map(
                            (o:string)=>(
                                <Menu.Item key={o}>{data[o].alias}</Menu.Item>
                            )
                        )
                    }
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {
                        selectedVideo?(
                            <VideoPlayer/>
                        ):(
                            <Home columnName={selectedColumn} column={data[selectedColumn]} handleVideoSelect={this.handleVideoSelect}/>
                        )
                    }
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Created by Jianjun Zeng©2018
                </Footer>
            </Layout>)
    }
}