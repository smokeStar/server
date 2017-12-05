//---------- 开启服务v17.11.23 ----------------------------

const fs         = require ('fs')
    , path       = require ('path')
    , express    = require ('express')
    , app        = express();


app.get('*', function(req, res){
  const html = fs.readFileSync('./index.html','utf-8');
  res.send(html);
});
var port_number = app.listen(process.env.PORT || 5000);
console.log('正在监听5000端口');