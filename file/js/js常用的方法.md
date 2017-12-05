# js常用的方法

## 数组的操作方法

1) shift:删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 

     var a = [1,2,3,4,5];   
     var b = a.shift(); //a:[2,3,4,5] b:1  


2) unshift:将参数添加到原数组开头，并返回数组的长度 

     var a = [1,2,3,4,5];   
     var b = a.unshift(-2,-1); //a:[-2,-1,1,2,3,4,5] b:7   


3) pop:删除原数组最后一项，并返回删除元素的值；如果数组为空则返回undefined 

     var a = [1,2,3,4,5];   
     var b = a.pop(); //a:[1,2,3,4] b:5  


4) push:将参数添加到原数组末尾，并返回数组的长度 

     var a = [1,2,3,4,5];   
     var b = a.push(6,7); //a:[1,2,3,4,5,6,7] b:7  


5) concat:返回一个新数组，是将参数添加到原数组中构成的 

     var a = [1,2,3,4,5];   
     var b = a.concat(6,7); //a:[1,2,3,4,5] b:[1,2,3,4,5,6,7]  


6)  splice(start,deleteCount,val1,val2,...):从start位置开始删除deleteCount项，并从该位置起插入val1,val2,... 

     var a = [1,2,3,4,5];   
     var b = a.splice(2,2,7,8,9); //a:[1,2,7,8,9,5] b:[3,4]   
     var b = a.splice(0,1); //同shift   
     a.splice(0,0,-2,-1); var b = a.length; //同unshift   
     var b = a.splice(a.length-1,1); //同pop   
     a.splice(a.length,0,6,7); var b = a.length; //同push  


7) reverse:将数组反序 

    var a = [1,2,3,4,5];   
    var b = a.reverse(); //a:[5,4,3,2,1] b:[5,4,3,2,1]  


8) sort(orderfunction):按指定的参数对数组进行排序 

    var a = [1,2,3,4,5];   
    var b = a.sort(); //a:[1,2,3,4,5] b:[1,2,3,4,5]  


9) slice(start,end):返回从原数组中指定开始下标到结束下标之间的项组成的新数组 

    var a = [1,2,3,4,5];   
    var b = a.slice(2,5); //a:[1,2,3,4,5] b:[3,4,5]  


10) join(separator):将数组的元素组起一个字符串，以separator为分隔符，省略的话则用默认用逗号为分隔符 

    var a = [1,2,3,4,5];   
    var b = a.join("|"); //a:[1,2,3,4,5] b:"1|2|3|4|5"
    
11) indexOf():

    let arr = ['orange', '2016', '2016'];
  
    arr.indexOf('orange'); //0
    arr.indexOf('o'); //-1
     
    arr.indexOf('2016'); //1
    arr.indexOf(2016); //-1
    
     arr.indexOf(‘orange') 输出 0 因为 ‘orange' 是数组的第 0 个元素，匹配到并返回下标。
     arr.indexOf(‘o') 输出 -1 因为此方法不会在每一个元素的基础上再次执行 indexOf 匹配。
     arr.indexOf(‘2016') 输出 1 因为此方法从头匹配直到匹配到时返回第一个数组元素的下表，而不是返回全部匹配的下标。
     arr.indexOf(2016) 输出 -1 注意：这里不会做隐式类型转换。
    
## 字符串的常用操作方法

1) indexOf()，它从字符串的开头开始查找，找到返回对应坐标，找不到返回-1。如下：
  
    var myStr = "I,Love,you,Do,you,love,me";
    var index = myStr.indexOf("you"); // 7 ,基于0开始,找不到返回-1
    
2) substring():切割字符串
   
    var myStr = "I,love,you,Do,you,love,me";
    var subStr = myStr.substring(1,5); //",lov"
    
3)parseInt()
