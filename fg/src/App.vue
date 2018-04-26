<template>
  <div id="app">
    <my-header> </my-header>
    <router-view/>
    <my-footer> </my-footer>
    <transition name= "fade">
      <model v-if= "showModel"></model>
    </transition>
  </div>
</template>

<script>
import myHeader from '@/components/myHeader'
import myFooter from '@/components/myFooter'
import maside from '@/components/maside'
import model from '@/components/model'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    myHeader,
    myFooter,
    maside,
    model
  },
  methods:{
    ...mapActions([
      'updateUser'
    ])
  },
  mounted(){
    this.$http.get(`/blogapi/users/verify`).then(res=>{
      if(res.data.status=== '0'){
        let payload= {
          id: res.data.userid,
          nickName: res.data.nickname,
          userAvatar: res.data.userAvatar,
          isLogin: true
        }
        this.updateUser(payload)
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  computed: {
    ...mapGetters([
      'showModel',
      'showSlide'
    ])
  }
}
</script>

<style lang= "sass">
*
  margin: 0
  padding: 0
  font-family: "微软雅黑"
html
  font-size: 20px
  background-color: rgb(248,248,248)
ul
  list-style: none
a
  text-decoration: none

.fade-enter-active, .fade-leave-active
  transition : opacity .5s

.fade-enter, .fade-leave-to
  opacity : 0

.swipe-enter-active, .swipe-leave-active
  transform: translateX(0)
  transition : all .5s ease

.swipe-enter, .swipe-leave-to
  transform: translateX(-14.7rem)
  opacity : 0
</style>
