<template lang="html">
  <main class= "article-blocks">
    <div class="article-block" v-for= "articleProfile in currentArticles">
      <router-link :to= "'/blog/'+articleProfile._id">
        <div class="article-background">
          <img :src="articleProfile.avatar" alt="">
        </div>
        <div class="article-bottom">
          <div class="article-mask">
            <h3 class= "article-mask-header">{{articleProfile.title}}</h3>
          </div>
          <div class="article-avatar">
            <p class= "article-avatar-profile">{{articleProfile.sum}}</p>
            <div class="avatar-block">
              <img class= "avatar-img" :src="articleProfile.authoravatar" alt="">
              <span class= "avatar-name">{{articleProfile.authorname}}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>

  </main>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'iarticle',
  computed:{
    ...mapGetters([
      'currentArticles',
      'articleProfiles'
    ])
  }
}
</script>

<style lang="sass">
  .article-blocks
    margin: 0 auto
    width: 56.4rem
    &:after
      content: ''
      position: relative
      display: block
      clear: both

  .article-block
    position: relative
    margin: 23px auto
    width: 100%
    height: 14.4rem
    overflow: hidden
    box-shadow: 0 1px 4px silver
    .article-background
      position: relative
      width: 100%
      img
        width: 100%
    .article-bottom
      position: absolute
      top: 7.6rem
      height: 6.75rem
      width: 100%
      text-align: left
      .article-mask
        position: relative
        height: 2.5rem
        color: rgb(248,248,248)
        background-color: rgba(0,0,0,.75)
        overflow: hidden
        .article-mask-header
          margin-left: 1.3rem
          margin-top: 0.1rem
          margin-right: 2rem
          overflow: hidden
          font-size: 16px
          line-height: 2.5rem
          text-overflow: ellipsis
          white-space: nowrap
      .article-avatar
        height: 4.3rem
        font-size: 14px
        background-color: white
        overflow: hidden
        color: rgb(15,15,15)
        .article-avatar-profile
          margin-left: 1.3rem
          margin-top: 0.9rem
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .avatar-block
          width: 100%
          height: 2.4rem
          .avatar-img
            vertical-align: middle
            display: inline-block
            margin-left: 2rem
            width: 1.75rem
            height: 1.75rem
          .avatar-name
            display: inline-block
            vertical-align: middle
            margin-left: 1rem
            line-height: 2.4rem
            transform: translateY(3px)

</style>
