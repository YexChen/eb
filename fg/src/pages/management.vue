<template lang="html">
  <div class="management">
    <router-view></router-view>
    <transition name= "swipe">
      <maside  v-if= "showSlide">
        <router-link class= "aside-list" to="/management/publish">
          <li >
            <img src="@/assets/write.png" alt="" class= "aside-list-icon">
            <span class= "aside-list-text">写文章</span>
          </li>
        </router-link>
        <router-link class= "aside-list" href="#" to="/management/view">
          <li >
            <img src="@/assets/view.png" alt="" class= "aside-list-icon">
            <span class= "aside-list-text">看文章</span>
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
  </div>
</template>

<script>
import maside from '@/components/maside'

import {mapGetters} from 'vuex'

export default {
  name: "management",
  components: {
    maside
  },
  computed: {
    ...mapGetters([
      'showSlide'
    ])
  }
}
</script>

<style lang="css">
</style>
