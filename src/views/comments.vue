<template>
<div class="comments">
  <myheader title='精彩跟帖'>
    <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
  </myheader>
  <div class="commentList">
    <div class="item" v-for="item in commentList" :key="item.id">
        <div class="head">
        <img :src="item.user.head_img" alt />
        <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
        </div>
          <span>回复</span>
    </div>
    <commentItem v-if="item.parent" :comments='item.parent'></commentItem>
    <div class="text">{{item.content}}</div>
    </div>
  </div>
</div>
</template>

<script>
import myheader from '@/components/hm_head.vue'
import { userComments } from '@/api/article.js'
import commentItem from '@/components/hm_comment_item.vue'
export default {
  components: {
    myheader, commentItem
  },
  data () {
    return {
      commentList: []
    }
  },
  async mounted () {
    let id = this.$route.params.id
    let res = await userComments(id, { pageSize: 28 })
    console.log(res)
    if (res.status === 200) {
      this.commentList = res.data.data.map((value) => {
        value.user.head_img = localStorage.getItem('serverUrl') + value.user.head_img
        return value
      })
    }
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
