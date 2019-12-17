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
