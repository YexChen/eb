var express = require('express');
var router = express.Router();
var Articles = require("../database/Articles")
var md5 = require("../utils/md5")
var Comments = require("../database/Comments")
var verify = require("./middlewares/verify")

router.post("/add",verify,function(req,res,next){
  /*
  @params author 作者id
  @params authorname 作者名字
  @params authoravatar 作者头像
  @params content 内容
  @params avatar 图片
  @params comments 评论数组
  */
  if(!res.userAvatar || !res.userid || !res.nickname){
    return res.json({
      code: '500',
      msg: '服务器在处理verify中间件时出现了问题!'
    })
  }
  if( !req.body.content || !req.body.title || !req.body.sum){
    return res.json({
      code: '408',
      msg: '提供的参数不足！'
    })
  }
  let params= {
    author: res.userid,
    authorname: res.nickname,
    authoravatar: res.userAvatar,
    title: req.body.title,
    sum: req.body.sum,
    content: req.body.content,
    comments: [],
    time: new Date()
  }

  //图片处理
  if(!req.files){
    return res.json({
      code: '400',
      msg: '没有上传图片文件'
    })
  }
  var randomNum = Math.floor(Math.random()*100000)
  var myFile = req.files.avatar
  var filename = req.body.title+randomNum
  var filepath = `public/images/${filename}.png`
  params.avatar= `http://localhost:5000/images/${filename}.png`
  myFile.mv(filepath,function(err){
    if(err)
      return res.json({
        code: '500',
        msg: '服务器图片上传失败',
        err
      })
  })
  //数据库交互
  Articles.add(params,function(err,doc){
    if(err){
      return res.json({
        code: '500',
        msg: '服务器添加失败'
      })
    }
    else if(doc != ''){
      return res.json({
        code: '0',
        msg: '文章发布成功！'
      })
    }
  })
})

router.post("/comment",verify,function(req,res,next){
  /*
  @params articleid 文章的id
  @params author 评论用户id
  @params authorname 评论用户昵称
  @params content 评论的内容
  @params-auto time 评论的时间
  @params-auto conversations 子评论数组
  */
  if(!res.userAvatar || !res.userid || !res.nickname){
    return res.json({
      code: '500',
      msg: '服务器在处理verify中间件时出现了问题!'
    })
  }
  if(!req.body.articleid || !req.body.content){
    return res.json({
      code: '408',
      msg: '缺少必要参数',
      params: req.body
    })
  }
  let params = {
    articleid: req.body.articleid,
    author: res.userid,
    authorname: res.nickname,
    authoravatar: res.userAvatar,
    content: req.body.content,
    time: new Date(),
    conversations: []
  }
  Comments.add(params,function(err,doc){
    if(err){
      return res.json({
        code: '500',
        msg: '服务器不能处理你的请求'
      })
    }
    if(doc){
      Articles.comment({articleid: params.articleid ,commentid:doc._id},function(err,doc){
        if(err){
          return res.json({
            code: '500',
            msg: '在添加评论时发生了错误'
          })
        }
        else{
          return res.json({
            code: '0',
            msg: '评论添加成功'
          })
        }
      })
    }
  })
})

