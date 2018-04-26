<template lang="html">
  <header class="header">
    <div class="header-background" ref= "top">

    </div>
    <div class="header-fixed" :class="{'header-fixed-show': headerShow,'header-fixed-transparent': headerOpacity}"
    >
      <div class="header-icon-left icon-more" @click= "userPanel">

      </div>
      <div class="header-icon-right icon-user" @click= "userPanel">

      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: 'myHeader',
  data(){
    return {
      lastScroll: 0,
      // 变三种模式
      headerShow: false,
      headerOpacity: false
    }
  },
  methods:{
    listenScroll(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
      var scrollDirection = scrollTop> this.lastScroll ?"down":"up"
      if(scrollDirection === "up" && scrollTop> this.$refs.top.clientHeight){
        this.headerOpacity= false
        this.headerShow= true
      }
      else if(scrollTop< this.$refs.top.clientHeight){
        this.headerOpacity= true
        this.headerShow= false
      }
      else{
        this.headerOpacity= false
        this.headerShow= false
      }
      this.lastScroll = scrollTop
    },
    userPanel(){
      if(!this.user.isLogin){
        console.log(this.user.isLogin)
        this.toggleModel()
      }
      else{
        this.toggleSlide()
      }
    },
    ...mapActions([
      'toggleModel',
      'toggleSlide'
    ])
  },
  computed:{
    ...mapGetters([
      'user'
    ])
  },
  mounted(){
    window.addEventListener("scroll",this.listenScroll)
  }
}
</script>

<style lang="css">
:root{
  --main-color: rgb(187,129,255);
  --second-color: rgb(134,112,255);
}
</style>
<style lang="sass">

.header
  width: 100%
  height: 15.6rem
  .header-background
    position: relative
    width: 100%
    height: 100%
    background-image: linear-gradient(to bottom,var(--main-color),var(--second-color))
  .header-fixed
    transition: all 1s ease
    overflow: hidden
    position: fixed
    width: 100%
    height: 3rem
    top: -2.85rem
    left: 0
    background: linear-gradient(to bottom,var(--main-color),var(--second-color))
    z-index: 10
    .header-icon-left
      position: absolute
      left: 1.75rem
      top: 1rem
      width: 1rem
      height: 1rem
      cursor: pointer
    .header-icon-right
      position: absolute
      right: 1.75rem
      top: 1rem
      width: 1rem
      height: 1rem
      cursor: pointer
  .header-fixed-show
    top: 0
    box-shadow: 0 2px 3px rgb(66,66,66)
  .header-fixed-transparent
    top: 0
    background: transparent
</style>
