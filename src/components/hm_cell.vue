<template>
  <div class="cell" @click="handlerClick">
      <div class="left">{{title}}</div>
      <div class="right">{{desc}}
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc'],
  methods: {
    handlerClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
    .cell{
      height: 50*100vw/360;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      margin: 0 15px;
      font-size: 18px;
      .right{
          font-size: 16px;
          color: #aaa;
      }
    }
</style>
