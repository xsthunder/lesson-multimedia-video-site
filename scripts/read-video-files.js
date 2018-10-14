const path = require('path')
const VIDEO_PATH = path.resolve(__dirname, '../video')
const OUT_PATH = path.resolve(__dirname, '../src/video.tsx');
const fs = require('fs')
const videos = fs.readdirSync(VIDEO_PATH);
const ans = videos.reduce((p,c)=>{
    p[c] = fs.readdirSync(path.resolve(VIDEO_PATH, c)).map(
        o=>{
            const arr = o.split('.');
            return arr.slice(0, arr.length-1).join('.');
        }
    );
    return p;
}, {})

fs.writeFileSync(OUT_PATH, 
`const videoData = ${JSON.stringify(ans)}; export default videoData;`, {encoding:'utf8'});