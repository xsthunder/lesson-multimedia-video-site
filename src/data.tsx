import videoData from './video';
interface Video {
    imgUrl: string,
    videoUrl: string,
    content: string,
    name: string
}
interface Column {
    name:string
    alias:string
    videos:Array<Video>
}
type Columns = Array<Column>;
interface RawColumn  {
    name:string
    alias:string
    videos:Array<string>
}
type RawColumns = Array<RawColumn>
const anime:RawColumn = {
    name:'anime',
    alias:"动画片",
    videos:videoData['anime']
}
const korean:RawColumn={
    name:'korean',
    alias:"韩国电影",
    videos:videoData['korean']
}
const rawData:RawColumns= [
    korean,
    anime,
]
interface Data{
    [index:string]:Column
}

export default rawData;
export {
    Column,
    Columns,
    RawColumn,
    RawColumns,
    Data,
    Video
}
