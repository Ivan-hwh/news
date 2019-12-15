<template>
  <div class="head">
      <span>
          <slot name="left"></slot>
      </span>
      <span class="center">{{title}}</span>
      <span>
          <slot name="right"></slot>
      </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
    .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50*100vw/360;
        padding: 0 15px;
        // margin: 15px 0 ;
        .center{
            font-weight: 700
        }
    }
</style>
