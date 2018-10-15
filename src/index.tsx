import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import App from './App';
import 'antd/dist/antd.css'
import rawData,{Data,Video,Columns,RawColumn } from './data'
const ele = document.getElementById('app');
const BASE_URL = 'http://localhost:8081/video';
const ax = Axios.create({baseURL:BASE_URL});
async function getDescription(columnName:string, name:string):Promise<string>{
    return (await ax.get(`${columnName}/${name}.txt`)).data
}
function getImgUrl(columnName:string, name:string ){
    const ans = (`${BASE_URL}/${columnName}/${name}.png`)
    console.log(ans);
    return ans;
}
type ILoadData = ()=>Promise<Columns>
const loadData:ILoadData = async()=>{
    const data:Columns =[];
    for(const o of rawData){
        const videos:Array<Video> = []
        for(const o1 of o.videos){
            const content = await getDescription(o.name, o1);
            videos.push({
                name:o1,
                imgUrl:getImgUrl(o.name, o1),
                videoUrl:`${BASE_URL}/${o.name}/${o1}.mp4`,
                content,
            })
        }
        data.push({
            ...o,
            videos
        })
    }
    return data;
}
loadData().then(res=> ReactDom.render(<App data={res}></App>, ele)) 