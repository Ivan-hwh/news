// 这个文件用来处理users表相关的业务

import axios from '@/utils/myaxios.js'

// 处理用户登录业务
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 处理用户注册业务
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 获取用户详情
export const getUserInfo = (id) => {
  return axios({
    url: `/user/${id}`
  })
}

// 编辑用户信息
export const editUser = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: 'post',
    data
  })
}

// 关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注用户
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 用户关注列表
export const userFollows = () => {
  return axios({
    url: '/user_follows'
  })
}
