//---------- 插入文章列表数据 v17.11.23 ----------------------------

const models      = require('./db');
let articleData   = require('./data');
const insert      = require('./utils');

let article = models.article;  // 文章的模型

insert(articleData, article,'id');





