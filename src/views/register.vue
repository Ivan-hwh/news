<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hminput
         type='text'
         placeholder='请输入用户名/手机'
         v-model="sql.username"
         :rules='/^1\d{10}$/'
         meg_err='用户名输入错误，请输入11位手机号'></hminput>
        <hminput type='password' placeholder='请输入密码' v-model="sql.password"></hminput>
        <hminput placeholder='请输入昵称' v-model="sql.nickname"></hminput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login" class="">去登录</a>
      </p>
      <hmbutton text='注册' @click="register"></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
import { userRegister } from '@/api/users.js'
export default {
  components: {
    hmbutton, hminput
  },
  data () {
    return {
      sql: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register () {
      let res = await userRegister(this.sql)
      console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册成功！')
        this.$router.push({ path: '/login' })
      } else {
        this.$toast.fail('注册失败' + '/n' + '请重试')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
  background-color: rgb(242,242,242);
  height: 100vh;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
