<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followThisUser" :class="{red:artContent.has_follow}">
          {{artContent.has_follow?'已关注':'关注'}}
      </span>
    </div>
    <div class="detail">
      <div class="title">{{artContent.title}}</div>
      <div class="desc">
        <span>{{artContent.user && artContent.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-12-17</span>
      </div>
      <div class="content" v-if="artContent.type === 1" v-html="artContent.content ">
      </div>
        <video v-if="artContent.type === 2" :src='artContent.content' controls autoplay
        poster='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576598144710&di=d823c6c8125cc6cd4fbcbfa91b330878&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fc_fill%2Cw_600%2Ch_300%2Cg_faces%2Fimages%2F20190410%2F0e4f347bc8a142c3a223f4937818e992.jpeg'></video>
      <div class="opt">
        <span class="like" @click="likeThisArticle" :class="{active:artContent.has_like}">
          <van-icon name="good-job-o" />{{artContent.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, articleZan } from '@/api/article.js'
import { followUser, unFollowUser } from '@/api/users.js'
export default {
  async mounted () {
    let id = this.$route.params.id
    let res = await getArticleDetail(id)
    if (res.status === 200) {
      this.artContent = res.data.data
    }
    // console.log(res)
    // 根据id获取文章的详情，实现文章详情的动态渲染
  },
  data () {
    return {
      artContent: {}
    }
  },
  methods: {
    // 关注和取消关注
    async followThisUser () {
      let res
      if (!this.artContent.has_follow) {
        res = await followUser(this.artContent.user.id)
      } else {
        res = await unFollowUser(this.artContent.user.id)
      }
      this.$toast.success(res.data.message)
      this.artContent.has_follow = !this.artContent.has_follow
    },
    // 点赞和取消点赞
    async likeThisArticle () {
      let res = await articleZan(this.artContent.id)
      // console.log(res)
      if (res.data.message === '点赞成功') {
        this.artContent.like_length++
      } else if (res.data.message === '取消成功') {
        this.artContent.like_length--
      }
      this.$toast.success(res.data.message)
      this.artContent.has_like = !this.artContent.has_like
    }
  }
}
</script>

<style lang='less' scoped>
/deep/.photo{
    img{
        display: block;
        width: 100%;
    }
}
video{
    width: 100%;
    margin-bottom: 10px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    // background-color: #f00;
    color: #000;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.red{
        color: #fff;
        background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.active {
  color: red;
  border: 1px solid red!important
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
