//---------- 数据模型 v17.11.23 ----------------------------

const mongoose = require ('mongoose');

// 登录数据模型
const loginSchema = mongoose.Schema({
  account :{ type:String },
  password:{ type:String }
});

// 文章详情模型
const detailSchema = mongoose.Schema({
  pid  : { type : Number },
  html : { type : String },
  time : { type : Object },
});

// 文章列表模型
const   articleData  = {
  id     : { type : Number },    // 文章id
  title  : { type : String },    // 文章标题
  date   : { type : String },    // 发表时间
  tag    : { type : Number },    // 标签
  des    : { type : String },    // 简短描述
  prise  : { type : Number },    // 点赞数量
  comment: { type : Number },    // 评论数量
  type   : { type : String }     // 文章类型
};
const articleSchema = mongoose.Schema( articleData );

// 数据库连接
mongoose.connect('mongodb://first:first@localhost:27017/login');
const db = mongoose.connection;

db.on('error',function(){
  console.log('connection error');
});
db.on('connected', function(){
  console.log('connect success');
});

const models = {
  login   : mongoose.model('Login'  , loginSchema  , 'login'  ),  // 登录数据login模型
  article : mongoose.model('Article', articleSchema, 'article'),  // 文章列表模型
  detail  : mongoose.model('Detail' , detailSchema , 'detail')    // 文章详情模型
};
module.exports = models;



