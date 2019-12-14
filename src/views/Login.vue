<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hminput
         type='text'
         placeholder='用户名/手机'
         v-model="sql.username"
         :rules='/^1\d{10}$/'
         meg_err='用户名输入错误，请输入11位手机号'></hminput>
        <hminput type='password' placeholder='密码' v-model="sql.password"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <hmbutton text='登录' @click="login"></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
import { userLogin } from '@/api/users.js'
export default {
  components: {
    hmbutton, hminput
  },
  data () {
    return {
      sql: {
        username: 'hwh',
        password: 123456
      }
    }
  },
  methods: {
    login (event) {
      userLogin(this.sql)
        .then(res => {
          console.log(res)
          if (res.data.message === '登录成功') {
            // 存储token值到本地存储
            // localStorage.clear()
            localStorage.setItem('news_token', res.data.data.token)
            console.log(localStorage)
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
            this.$toast.success('登录成功！')
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登录失败，请重试')
        })
    }
  }
}
</script>

<style lang="less" scoped>
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
