<template lang="html">
  <div class="publish">
    <div class="publish-body">
      <div class="publish-write">
        <div class="publish-write-block">
          <span class= "publish-write-title ">标题</span>
          <div class="publish-write-edit publish-write-single" contenteditable="plaintext-only" @keyup= "changeData('title',$event)" ref="title">
          </div>
        </div>
        <div class="publish-write-block">
          <span class= "publish-write-title ">摘要</span>
          <div class="publish-write-edit publish-write-single" contenteditable="plaintext-only" @keyup= "changeData('sum',$event)" ref="sum">
          </div>
        </div>
        <div class="publish-write-block">
          <span class= "publish-write-title ">正文</span>
          <div class="publish-write-edit publish-write-multiple" contenteditable="plaintext-only" @keyup= "changeData('main',$event)" ref="main">
          </div>
        </div>
        <div class="publish-write-btns">
          <label href="javascript:;" class= "publish-write-addimage"><input type="file" class= "display-none" ref= "image">添加图片</label>
          <a href="javascript:;" class= "publish-write-publish" @click= "postForm">发布</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'mEdit',
  data(){
    return{
      form: {
        title: '',
        sum: '',
        main: ''
      }
    }
  },
  methods:{
    changeData(dataname,$event){
      this.form[dataname] = $event.srcElement.innerHTML
    },
    postForm(){
      let form = new FormData()
      form.append('title',this.$refs.title.innerHTML)
      form.append('sum',this.$refs.sum.innerHTML)
      form.append('content',this.$refs.main.innerHTML)
      form.append('articleid',this.$route.params.id)      // for (var key of form.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }
      this.$http.post("/blogapi/article/update",form).then(res=>{
        console.log(res)
        if(res.data.code== '0'){
          alert(res.data.msg)
          this.$router.push(`/blog/${this.$route.params.id}`)
        }
        else{
          alert(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted(){
    this.$http.get('/blogapi/users/verify').then(res=>{
      if(res.data.status !== '0') this.$router.push("/")
    })
    this.$http.get(`/blogapi/article/detail?id=${this.$route.params.id}`).then(res=>{
      console.log(res)
      if(res.data.status != '0'){
        alert('文章没有找到!')
        this.$router.push("/management/view")
      }
      this.$refs.title.innerHTML = res.data.doc.title
      this.$refs.sum.innerHTML = res.data.doc.sum
      this.$refs.main.innerHTML = res.data.doc.content
    })
    console.log(this.$route.params.id)
  }
}
</script>

<style lang="sass">
  .publish-body
    position: relative
    width: 100%
    .publish-write
      position: relative
      margin: 0 auto
      margin-top: -6.9rem
      margin-bottom: 2rem
      width: 43.7rem
      background-color: white
      box-shadow: 0 1px 3px silver
      border-radius: 6px
      overflow: hidden
      .publish-write-block
        position: relative
        margin: 0 auto
        margin-top: 3.6rem
        width: 36rem
        .publish-write-title
          position: absolute
          left: .1rem
          top: 1rem
        .publish-write-edit
          margin-left: 4rem
          width: 31.1rem
          min-height: 3.3rem
          border: 1px solid rgb(205,205,205)
          border-radius: .3rem
          text-indent: 2em
          color: rgb(66,66,66)
          outline: none
          -webkit-user-modify: read-write-plaintext-only
          user-modify: read-write-plaintext-only
          &:focus
            border: 1px solid #ECC4A1
        .publish-write-single
          line-height: 3.3rem
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .publish-write-multiple
          padding: 1rem 1rem
          min-height: 36.5rem
      .publish-write-btns
        margin-top: 2.7rem
        margin-left: 20.5rem
        margin-bottom: 2rem
        color: white
        .publish-write-addimage
          padding: .8rem 2.1rem
          background-color: rgb(212,77,224)
          border-radius: 2px
          font-size: 18px
          color: white
          cursor: pointer
        .publish-write-publish
          margin-left: 2.6rem
          padding: .8rem 2.9rem
          background-color: rgb(178,127,241)
          border-radius: 2px
          font-size: 18px
          color: white
          cursor: pointer
</style>
