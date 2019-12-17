<template>
  <div class="index">
      <div class="indexHead">
          <span class="icon iconfont iconnew"></span>
          <div class="center">
              <van-icon name="search" />搜索新闻
          </div>
          <van-icon name="contact" class="icon"/>
      </div>
      <van-tabs v-model="active" sticky swipeable animated>
        <van-tab :title="cate.name" v-for="(cate,index) in cateList" :key="index">
          <articleBlock :post='post' v-for="post in cate.postList" :key="post.id"></articleBlock>
        </van-tab>
      </van-tabs>
      <div class="indexContent">

      </div>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getPostList } from '@/api/article.js'
import articleBlock from '@/components/hm_articleBlock'
export default {
  data () {
    return {
      active: localStorage.getItem('news_token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.getData()
      }
    }
  },
  components: {
    articleBlock
  },
  async mounted () {
    let res = await getCateList()
    // console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [],
          pageIndex: 1,
          pageSize: 5

        }
      })
      this.getData()
      //   console.log(this.cateList)
    }
  },
  methods: {
    async getData () {
      let res1 = await getPostList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      // console.log(res1)
      // 将当前激活的栏目中需要渲染到页面的数据内容保存到postList中
      this.cateList[this.active].postList = res1.data.data
      console.log(this.cateList[this.active].postList)
    }
  }
}
</script>

<style lang='less' scoped>
.index{
    .indexHead{
        height: 50*100vw/360;
        display: flex;
        justify-content: space-between;
        background-color: red;
        align-items: center;
        color: #fff;
        font-size: 18px;
        padding: 0 20px;
        .icon{
            font-size: 24px;
            margin: 0 10px;
        }
        .iconnew{
            font-size: 60px
        }
        .center{
            flex: 1;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 15px;
            background-color: #f97979;
        }
    }
}
</style>
