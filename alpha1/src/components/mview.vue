<template lang="html">
  <div class="view">
    <ul class="view-table">
      <div class="table-header">
        <span class="table-header-name">文章名称</span>
        <span class= "table-header-time">时间</span>
        <span class= "table-header-sum">摘要</span>
        <span class= "table-header-author">作者</span>
      </div>
      <router-link v-for= "(articleProfile,key,index) in articleProfiles" :to= "'/management/edit/'+articleProfile._id">
        <li class="table-row">
          <span class= "table-row-no">{{index}}</span>
          <span class= "table-row-name">{{articleProfile.content}}</span>
          <span class= "table-row-time">{{articleProfile.time}}</span>
          <span class= "table-row-sum">{{articleProfile.sum}}</span>
          <span class= "table-row-author">{{articleProfile.authorname}}</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'mview',
  methods:{
    ...mapActions([
      'getArticles'
    ])
  },
  computed:{
    ...mapGetters([
      'articleProfiles'
    ])
  },
  mounted(){
    this.$http.get('/blogapi/users/verify').then(res=>{
      if(res.data.status !== '0') this.$router.push("/")
    })
    this.$http.get("/blogapi/article/allprofile").then(res=>{
      this.getArticles(res.data.doc)
    }).catch(err=>{
      console.log("an error happend:"+err)
    })
  }
}
</script>

<style lang="sass">
  .view
    position: relative
    margin: 0 auto
    margin-top: -6.2rem
    margin-bottom: 5rem
    width: 57.8rem
    min-height: 66.1rem
    background-color: white
    box-shadow: 0 1px 3px silver
    border-radius: 0.3rem
    .view-table
      margin: 0 auto
      width: 47.6rem
      overflow: hidden
      .table-header
        margin-top: 5.25rem
        margin-bottom: 3rem
        &:after
          content: ''
          display: block
          clear: both
        span
          float: left
          font-size: 2.4rem
          color: rgb(129,161,250)
          text-align: center
        .table-header-name
          width: 14rem
        .table-header-time
          width: 11rem
        .table-header-sum
          width: 10rem
        .table-header-author
          width: 12rem
      .table-row
        margin: 2rem 0
        &:after
          content: ''
          display: block
          clear: both
        span
          float: left
          font-size: 1.2rem
          color: rgb(129,161,250)
          text-align: center
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          vertical-align: middle
        .table-row-no
          width: 2rem
          transform: translateY(3px)
        .table-row-name
          width: 14rem
        .table-row-time
          width: 8rem
        .table-row-sum
          width: 11.5rem
        .table-row-author
          width: 10.5rem
</style>
