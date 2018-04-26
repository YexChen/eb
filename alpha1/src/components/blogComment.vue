<template lang="html">
  <div class="blog-commentarea">
    <ul class= "blog-comments">
      <li class= "blog-comment" v-for = "(comment,key,index) in comments">

        <div class="blog-comment-block">
          <div class="blog-comment-author">
            <div class="blog-author-left">
              <img :src="comment.authoravatar" alt="" class= "blog-author-avatar">
              <p class="blog-author-name"><span>{{comment.authorname}}</span>评论：</p>
            </div>
            <div class="blog-author-right">
              <span class="blog-author-time">{{comment.time}}</span>
            </div>
          </div>
          <div class="blog-comment-show">
            <p>
              {{comment.content}}
            </p>
          </div>
          <div class="blog-comment-bottom">
            <span class= "blog-comment-conversation">所有对话</span>
            <span class= "blog-comment-reply" @click= "myreply(comment._id)">回复</span>
          </div>
        </div>

        <div class="blog-comment-block blog-comment-block-reply" v-for= "conversation in comment.conversations">
          <div class="blog-comment-author">
            <div class="blog-author-left">
              <img :src="conversation.authoravatar" alt="" class= "blog-author-avatar">
              <p class="blog-author-name"><span>{{conversation.authorname}}</span>评论：</p>
            </div>
            <div class="blog-author-right">
              <span class="blog-author-time">{{conversation.time}}</span>
            </div>
          </div>
          <div class="blog-comment-show">
            <p>
              {{conversation.content}}
            </p>
          </div>
          <div class="blog-comment-bottom">
            <span class= "blog-comment-conversation">所有对话</span>
            <span class= "blog-comment-reply" @click= "myreply(comment._id)">回复</span>
          </div>
        </div>
      </li>

    </ul>
    <div class="blog-newcomment">
      <div class="blog-newcomment-textarea" contenteditable @keyup= "changeData('comment',$event)">

      </div>
      <a class="blog-newcomment-btn" @click = "newComment">评论</a>
    </div>
  </div>
</template>

<script>

import {mapActions} from 'vuex'
export default {
  data(){
    return {
      docs : {},
      comments : {},
      currentReplyId: '',
      form: {
        comment: ""
      }
    }
  },
  methods:{
    myreply(id){
      this.setCommentId(id)
      this.toggleComment()
    },
    changeData(dataname,$event){
      this.form[dataname] = $event.srcElement.innerHTML
    },
    newComment(){

      this.$http.get(`/blogapi/users/verify`).then(res=>{
        if(res.data.status!= '0'){
          alert("请登录后再评论")
          throw new Error("用户登录凭证不合法!")
        }
        console.log(res)
        this.$http.post(`/blogapi/article/comment`,{
          articleid: this.$route.params.id,
          author: res.data.userid,
          authoravatar: res.data.userAvatar,
          authorname: res.data.nickname,
          content: this.form["comment"]
        }).then(res=>{
          if(res.data.status= "0"){
            alert("评论成功!")
          }
        }).catch(err=>{
          console.log("an error happend:"+err)
        })
      }).catch(err=>{
        console.log("an error happend:"+err)
      })

    },
    ...mapActions([
      'toggleComment',
      'setCommentId'
    ])
  },
  mounted(){
    this.$http.get(`/blogapi/article/detail?id=${this.$route.params.id}`).then(res=>{
      if(res.data.status != '0'){
        alert("文章不存在!")
      }
      else{
        console.log(res)
        this.docs= res.data.doc,
        this.comments= res.data.comments
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style lang="sass">
.blog-commentarea
  width: 50rem
  margin: 0 auto
  .blog-comments
    .blog-comment
      margin: 0.9rem 0
      box-shadow: 0 1px 2px silver
      .blog-comment-block
        width: 100%
        background-color: white
        overflow: hidden
        &:after
          content: ''
          position: relative
          display: block
          margin: 0 auto
          width: 45.45rem
          border-bottom: 1px dashed rgb(142,142,142)
          clear: both
        &:last-child:after
          border: 0
        .blog-comment-author
          margin: 0 2rem
          margin-top: 1.1rem
          height: 2.3rem
          width: 45.45rem
          font-size: 14px
          .blog-author-left
            float: left
            .blog-author-avatar
              display: inline-block
              width: 2rem
              height: 2rem
              vertical-align: middle
            .blog-author-name
              display: inline-block
              vertical-align: middle
              margin-left: 0.9rem
          .blog-author-right
            float: right
            height: 2rem
            margin-left: .5rem
            .blog-author-time
              line-height: 2rem
              color: rgb(193,193,193)
        .blog-comment-show
          margin: 0 auto
          margin-top: .8rem
          width: 43.65rem
          height: auto
          padding: 0.95rem
          font-size: 14px
          background-color: rgb(248,248,248)
        .blog-comment-bottom
          margin-top: 1.5rem
          margin-bottom: .8rem
          height: 2.4rem
          float: right
          margin-right: 2.3rem
          .blog-comment-conversation
            padding-right: 1.6rem
            font-size: 14px
            color: rgb(38,147,241)
          .blog-comment-reply
            font-size: 18px
            color: white
            padding: 0.75rem 3rem
            border-radius: 0.1rem
            background-color: rgb(178,127,241)

.blog-comment-block-reply
  .blog-author-left
    float: right !important
  .blog-author-right
    float: left !important
  .blog-comment-reply
    background-color: rgb(132,163,255) !important
  .blog-comment-conversation
    display: none !important

.blog-newcomment
  margin-bottom: 1rem
  width: 100%
  background-color: white
  box-shadow: 0 1px 3px silver
  overflow: hidden
  .blog-newcomment-textarea
    margin: 0 auto
    margin-top: 1.6rem
    border: 1px solid rgb(211,211,211)
    width: 43.35rem
    min-height: 6.5rem
    padding: 0.95rem
    color: rgb(99,99,99)
    &:focus
      border: 1px solid #ECC4A1
  .blog-newcomment-btn
    float: right
    margin: 1rem 0
    margin-right: 2.3rem
    display: inline-block
    padding: 0.7rem 2.9rem
    color: white
    border-radius: 2px
    background-color: rgb(149,117,255)
</style>
