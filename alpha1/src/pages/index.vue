<template lang="html">
  <div class="index">
    <ibanner></ibanner>
    <iarticle></iarticle>
    <paging></paging>
    <transition name= "swipe">
      <maside  v-if= "showSlide">
        <router-link class= "aside-list" to="/management/publish">
          <li >
            <img src="@/assets/article.png" alt="" class= "aside-list-icon">
            <span class= "aside-list-text">新建文章</span>
          </li>
        </router-link>
        <router-link class= "aside-list" href="#" to="/management/view">
          <li >
            <img src="@/assets/edit1.png" alt="" class= "aside-list-icon">
            <span class= "aside-list-text">编辑文章</span>
          </li>
        </router-link>
        <div class="aside-footer" slot= "bottom">
          <a href="javascript:;">
            <img src="@/assets/config1.png" alt="" class= "aside-footer-icon">
            <span class= "aside-footer-text">更多设置</span>
          </a>
        </div>
      </maside>
    </transition>
  </div>
</template>

<script>
import iarticle from '@/components/iarticle'
import ibanner from '@/components/ibanner'
import paging from '@/components/paging'
import maside from '@/components/maside'

import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: 'index',
  components:{
    iarticle,
    ibanner,
    paging,
    maside
  },
  computed: {
    ...mapGetters([
      'showSlide'
    ])
  },
  methods: {
    ...mapActions([
      'getArticles'
    ])
  },
  mounted(){
    this.$http.get("/blogapi/article/allprofile").then(res=>{
      console.log(res)
      this.getArticles(res.data.doc)
    }).catch(err=>{
      console.log("an error happend:"+err)
    })
  }
}
</script>

<style lang="sass">
  .index
    width: 100%
    text-align: center
    &:after
      display: block
      position: absolute
      clear: both

</style>
