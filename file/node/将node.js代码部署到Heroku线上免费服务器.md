# 将node部署到Heroku

## 一、线上数据库mlab

* 一般我们使用node.js编写服务器都会用到MongoDB数据库,但本地的数据库只能用于开发使用,所以在部署线上服务器之前,首先应该建立自己线上的MongoDB数据库.我使用的线上数据库是[mlab](https://mlab.com/),免费提供500M的使用空间,可以用邮箱申请;

![avatar](https://wenjianblog.herokuapp.com/mlab-1.png)

* 然后在选择crate new 按钮,我选择的是goole提供的free SADNBOX,一路continue,接着是填写数据库的名字(数据库名字很重要,以后会用的到),然后点击提交就可以了.这样就创建好了自己的数据库了.

* 然后我们就可以看到我们的数据库选项卡,有collection,user等等,在user里面自定义一个role作为系统管理员,记住密码,这个密码很重要哦.

* 最后是连接数据库,我使用的是mongoose连接数据库的方式,只需要把连接的地址换成 `mongodb://username:password.@ds127536.mlab.com:27536/sunpage`,其中username是你创建的那个role的user,password是role的密码,ds127536是你的数据库编号.

## 二、heroku线上服务器

* 第一步还是在[Heroku](https://dashboard.heroku.com/)注册账号,(tips:貌似qq邮箱用不了,我用的是google邮箱注册的),登陆成功以后,点击右上角的New创建新的app

* 填写你自己的app名称,create new app即可,然后我们需要通过github来上传我们的代码到Heroku,所以点击github那只小猫绑定你的github账号,并填写你的仓库名称.

* 绑定github成功以后,我们有两个选择来部署服务器Automatic deploys(自动部署) 和 Manual deploys(常规部署),这里选择常规部署,Deploy Branch即可;

* 这里需要说明一下在github仓库的代码的根目录中需要有一个Procfile文件,告诉Heroku服务器启动时应该做什么,代码可以写web: node index.js即可;还有一点要特别注意,必须在代码中定义端口app.set('port', process.env.PORT || 3000);然后这样监听端口app.listen(app.get('port'));
 
 
