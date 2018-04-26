<template lang="html">
  <div class="blog">
    <blog-main></blog-main>
    <blog-comment></blog-comment>
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
        <router-link class= "aside-list" href="#" to="/">
          <li >
            <img src="@/assets/home.png" alt="" class= "aside-list-icon">
            <span class= "aside-list-text">回主页</span>
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
    <comment-model v-if= "showComment"></comment-model>
  </div>
</template>

<script>
import commentModel from '@/components/commentModel'
import blogMain from "@/components/blogMain"
import blogComment from "@/components/blogComment"
import maside from '@/components/maside'

import {mapGetters} from 'vuex'
export default {
  name: "blog",
  components: {
    blogMain,
    blogComment,
    maside,
    commentModel
  },
  computed: {
    ...mapGetters([
      'showSlide',
      'showComment'
    ])
  }
}
</script>

<style lang="sass">
.blog:after
  content: ''
  display: block
  clear: both
</style>
