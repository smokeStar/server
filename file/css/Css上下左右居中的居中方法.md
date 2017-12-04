# Css上下左右居中的居中方法

## 绝对定位元素的居中显示

    .test{
      width:100px;
      height:100px;
      position:absolute;
      left:50%; top:50%;
      margin-top:-50px;
      margin-left:-50px;
    }

这种方法有一个明显的弊端,必须知道元素的宽高,否则无法准确的调整位置,Css3中的transform可以很好的替代margin,代码如下:

    .test{
       width:100px;
       height:100px;
       position:absolute;
       left:50%; top:50%;
       transform:translate(-50%,-50%);//相对于自身的一半
    }
    
通过这种方法无需知道元素的尺寸,也可以完美实现居中!但是因为是Css3属性,存在一定的兼容问题,需要做兼容处理!

## margin:auto实现定位元素的居中:

     .test{
           width:100px;
           height:100px;
           position:absolute;
           left:0; top:0;right:0;bottom:0;
           margin:auto
        }

    

