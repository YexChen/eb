export const showModel = (state) => state.showModel

export const showSlide = (state) => state.showSlide

export const user = (state) => state.user

export const articleProfiles = (state) => state.articleProfiles

export const currentArticles = (state) => state.articleProfiles.slice((state.indexData.currentPage - 1) * 10, (state.indexData.currentPage * 10))

export const showComment = (state) => state.showComment

export const commentid = (state) => state.commentid

export const pages = (state) => Math.ceil(state.articleProfiles.length / 10)

export const currentPage = (state) => state.indexData.currentPage
