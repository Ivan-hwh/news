// 这个文件用来处理列表栏目相关的业务

import axios from '@/utils/myaxios.js'

export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
