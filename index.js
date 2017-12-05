//---------- 开启服务v17.11.23 ----------------------------

const fs         = require ('fs')
    , path       = require ('path')
    , express    = require ('express')
    , app        = express();


app.get('*', function(req, res){
  const html = fs.readFileSync('./index.html','utf-8');
  res.send(html);
});
app.listen(8088);
console.log('listen 8088');
