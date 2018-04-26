<template lang="html">
  <main class= "blog-main">
    <div class="blog-banner">
      <img :src="doc.avatar" alt="" class= "blog-banner-image">
      <div class="blog-banner-mask">
        <p class= "blog-title">{{doc.title}}</p>
        <p class= "blog-time">{{doc.time}}</p>
      </div>
    </div>
    <div class="blog-body">
      <div class="blog-author">
        <img :src="doc.authoravatar" alt="" class= "blog-author-avatar">
        <span class= "blog-author-name">{{doc.authorname}}</span>
      </div>
      <div class="blog-sum">
        {{doc.sum}}
      </div>
      <div class="blog-body" v-html="mainText">
      </div>
    </div>
  </main>
</template>

<script>
import {marked} from '@/assets/marked.min.js'

export default {
  data(){
    return {
      doc : {},
      comment : {}
    }
  },
  computed:{
    mainText(){
      return marked(this.doc.content)
    }
  },
  mounted(){
    this.$http.get(`/blogapi/article/detail?id=${this.$route.params.id}`).then(res=>{
      if(res.data.status != '0'){
        alert("文章不存在!")
      }
      else{
        this.doc= res.data.doc,
        this.comment= res.data.comments
      }
    }).catch(err=>{

    })
  }
}
</script>

<style lang="sass">
.blog-main
  position: relative
  margin: 0 auto
  margin-bottom: 0.95rem
  width: 50rem
  background-color: white
  box-shadow: 0 1px 3px silver
  .blog-banner
    position: relative
    margin-top: -9.25rem
    width: 100%
    height: 21.5rem
    overflow: hidden
    .blog-banner-image
      width: 100%
    .blog-banner-mask
      position: absolute
      bottom: 0
      width: 100%
      height: 4rem
      background-color: rgba(0,0,0,.75)
      .blog-title
        margin-left: 1.5rem
        margin-top: 1.1rem
        font-size: 18px
        color: white
      .blog-time
        margin-left: 1.5rem
        margin-top: .4rem
        font-size: 14px
        color: rgb(206,206,206)

.blog-body
  width: 100%
  overflow: hidden
  margin-bottom: 1rem
  .blog-author
    height: 6rem
    width: 100%
    .blog-author-avatar
      display: inline-block
      width: 2.25rem
      height: 2.25rem
      margin-left: 2.9rem
      vertical-align: middle
    .blog-author-name
      font-size: 14px
      vertical-align: middle
      line-height: 6rem
  .blog-sum
    margin-bottom: 2.3rem
    margin-left: 1.7rem
    border-left: 0.2rem solid rgb(61,61,61)
    padding-left: 1.4rem
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    font-size: 16px
  .blog-body
    width: 47rem
    padding: 0px 1.5rem
    line-height: 2em
    text-indent: 2em
    h2
      font-weight: 500
      font-size: 24px
      text-indent: 0
    p
      font-size: 18px
</style>
