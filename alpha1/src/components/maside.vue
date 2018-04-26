<template lang="html">
  <aside class="aside" ref= "aside">
    <div class="aside-header">
      <img :src="'/blogapi'+user.userAvatar" alt="" class="aside-avatar">
      <span class="aside-name">{{user.nickName}}</span>
    </div>
    <div class="aside-body">
      <ul class= "aside-lists">
        <slot></slot>
      </ul>
    </div>
    <slot name= "bottom"></slot>
  </aside>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  mounted(){
    let userHeight= window.innerHeight
    this.$refs.aside.style.height= userHeight+ "px"
  },
  computed:{
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="sass">
.aside
  position: fixed
  height: 30.9rem
  width: 14.7rem
  top: 0
  left: 0
  background-image: linear-gradient(to left,rgb(252,252,252),white)
  box-sizing: 0px 1px 3px silver
  font-size: 18px
  text-align: left
  z-index: 10
  border-radius: 2px
  .aside-header
    width: 100%
    height: 5rem
    background-color: rgb(36,36,36)
    .aside-avatar
      display: inline-block
      width: 35px
      height: 35px
      margin-left: 2rem
      border-radius: 50%
      vertical-align: middle
    .aside-name
      display: inline-block
      margin-left: 0.9rem
      color: white
      vertical-align: middle
      line-height: 5rem
      transform: translateY(1px)

.aside-body
  width: 100%
  .aside-lists
    margin-top: 0.7rem
    .aside-list
      display: block
      padding: 0.7rem 0
      li
        .aside-list-icon
          display: inline-block
          margin-left: 2.15rem
          width: 1.5rem
          height: 1.5rem
          vertical-align: middle
        .aside-list-text
          display: inline-block
          margin-left: 1rem
          vertical-align: middle
          transform: translateY(1px)

.aside-footer
  position: absolute
  bottom: 0
  width: 100%
  height: 4rem
  background-color: rgb(36,36,36)
  .aside-footer-icon
    margin-left: 2.15rem
    display: inline-block
    width: 1.5rem
    height: 1.5rem
    vertical-align: middle
  .aside-footer-text
    margin-left: 0.75rem
    display: inline-block
    color: white
    line-height: 4rem
    vertical-align: middle
    transform: translateY(1px)
</style>
