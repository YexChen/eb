<template lang="html">
  <div class="banner">
    <div class="banner-left">
      <a href="#">
        <div class="banner-background">
          <img src="@/assets/hxx1.png" alt="">
        </div>
        <div class="banner-bottom">
          <div class="banner-mask">
            <h3 class= "banner-mask-header">无良医生贩卖假药</h3>
            <p class= "banner-mask-inner">我去妖怪山转转，插插花，学学日文，不用操心，玩玩西瓜，偶尔也去太阳花田插插花</p>
          </div>
          <div class="banner-avatar">
            <img class= "avatar-img" src="@/assets/timg.jpeg" alt="">
            <span class= "avatar-name">雾雨梨花</span>
          </div>
        </div>
      </a>
    </div>
    <div class="banner-right">
      <a href="#">
        <div class="banner-background">
          <img src="@/assets/hxx2.jpg" alt="">
        </div>
        <div class="banner-bottom">
          <div class="banner-mask">
            <h3 class= "banner-mask-header">无良医生贩卖假药</h3>
            <p class= "banner-mask-inner">我去妖怪山上转转，插插花，学学日文，不用操心，玩玩西瓜，偶尔也去太阳花田插插花，巴拉巴拉</p>
          </div>
          <div class="banner-avatar">
            <img class= "avatar-img" src="@/assets/timg.jpeg" alt="">
            <span class= "avatar-name">雾雨梨花</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">
  .banner
    position: relative
    margin: 0 auto
    margin-bottom: 23px
    font-size: 0
    width: 56.4rem
    &:after
      content: ''
      display: block
      position: relative
      clear: both

  .banner-left
    position: relative
    display: inline-block
    margin-top: -4.9rem
    width: 23.2rem
    height: 18.4rem
    overflow: hidden
    box-shadow: 0 1px 4px silver

  .banner-right
    position: relative
    display: inline-block
    margin-top: -4.9rem
    margin-left: 1.8rem
    width: 30.9rem
    height: 18.3rem
    overflow: hidden
    box-shadow: 0 1px 4px silver

  .banner-background
    position: relative
    top: 0
    left: 0
    width: 100%
    height: 100%
    img
      height: 100%

  .banner-bottom
    position: absolute
    bottom: 0
    width: 100%
    height: 7.1rem
    text-align: left
    .banner-mask
      font-size: 14px
      width: 100%
      height: 4.3rem
      background-color: rgba(0,0,0,.75)
      color: rgb(248,248,248)
      overflow: hidden
      .banner-mask-header
        font-size: 16px
        margin-left: 2rem
        margin-top: 1rem
        margin-right: 2rem
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .banner-mask-inner
        margin-left: 2rem
        margin-top: 0.25rem
        margin-right: 2rem
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .banner-avatar
      width: 100%
      height: 2.9rem
      background-color: white
      .avatar-img
        margin-left: 1.9rem
        margin-right: 1.1rem
        display: inline-block
        width: 1.75rem
        height: 1.75rem
        vertical-align: middle
      .avatar-name
        display: inline-block
        vertical-align: middle
        line-height: 2.9rem
        font-size: 14px
        transform: translateY(2px)
        color: rgb(15,15,15)
</style>
