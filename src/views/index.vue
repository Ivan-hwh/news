<template>
  <div class="index">
      <div class="indexHead">
          <span class="icon iconfont iconnew"></span>
          <div class="center">
              <van-icon name="search" />搜索新闻
          </div>
          <van-icon name="contact" class="icon" @click="jumpPersonal"/>
      </div>
      <van-tabs v-model="active" sticky swipeable animated>
        <van-tab :title="cate.name" v-for="(cate,index) in cateList" :key="index">
          <!-- 封装的新闻块组件调用 -->
          <van-list
            :immediate-check='false'
            :offset='10'
            v-model="cate.loading"
            :finished="cate.finished"
            finished-text="真的一滴都没有了"
            @load="onLoad"
            >
            <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <articleBlock :post='post' v-for="post in cate.postList" :key="post.id"></articleBlock>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
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
          pageSize: 5,
          loading: false,
          finished: false,
          isLoading: false
        }
      })
      this.getData()
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
      this.cateList[this.active].postList.push(...res1.data.data)
      // 重置loading 便于下次的上拉加载
      this.cateList[this.active].loading = false
      // 当新闻数据已全部加载完毕 重置finisher值为true
      if (res1.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      this.cateList[this.active].isLoading = false
    },
    // vant-list列表触发的加载事件
    onLoad () {
      this.cateList[this.active].pageIndex++
      setTimeout(() => {
        this.getData()
        this.$toast.success('加载成功')
      }, 3000)
    },
    // vant-pull-refresh触发的刷新事件
    onRefresh () {
      // 重置页码为1
      this.cateList[this.active].pageIndex = 1
      // 重置finished状态为false,不然在刷新之后 页面处于finished=true状态，无法加载后置页的新闻数据
      this.cateList[this.active].finished = false
      setTimeout(() => {
        // 在刷新加载新的新闻数据之前 清空原来的新闻数据
        this.cateList[this.active].postList.length = 0
        // 获取新的新闻数据
        this.getData()
        this.$toast.success('刷新成功')
      }, 2000)
    },
    // 点击图标跳转个人中心页面
    jumpPersonal () {
      this.$router.push({ path: `/personal/${localStorage.getItem('userId')}` })
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
