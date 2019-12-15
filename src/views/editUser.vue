<template>
  <div class="editUser">
    <hmhead title="编辑资料">
      <span
        class="iconfont iconjiantou2"
        slot="left"
        @click="$router.back()"
      ></span>
      <span slot="right" @click="backToLogin">退出</span>
    </hmhead>
    <div class="headImg">
      <img alt :src="sql.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="sql.nickname" @click="nickshow = !nickshow"></hmcell>
    <van-dialog v-model="nickshow" title="昵称" show-cancel-button @confirm="editNick">
      <van-field required label="昵称" :value="sql.nickname" placeholder="请输入昵称" ref="nickname"/>
    </van-dialog>
    <hmcell title="密码" desc="******" @click="passshow = !passshow"></hmcell>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm="editPwd" :before-close="beforeClose">
      <van-field required label="原密码" placeholder="请输入原密码" ref="oldPwd"/>
      <van-field required label="新密码" placeholder="请输入新密码(3~16位)" ref="newPwd"/>
    </van-dialog>
    <hmcell title="性别" v-if="sql.gender === 1" desc="男" @click="showgender"></hmcell>
    <hmcell title="性别" v-if="sql.gender === 0" desc="女" @click="showgender"></hmcell>
    <van-popup v-model="gendershow">
        <van-picker show-toolbar title="性别" :columns="columns"
        @cancel="cancelEditGender" @confirm="editGender"/>
    </van-popup>
  </div>
</template>

<script>
import hmhead from '@/components/hm_head.vue'
import hmcell from '@/components/hm_cell.vue'
import { imgUpload } from '@/api/upload.js'
import { editUser, getUserInfo } from '@/api/users.js'
export default {
  data () {
    return {
      sql: {},
      id: '',
      nickshow: false,
      gendershow: false,
      columns: ['男', '女'],
      passshow: false
    }
  },
  // 组件注册
  components: {
    hmhead,
    hmcell
  },
  // 当页面组件加载完毕后加载的钩子函数
  async mounted () {
    this.id = this.$route.params.id
    // 获取用户信息详情
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      console.log(res)
      this.sql = res.data.data
      // 判断用户信息内是否有图片 没有给默认图 有就使用用户图片
      if (res.data.data.head_img) {
        this.sql.head_img =
          localStorage.getItem('serverUrl') + this.sql.head_img
      } else {
        this.sql.head_img =
          localStorage.getItem('serverUrl') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('用户信息获取失败')
    }
  },
  methods: {
    // 1.退出键功能
    backToLogin () {
      this.$toast.success('您已成功退出！')
      // 删除token凭证
      localStorage.removeItem('news_token')
      // localStorage.removeItem('serverUrl')
      // 返回登录页面
      window.location.href = '#/login'
    },
    // 2.上传文件(图片) 并 编辑修改用户的图片信息
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      let formdata = new FormData()
      formdata.append('file', file.file)
      // 调用上传文件api 传入参数formdata
      let res = await imgUpload(formdata)
      if (res.data.message === '文件上传成功') {
        // 当文件上传成功时 编辑修改用户的图片信息
        let res1 = await editUser(this.id, { head_img: res.data.data.url })
        if (res1.data.message === '修改成功') {
          this.$toast.success('图片修改成功！')
          // 更新图片信息
          this.sql.head_img =
            localStorage.getItem('serverUrl') + res1.data.data.head_img
        } else {
          this.$toast.fail('图片修改失败' + '\n' + '请重试！')
        }
      } else {
        this.$toast.fail('文件上传失败' + '\n' + '请重试！')
      }
    },
    // 3.修改昵称
    async editNick () {
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await editUser(this.id, { nickname })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功！')
        this.sql.nickname = res.data.data.nickname
      } else {
        this.$toast.success('修改昵称失败' + '\n' + '请重试！')
      }
    },
    // 4.弹出层组件的方法
    showgender () {
      this.gendershow = true
    },
    // 5.修改性别
    async editGender (value) {
      if (value === '女') {
        let res = await editUser(this.id, { gender: 0 })
        this.sql.gender = res.data.data.gender
      } else {
        let res = await editUser(this.id, { gender: 1 })
        this.sql.gender = res.data.data.gender
      }
      this.$toast.success('性别修改成功！')
      this.gendershow = false
    },
    // 6.取消修改性别
    cancelEditGender () {
      this.$toast.fail('您取消了操作')
      this.gendershow = false
    },
    // 7.修改密码
    async editPwd () {
      // 获取原密码
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      let password = this.$refs.newPwd.$refs.input.value
      console.log(oldPwd)
      // 判断输入的原密码是否匹配该用户的原密码
      if (oldPwd === this.sql.password) {
        // 判断新密码是否符合正则表达式的规则
        if (/\w{3,16}/.test(password)) {
          // 调用编辑用户信息方法 发送请求 进行修改密码操作
          let res = await editUser(this.id, { password })
          console.log(res)
          if (res.data.message === '修改成功') {
            this.$toast.success('密码修改成功')
            this.sql.password = res.data.data.password
            this.$router.push({ path: '/login' })
          } else {
            this.$toast.success('密码修改失败')
          }
        } else {
          this.$toast.fail('请输入' + '\n' + '3~16位密码')
        }
      } else {
        // 给出提示
        this.$toast.fail('原密码错误' + '\n' + '请重试')
      }
    },
    // 8.密码模态框关闭前的处理
    beforeClose (action, done) {
      // console.log(action)
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      let newPwd = this.$refs.newPwd.$refs.input.value
      if (action === 'confirm' && oldPwd !== this.sql.password) {
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(newPwd)) {
        done(false)
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.headImg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
/deep/.van-uploader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
/deep/.van-uploader__upload {
  margin: 0;
  padding: 0;
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
  border-radius: 50%;
}
</style>
