let mongoose = require("mongoose")
let Schema = mongoose.Schema

let articleSchema = new Schema({
  author: String,
  authorname: String,
  authoravatar: String,
  title: String,
  sum: String,
  content: String,
  avatar: String,
  comments: Array,
  time: Date
})

articleSchema.static("add",function({author,authorname,authoravatar,title,sum,content,avatar,comments,time},callback){
  this.create({author,authorname,authoravatar,title,sum,content,avatar,comments,time},callback)
})

articleSchema.static("comment",function({articleid,commentid},callback){
  console.log(commentid)
  this.update({"_id":articleid},{"$push":{"comments":commentid}},callback)
})

articleSchema.static("getallprofile",function(callback){
  this.find({},callback)
})

let Article = mongoose.model('Articles',articleSchema)

module.exports = Article
