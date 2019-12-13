// 这个文件用来处理users表相关的业务

import axios from '@/utils/myaxios'

// 处理用户登录业务
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 获取用户详情
export const getUserInfo = (id) => {
  return axios({
    url: `/user/${id}`
  })
}
