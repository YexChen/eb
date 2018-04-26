let mongoose = require("mongoose")
let Schema = mongoose.Schema

let commentSchema = new Schema({
  articleid: String,
  author: String,
  authorname: String,
  authoravatar: String,
  content: String,
  time: Date,
  conversations: [{
    isauthor: Boolean,
    author: String,
    authoravatar: String,
    content: String,
    authorname: String,
    time: Date
  }]
})

commentSchema.static("add",function({articleid,author,authorname,authoravatar,content,time,conversations},callback){
  this.create({articleid,author,authorname,authoravatar,content,time,conversations},callback)
})

commentSchema.static("reply",function({commentid,author,isauthor,authorname,authoravatar,content,time},callback){
  this.update({"_id":commentid},{"$push":{"conversations":{commentid,author,isauthor,authorname,authoravatar,content,time}}},callback)
})

let Comments = mongoose.model('Comments',commentSchema)

module.exports = Comments
