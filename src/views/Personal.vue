<template>
   <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src=sql.head_img alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{sql.nickname}}
          </div>
          <div class="time">2019-12-14</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc='关注的用户'></hmcell>
    <hmcell title="我的跟帖" desc='跟帖/回复'></hmcell>
    <hmcell title="我的收藏" desc='文章/视频'></hmcell>
    <hmcell title="设置"></hmcell>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/users.js'
import hmcell from '@/components/hm_cell.vue'
export default {
  async mounted () {
    let id = this.$route.params.id
    let res = await getUserInfo(id)
    if (res.data.message === '获取成功') {
      this.sql = res.data.data
    } else {
      this.$toast.fail('用户信息获取失败')
    }
    // 获取图片数据并显示到页面
    if (res.data.data.head_img) {
      this.sql.head_img = localStorage.getItem('serverUrl') + res.data.data.head_img
    } else {
      this.sql.head_img = localStorage.getItem('serverUrl') + '/uploads/image/default.png'
    }
  },
  data () {
    return {
      sql: {}
    }
  },
  components: {
    hmcell
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