router.post("/reply",verify,function(req,res,next){
  /*
  @params articleid 文章的id
  @params commentid 评论的id
  @params author 回复用户id
  @params-auto isauthor 回复用户是否为评论用户
  @params authorname 回复用户昵称
  @params content 回复的内容
  @params-auto time 回复的时间
  */
  if(!res.userAvatar || !res.userid || !res.nickname){
    return res.json({
      code: '500',
      msg: '服务器在处理verify中间件时出现了问题!'
    })
  }
  if(!req.body.commentid || !req.body.content){
    return res.json({
      status: '408',
      code: '缺少必要参数',
      params: req.body
    })
  }
  let params = {
    commentid: req.body.commentid,
    isauthor: req.body.commentid === res.userid,
    author: res.userid,
    authorname: res.nickname,
    authoravatar: res.userAvatar,
    content: req.body.content,
    time: new Date()
  }
  Comments.reply(params,function(err,doc){
    if(err){
      return res.json({
        status: '500',
        msg: '服务器无法处理楼中楼',
        err
      })
    }
    else{
      return res.json({
        status: '500',
        msg: '回复成功！'
      })
    }
  })
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<获取所有文章
router.get("/profile",function(req,res,next){
  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10
  let underIndex = (page-1)*10
  Articles.getallprofile(function(err,doc){
    if(err){
      return res.json({
        status: '500',
        msg: '服务器在获取文章时出现了问题'
      })
    }
    return res.json({
      status: '0',
      pages: Math.ceil(doc.length/10),
      doc: doc.splice(underIndex,pageSize)
    })
  })
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>获取文章详情
router.get('/detail',function(req,res,next){
  /*
  @params id 文章的id
  */
  if(!req.query.id){
    return res.json({
      code: '408',
      msg: '缺少必要参数'
    })
  }
  let params = {
    _id: req.query.id
  }
  Articles.findById(params,function(err,doc){
    if(err){
      return res.json({
        code: '500',
        msg: '服务器不能完成查找id的请求',
        err
      })
    }
    if(!doc || doc==''){
      return res.json({
        code: '408',
        msg: '未找到对应的文章表'
      })
    }
    doc.rcomments= []
    var promises = []
    for(var i =0;i< doc.comments.length;i++){
      var t = new Promise(function(resolve,reject){
        Comments.findById(doc.comments[i],function(err,doc){
            if(err){
              return res.json({
                code: '500',
                msg: '在联查数据表时出现了错误'
              })
            }
            resolve(doc)
        })
      })
      promises.push(t)
    }
    Promise.all(promises).then(function(values){
      doc.realComments= []
      for(var i=0;i<values.length;i++){
        if(values[i]!== undefined){
          doc.realComments.push(values[i])
        }
      }
      return res.json({
        status: '0',
        msg: '数据表查询成功!',
        doc,
        comments: values
      })
    }).catch(err=>{
      return res.json({
        status: '500',
        msg: '服务器出现了未知错误',
        err
      })
    })

  })
})

router.post("/update",verify,function(req,res,next){
  /*
  @params title 标题
  @params content 内容
  @params avatar 图片
  @params sum 摘要
  @params articleid 文章id
  */
  if(!res.userAvatar || !res.userid || !res.nickname){
    return res.json({
      code: '500',
      msg: '服务器在处理verify中间件时出现了问题!'
    })
  }
  if(!req.body.content || !req.body.title || !req.body.sum || !req.body.articleid){
    return res.json({
      code: '408',
      msg: '提供的参数不足！',
      params: req.body
    })
  }
  let params= {
    articleid: req.body.articleid,
    title: req.body.title,
    sum: req.body.sum,
    content: req.body.content
  }

  //图片处理-以后再做吧
  // if(req.files){
  //   var randomNum = Math.floor(Math.random()*100000)
  //   var myFile = req.files.avatar
  //   var filename = req.body.title+randomNum
  //   var filepath = `public/images/${filename}.png`
  //   params.avatar= `http://localhost:5000/images/${filename}.png`
  //   myFile.mv(filepath,function(err){
  //     if(err)
  //       return res.json({
  //         code: '500',
  //         msg: '服务器图片上传失败',
  //         err
  //       })
  //   })
  // }

  //数据库交互
  Articles.update({_id:params.articleid},{$set:{title: params.title,sum: params.sum,content: params.content}},function(err,doc){
    if(err){
      return res.json({
        code: '500',
        msg: '服务器添加失败'
      })
    }
    else if(doc != ''){
      return res.json({
        code: '0',
        msg: '文章更改成功！'
      })
    }
  })
})


module.exports= router
