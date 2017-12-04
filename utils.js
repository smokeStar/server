//---------- 数据库插入函数 v17.11.23 ----------------------------

function insert(modelData, model, id){     // 三个参数代表数据,模型,查找条件

  modelData.forEach(function(data,index){
    saveMongo(data,index);
  });

  function saveMongo(data,index){
    let pro = new Promise(function(resolve, reject){
      let condition = {};
      condition[id] = data[id];
      model.findOne(condition,function(err, res){
        if(err){
          reject(err);
        }else{
          if(res){
            resolve(res);
          }else{
            reject('未找到该条数据');
          }
        }
      })
    });
    pro.then(function(res){
      let condition = {};
      condition[id] = data[id];
      model.update( condition, data, {multi:true}, function(err, data){
        if(err){
          console.log(`Error 当更新第${index}数据的时候出错！`);
        }else{
          console.log('success update');
        }
      })
    },function(err){

      new model(data).save(function(err, res){
        if(err){
          console.log(`Error 当插入 第${index}数据的时候出错!`);
        }else{
          console.log('success insert!');
        }
      });
    });
  }
}

module.exports = insert;



