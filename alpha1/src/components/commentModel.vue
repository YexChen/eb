<template lang="html">
  <div class="model-mask-comment">
    <div class="model">
      <div class="model-header">
        <h3>评论</h3>
      </div>
      <div class="model-input">
        <textarea type="text" name="" value="" v-model= "form.content">
        </textarea>
        <a href="javascript:;" class= "model-btn model-login" @click = "newReply">回复</a>
      </div>
      <div class="model-quit" @click= "toggleComment">
        <img src="@/assets/close.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'model',
  data(){
    return{
      form:{
        content: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleComment'
    ]),
    newReply(){
      this.$http.get(`/blogapi/users/verify`).then(res=>{
        if(res.data.status!= '0'){
          alert("请登录后再评论")
          throw new Error("用户登录凭证不合法!")
        }
        console.log(res)
        this.$http.post(`/blogapi/article/reply`,{
          commentid: this.commentid,
          author: res.data.userid,
          authoravatar: res.data.userAvatar,
          authorname: res.data.nickname,
          content: this.form.content
        }).then(res=>{
          console.log(res)
          if(res.data.status= "0"){
            alert("回复成功!")
          }
        }).catch(err=>{
          console.log("an error happend:"+err)
        })
      }).catch(err=>{
        console.log("an error happend:"+err)
      })
    }
  },
  computed:{
    ...mapGetters([
      'commentid'
    ])
  }
}
</script>

<style lang="sass">
.model-mask-comment
  position: fixed
  top: 0
  left: 0
  width: 100rem
  height: 100rem
  background-color: rgba(0,0,0,.6)
  z-index: 10
.model
  position: fixed
  top: 50%
  left: 50%
  width: 21.25rem
  height: 24.35rem
  border-radius: 0.25rem
  background-color: rgb(246,246,246)
  transform: translateX(-50%) translateY(-50%)
  .model-header
    margin-top: 2.4rem
    text-align: center
    font-size: 30px
    color: rgb(0,128,255)
    h3
      font-family: Helvetica
      font-weight: 500
  .model-input
    position: relative
    height: 10rem
    width: 14rem
    margin: 0 auto
    margin-top: 1.5rem
    border: 1px solid rgb(217,217,217)
    border-radius: 0.25rem
    textarea
      width: 12rem
      height: 10rem
      padding: 0 1rem
      outline: none
      border: 0
      font-size: 18px
      background-color: rgb(250,250,250)
      color: rgb(111,111,111)

.model-btn
  display: inline-block
  margin: 0 0
  margin-top: 2rem
  padding: 0.75rem 6rem
  border-radius: 0.25rem
  color: white

.model-login
  background-color: rgb(93,96,241)

.model-regist
  margin-top: 1.1rem
  background-color: rgb(170,103,241)

.model-quit
  position: absolute
  top: .8rem
  right: .8rem
  width: 1rem
  height: 1rem
  cursor: pointer
  img
    width: 100%
    height: 100%
</style>
