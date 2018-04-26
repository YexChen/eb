<template lang="html">
  <div class="paging">
    <img class="paging-left" src="@/assets/prev.png" alt="" @click= "changePage(currentPage-1)">
    <a v-for = "(page,key,index) in pages" href="javascript:;" @click= "changePage(page)">{{page}}</a>
    <img class="paging-right" src="@/assets/next.png" alt="" @click= "changePage(currentPage+1)">
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters([
      'pages',
      'currentPage'
    ])
  },
  methods:{
    ...mapActions([
      'changePage'
    ])
  }
}
</script>

<style lang="sass">
  .paging
    margin: 3rem auto
    background-color: rgb(248,248,248)
    .paging-left
      vertical-align: middle
      width: 1.5rem
      height: 1.5rem
      cursor: pointer
    .paging-right
      vertical-align: middle
      width: 1.5rem
      height: 1.5rem
      cursor: pointer
    a
      display: inline-block
      text-decoration: none
      margin: 0 0.5rem
      padding: 0.1rem 0.4rem
      border: 1px solid rgb(138,138,138)
      color: rgb(138,138,138)
      transform: translateY(0.1rem)
</style>
