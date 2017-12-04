# Promise解决js回调嵌套

  Promise 是**ECMAScript6**的新语法,用于对于一个异步操作的最终完成的结果值的表示;通俗点讲呢就是,我给你一个承诺,你成了我就履行承诺,否则拒绝履行承诺!

## 语法

  创建一个Promise对象: `new Promise(function(resolve, reject){...});`

## 解析

  当新创建一个Promise 对象的时候,会初始化promise的状态为pending(初始状态);其回调函数中的参数resolve函数可以将pending状态改变成fulfilled(完成);reject函数可以将pending状态改变成rejected(失败)状态;

  1.Promise封装ajax请求:
    
    let pro = new Promise(function(resolve, reject){
        $.post("ajax/test.html", function(data,err) {
          if(!err){
             resolve(data);
          }else{
            reject(err);
          }
        });
    });
    
  接下来可以使用 `pro.then(function(data){...},function(err){...})`获得data数据; `pro.then()`中接受两个回调函数,第一个是Promise状态改变为fulfilled的时候调用,第二个回调函数是Promise状态改变为rejected的时候调用;当然还有`pro.catch()`方法,用于处理错误信息(比如找不到`ajax/test.html`)就会走`pro.catch()`方法.
  
  但是呢,以上代码使用promise似乎得不到任何好处,还增加了代码量,不禁一问promise的优势究竟在于何处?
  
  2.Promise 在回调嵌套中的优势:

    // 不用Promise处理回调的情况: 多个异步请求在一起，会出现嵌套深的情况，从而带来阅读和维护困难。
    $.get('xxx.com/getUserName',function(data){  
        $.get('xxx.com/getMobile',{user:data.userName},function(data){  
        });  
    });  
    // 使用Promise:
      // 第一部分 数据获取和加工阶段  
        var getUserName  = function(){  
            return new Promise(function(resolve,reject){  
                $.get('xxx.com/getUserName',function(data){  
                resolve(data);  
            });  
        };  
        var getMobile  = function(userName){  
            return new Promise(function(resolve,reject){  
                $.get('xxx.com/getUserMobile?user='+userName,function(data){  
                    resolve(data);  
                });  
            });  
        }  
        // 第二部分 业务逻辑部分  
        getUserName().then(function(userName){ return getMobile(userName);})
                     .then(function(mobile){...});  
    }  

## 总结

Promise的使用将数据处理和逻辑分开,解决了代码的层层嵌套的问题,增加了可读性.
    

  
  
  

   

    
