var express = require('express');
var router = express.Router();
var Users = require("../database/Users")
var md5 = require("../utils/md5")
var multer= require('multer')
var upload = multer({dest: 'uploads/'})

//======================================================>用户登录
router.post("/login",function(req,res){
  /*
  @params username 用户名
  @params password 密码
  */
  if(!req.body.username|| !req.body.password){
    console.log()
    return res.json({
      status: '412',
      msg: '缺少账号名或密码!'
    })
  }
  let params = {}
  params.username= req.body.username
  params.password= md5(req.body.password)
  console.log(params)
  Users.finds(params,(err,doc)=>{
    if(err) console.log(err)
    if(doc == ""){
      return res.json({
        status: '408',
        msg: '用户名或者密码错误'
      })
    }
    else{
      res.cookie("username",params.username,{maxAge: 1000*60*60*24})
      res.cookie("token",params.password,{maxAge: 1000*60*60*24})
      return res.json({
        status: '0',
        msg: "登陆成功",
        userid: doc[0]._id,
        userAvatar: doc[0].avatar,
        username: doc[0].nickName
      })
    }
  })
})

router.get("/verify",function(req,res,next){
  if(!req.cookies.username||!req.cookies.token){
    return res.json({
      status: '408',
      msg: "token不合法!"
    })
  }
  let params = {
    "username": req.cookies.username,
    "password": req.cookies.token
  }
  console.log(params)
  Users.finds(params,function(err,doc){
    if(err) console.log(err)
    if(doc == ""){
      return res.json({
        status: '408',
        msg: '用户的token有误'
      })
    }
    else{
      return res.json({
        status: '0',
        msg: "用户token验证成功",
        userid: doc[0]._id,
        userAvatar: doc[0].avatar,
        nickname: doc[0].nickName
      })
    }
  })

})

//======================================================>用户注册
// router.post("/regist",function(req,res){
//   /*
//   @params username 用户名
//   @params password 密码
//   */
//   if(!req.body.username|| !req.body.password){
//     console.log()
//     return res.json({
//       status: '412',
//       msg: '缺少账号名或密码!'
//     })
//   }
//   let params = {}
//   params.username= req.body.username
//   params.password= md5(req.body.password)
//   params.nickname= req.body.nickname
//
//   Users.regist(params,(err,doc)=>{
//     if(err) console.log(err)
//     if(doc == ""){
//       return res.json({
//         status: '408',
//         msg: '用户名或者密码错误',
//         doc
//       })
//     }
//     else{
//       return res.json({
//         status: '0',
//         msg: "注册成功",
//         doc
//       })
//     }
//   })
//
// })





module.exports = router;
