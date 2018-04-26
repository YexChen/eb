import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
  // 首页数据
  indexData: {
    currentPage: 1
  },
  // 显示评论模态框
  showComment: false,
  // 显示模态框
  showModel: false,
  // 显示侧边栏
  showSlide: false,
  // 用户信息
  user: {
    id: '',
    nickName: '',
    userAvatar: '',
    isLogin: false
  },
  // 当前评论id
  commentid: '',
  // 所有文章
  articleProfiles: []
}

const mutations = {
  [types.TOGGLEMODEL] (state) {
    state.showModel = !state.showModel
  },
  [types.UPDATEUSER] (state, payload) {
    state.user.id = payload.id
    state.user.nickName = payload.nickName
    state.user.userAvatar = payload.userAvatar
    state.user.isLogin = payload.isLogin
  },
  [types.TOGGLESLIDE] (state) {
    state.showSlide = !state.showSlide
  },
  [types.GETARTICLES] (state, payloads) {
    state.articleProfiles = payloads
  },
  [types.TOGGLECOMMENT] (state) {
    state.showComment = !state.showComment
  },
  [types.SETCOMMENTID] (state, id) {
    state.commentid = id
  },
  [types.CHANGEPAGE] (state, page) {
    if (page > 0 && page < Math.ceil(state.articleProfiles.length / 10) + 1) { state.indexData.currentPage = page }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
