# node-rabbit-fun #

## 运行 ##

```
npm install

node server.js
```

## 流程 ##

### /rabbit/BaseInit ###

* 初始化 ** Mysql/MongoDB **

* 添加两个global函数：loadServices和loadModels

* 切换数据库是根据type来判断的，type = sql时，表示使用Mysql，否则为MongoDB

### /rabbit/ExpressInit ###

* 对Express做一些自定义，加入中间件操作

* 设置rainbow路由

* 设置全局的helper函数

### /rabbit/rainbow ###

* 映射/controllers下的所有文件，生成handler

* 根据生成的handler，实例化对应的BaseController

* 设置app的路由，把实例化得到的BaseController设成路由，形如 app.get('name', handler)

* 通过controller文件的名称来生成对应视图的文件路径，完成自动映射

### /rabbit/BaseModel ###

* 一些常用的数据库操作，同时加了简单地type来判断当前为那种类型的数据库

### /rabbit/BaseController ###

* 为controller添加filter处理

## 看法 ##

在使用Node.js开发web应用中，所谓的快速搭建web应用的框架的实质其实就是：按照一定的约定，一定的默认规则，层次确定的方式来组织代码，减少用户参与配置（包括路由配置），提供方便的接口，这就可以算作是一个框架了。我们可以在Express的基础上，做更多地封装，用约定来减少配置。

## 其它 ##

原地址：[Rabbitjs](https://github.com/xinyu198736/Rabbit.js)
