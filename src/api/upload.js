// 这个文件用来处理文件上传相关的业务

import axios from '@/utils/myaxios.js'

// 处理图片上传
export const imgUpload = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
