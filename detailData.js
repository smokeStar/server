const fs      = require('fs')
   ,  path     = require('path')
   ,  marked   = require('marked');

// marked 中间件，将md文档转化成html
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

let directoryPath = path.resolve(__dirname,'file');
let htmls = [];


// 读取文件目录的方法
function readFiles(paths){
  return  new Promise(function(resolve, reject){
    fs.readdir(paths, function(err, filename){
      if(!err){
        resolve(filename);
      }else{
        reject(err);
      }
    })
  });
}
// 读取文件的方法
async function getFiles(){
  let filesPath = await readFiles(directoryPath);
  let completePaths = [];
  filesPath.forEach(function(f){
    completePaths.push(path.resolve(__dirname,'file',f));
  });
  // 异步过程
  for(let i=0; i<completePaths.length; i++){
    let f = await marked(fs.readFileSync(completePaths[i], 'utf-8'));
    htmls.push(f);
  }
}
module.exports = htmls;



