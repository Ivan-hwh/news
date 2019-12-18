// 这个文件用来处理文章相关的业务

import axios from '@/utils/myaxios.js'

export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 文章收藏
export const articleCollect = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 文章点赞
export const articleZan = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
