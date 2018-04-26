let mongoose = require("mongoose")
let Schema = mongoose.Schema

let userSchema = new Schema({
  username: String,
  nickName: String,
  avatar: String,
  password: String,
  favorites: Array
})

userSchema.static("finds",function({username,password},callback){
  this.find({"username": username,"password": password},callback)
})

userSchema.static("regist",function({username,password,nickname},callback){
  this.create({"username": username,"password": password,"nickName": nickname},callback)
})


let Users = mongoose.model('Users',userSchema)

module.exports = Users
