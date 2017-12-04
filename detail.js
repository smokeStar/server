//---------- 文章详情 v17.11.21 ----------------------------

const models     = require('./db')
   ,  insert     = require('./utils')
   ,  fs         = require('fs')
   ,  path       = require('path')
   ,  marked     = require('marked');

let   detail        = models.detail
   ,  directoryPath = path.resolve(__dirname,'file')
   ,  htmls         = [];

// 目录对应的编码
let obj = {
  vue : 1001,
  css : 2001,
  js  : 3001,
  node: 4001
};

// marked 中间件，将md文档转化成html
marked.setOptions({
  renderer   : new marked.Renderer(),
  gfm        : true,
  tables     : true,
  breaks     : true,
  pedantic   : false,
  sanitize   : true,
  smartLists : true,
  smartypants: false
});

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


async function readMainDir(firstDir){
  let firstDirs = await readFiles(firstDir); // 读取主目录下的子目录
  for(let j=0; j<firstDirs.length; j++){     // for循环读取每个子目录下的文件目录
    let fd = firstDirs[j];
    let newPath = path.resolve(directoryPath,fd);
    let paths = await  readFiles(newPath);
    let secondDir = [];
    paths.length && paths.forEach(function(p){
        secondDir.push(path.resolve(newPath,p));
    });
    htmls = []; // 每次必须清空插入的数据
   // async getFiles返回的是一个promise,需要用then方法调用
    secondDir.length && getFiles(secondDir,fd).then(function(){
      insert(htmls, detail, 'pid');
    })
  }
}

// 读取文件的方法
async function getFiles(secondDir,type){
  let completePaths = [];
  secondDir.forEach(function(f){
    completePaths.push(path.resolve(__dirname,'file',f));
  });

  // 读取目录按照时间由小到大排序
  let pathAndTime= [];
  for(let i=0; i<completePaths.length; i++){
    let time = await fs.statSync(completePaths[i]);
    time = new Date(Date.parse(time.atime));
    pathAndTime.push({
      path :completePaths[i],
      time :time
    })
  }
  pathAndTime.sort(compare);

  // 异步读取文件的过程
  for(let i=0; i<pathAndTime.length; i++){
    let f = await marked( fs.readFileSync(pathAndTime[i].path, 'utf-8' ));
    htmls.push({
      pid  :  obj[type]+i,
      html :f,
      time :pathAndTime[i].time
    });
  }
}

// 比较函数
let compare = function(obj1, obj2){
  let d1 = obj1.time;
  let d2 = obj2.time;
  if(d1 < d2){
    return -1;
  }else if(d1 > d2){
    return 1;
  }else{
    return 0;
  }
};

readMainDir(directoryPath);








