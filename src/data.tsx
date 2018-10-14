import videoData from './video';
interface Column{
    alias:string
    videos:Array<string>
}
const anime:Column = {
    alias:"动画片",
    videos:videoData['anime']
}
const korean:Column={
    alias:"韩国电影",
    videos:videoData['korean']
}
interface Data{
    [index:string]:Column
}
const data:Data = {
    anime,
    korean,
}

export default data;
export {
    Column,
    Data
}
