import * as types from './mutation-types'
import axios from 'axios'

export const toggleModel = ({commit}) => {
  commit(types.TOGGLEMODEL)
}

export const updateUser = ({commit}, payload) => {
  commit(types.UPDATEUSER, payload)
}

export const toggleSlide = ({commit}) => {
  commit(types.TOGGLESLIDE)
}

export const getArticles = ({commit}, payload) => {
  commit(types.GETARTICLES, payload)
}

export const toggleComment = ({commit}) => {
  commit(types.TOGGLECOMMENT)
}

export const setCommentId = ({commit}, payload) => {
  commit(types.SETCOMMENTID, payload)
}

export const changePage = ({commit}, payload) => {
  commit(types.CHANGEPAGE, payload)
}
