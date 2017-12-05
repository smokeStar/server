//---------- 开启服务v17.11.23 ----------------------------

const api        = require ('./api')
    , fs         = require ('fs')
    , path       = require ('path')
    , bodyParser = require ('body-parser')

    , express    = require ('express')
    // , cors       = require('cors')
    , app        = express();

// 自定义中间件
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://192.168.2.132:8080','http://www.wenjian.group');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};

// 中间件的使用
app.use(allowCrossDomain);   // 允许跨域
app.use(bodyParser.json()); // 解析body数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
app.use(express.static(path.resolve(__dirname,'../dist')));

// app.get('*', function(req, res){
//   const html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf-8');
//   res.send(html);
// });
app.listen(5000);
console.log('listen 8088');
