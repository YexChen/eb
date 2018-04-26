<template lang="html">
  <div class="model-mask">
    <div class="model">
      <div class="model-header">
        <h3>My Blog</h3>
      </div>
      <div class="model-input input-account">
        <img src="@/assets/phone.png" alt="">
        <input type="text" name="" value="" v-model= "user.account">
      </div>
      <div class="model-input input-password">
        <img src="@/assets/password.png" alt="">
        <input type="password" name="" value="" v-model= "user.password">
      </div>
      <a href="javascript:;" class= "model-btn model-login" @click= "login">登录</a>
      <a href="javascript:;" class= "model-btn model-regist">注册</a>
      <div class="model-quit" @click= "hideModel">
        <img src="@/assets/close.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'model',
  data(){
    return{
      user:{
        account: '',
        password: ''
      }
    }
  },
  methods: {
    hideModel(){
      this.toggleModel()
    },
    login(){
      this.$http.post('/blogapi/users/login',{
        username: this.user.account,
        password: this.user.password
      }).then(res=>{
        if(res.data.status=== '0'){
          let tpayload= {
            id: res.data.userid,
            nickName: res.data.username,
            userAvatar: res.data.userAvatar,
            isLogin: true
          }
          this.updateUser(tpayload)
          this.toggleModel()
          alert(res.data.msg)
        }
        else{
          alert(res.data.msg)
        }
      }).catch(err=>{
        console.log('an error has occured at:'+err)
      })
    },
    ...mapActions([
      'toggleModel',
      'updateUser'
    ])
  }
}
</script>

<style lang="sass">
.model-mask
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
    height: 2.7rem
    width: 14rem
    margin: 0 auto
    margin-top: 1.5rem
    border: 1px solid rgb(217,217,217)
    border-radius: 0.25rem
    img
      margin: 0 .7rem
      display: inline-block
      width: 1.5rem
      height: 1.5rem
      vertical-align: middle
    input
      width: 10.8rem
      height: 100%
      outline: none
      border: 0
      font-size: 18px
      background-color: rgb(250,250,250)
      color: rgb(111,111,111)

.model-btn
  display: inline-block
  margin: 0 3.5rem
  margin-top: 2rem
  padding: 0.75rem 6.1rem
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
