import axios from 'axios'
import { Toast } from 'vant'

// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'
// 将基准地址存到本地存储
localStorage.setItem('serverUrl', axios.defaults.baseURL)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前对请求数据进行处理
  // console.log(config)
  // 拿到存储在本地的token
  let token = localStorage.getItem('news_token')
  // 如果存在token 将授权凭证以Authorization为键，token为值的方式一并请求发送到服务器
  if (token) {
    config.headers.Authorization = token
  }
  return config
},
function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 在响应数据之前对响应数据进行处理
  // 判断数据是否存在用户信息验证失败，若存在，给出提示并重定向至登录页面
  if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
    // 给出提示
    Toast.fail('您还没登录' + '\n' + '请先登录噢')
    // 重定向
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
