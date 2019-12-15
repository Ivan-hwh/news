<template>
  <div class="btn" @click="handlerClick" :class="{green:text==='注册'}">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handlerClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
  .btn{
    width: 318*100vw/360;
    height: 48*100vw/360;
    line-height: 48*100vw/360;
    text-align: center;
    background-color: rgb(204,52,0,1);
    color: #fff;
    border-radius: 24*100vw/360;
    font-size: 18px;
  }
  .green{
    background-color: green;
  }
</style>
