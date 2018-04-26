var Users = require('../../database/Users')

module.exports = function(req,res,next){
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
      res.userid = doc[0]._id
      res.userAvatar = doc[0].avatar
      res.nickname = doc[0].nickName
      next()
    }
  })
}
