<template>
  <div @click="$router.push(`/articleDetail/${post.id}`)">
    <div class="single" v-if="post.cover.length <= 2 && post.type === 1">
    <div class="left">
      <p class="content">{{ post.title }}</p>
      <p class="info">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <div class="single1" v-else-if="post.cover.length > 2 && post.type === 1">
    <div class="left">
      <p class="content">{{ post.title }}</p>
    </div>
    <div class="imgs">
      <img v-for="pic in post.cover" :key="pic.id" :src="pic.url" alt />
    </div>
    <p class="info">
      <span>{{ post.user.nickname }}</span>
      <span>{{ post.comment_length }}跟帖</span>
    </p>
  </div>
  <div class="single2" v-else-if="post.type === 2">
    <div class="left">
      <p class="content">{{ post.title }}</p>
    </div>
    <div class="video">
      <img :src="post.cover[0].url" alt />
      <div class="play">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{ post.user.nickname }}</span>
      <span>{{ post.comment_length }}跟帖</span>
    </p>
  </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="less" scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.info {
  font-size: 12px;
  padding: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.video {
    position: relative;
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
    .play{
      position:absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: rgba(0,0,0,0.1);
      width: 50*100vw/360;
      height: 50*100vw/360;
      border-radius: 25*100vw/360;
      box-shadow: 0px 0px 10px #fff;
      text-align: center;
      font-size: 50px;
      color: #fff;
      .van-icon{
        line-height: 50*100vw/360;
      }
    }

  }
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.single1,.single2{
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: column;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  flex-direction: column
}
.imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      width: 33.33%;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
</style>
