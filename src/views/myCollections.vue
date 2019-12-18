<template>
  <div class="collections">
      <myheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <articleBlock :post='item' v-for="item in collectList" :key="item.id"></articleBlock>
  </div>
</template>

<script>
import myheader from '@/components/hm_head.vue'
import articleBlock from '@/components/hm_articleBlock.vue'
import { userCollections } from '@/api/users.js'
export default {
  components: {
    myheader, articleBlock
  },
  data () {
    return {
      collectList: []
    }
  },
  async mounted () {
    let res = await userCollections()
    // console.log(res)
    if (res.status === 200) {
      this.collectList = res.data.data.map((value) => {
        value.user.head_img = localStorage.getItem('serverUrl') + value.user.head_img
        return value
      })
    }
  }
}
</script>

<style>

</style>
