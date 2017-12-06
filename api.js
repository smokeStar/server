//---------- 接口 v17.11.23 ----------------------------

const models   = require('./db');
const express  = require('express');
const app      = express();
const session  = require ('express-session');
// const MongoStore = require('connect-mongo')(session);
let article    = models.article;
let detail     = models.detail;
let login      = models.login;

app.use(session({
  secret: 'sessiontest',          // 设置验签
  name:'wenjian',                 // 设置传到客户端的cookie的名称
  resave: false,
  saveUninitialized: false,
  cookie:{ maxAge: 1000*60*60*2 } // 设置超时时间两个小时
}));

// 请求拦截,判断是否登录
app.all('/*',function(req, res, next){
  let fullURL = req.originalUrl.split('/');
  if(!req.session.loginUser && fullURL[3].indexOf('getAccount') == -1 && fullURL[3].indexOf('createAccount')){
    res.send( {error:'timeout'} );
  }else{
    next();
  }
});

// 验证函数
function valid(obj){

  for(let k in obj){
    if(!obj[k]) return " can't be null ";  // 不能为空
  }

  let reg = new RegExp( /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if(!reg.test(obj['account'])) return "must be email!";   // 必须是email格式
}

// 定义创建账户的post接口
app.post('/api/login/createAccount', function(req, res){

  let obj = {
    account : req.body.account,
    password: req.body.password
  };
  if(valid(obj)){
    let datas = {};
    datas.message = valid(obj);
    datas.ok = false;
    return res.send(datas);
  }
  // 查询账户是否存在
  login.findOne({account:req.body.account},function(err, result){

    if(result){
      return res.send({ message:'This account is already register!', ok:false });
    }else{
      let newAccount = new login ({
        account : req.body.account,
        password: req.body.password

      }).save(function(err, data){
        if(err){
          return res.send({ message:err, ok:false });
        }
        else {
          return res.send({ message:'createAccount success!',logInfo:data, ok:true });
        }
      });
    }
  });

});

// 定义登录的get接口
app.get('/api/login/getAccount', function(req, res){

  let obj = {
    account  : req.query.account,
    password : req.query.password
  };
  if(valid(obj)){
    return res.send({ message:valid(obj), ok:false });
  }
    login.findOne({account:obj.account},function(err, result){
      if(result){
        if(obj.password != result.password){
          return res.send({ message: 'password maybe false!', ok:false });
        }else{
            // 设置session
            req.session.loginUser = {account:obj.account,password:obj.password};
            return res.send({ message: 'login success!',logInfo:result, ok:true });
        }
      }else{
        return res.send({ message: 'account Non-existent!', ok:false });
      }
    })

});


// 定义文章列表的接口
app.get('/api/article/description', function(req, res){
  let type =  req.query.type;

    if(type == 'All'){
      article.find({},function(err, art){
        if(!err){
          let datas = {};
          datas.data = art;
          datas.ok = true;
          datas.message = '';
          return res.send(datas);
        }
      })
    }else{
      article.find({type},function(err, art){
        if(!err){
          let datas = {};
          datas.data = art;
          datas.ok = true;
          datas.message = '';
          return res.send(datas);
        }
      })
    }

});

// 定义文章详情的接口
app.get('/api/article/detail', function(req, res){
  let id = req.query.id;
  if(!id) return res.send('no article!');
  detail.find({ pid:id },function(err, art){
    if(!err){
     res.send(art[0].html);
    }
  })
});




module.exports = app;


