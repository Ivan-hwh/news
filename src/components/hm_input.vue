<template>
  <input
   :type="type"
   :placeholder="placeholder"
   :value="value"
   class="inp"
   @input="handlerInput"
   :class="{error:!statu,success:statu}"
   @blur='handlerBlur'
    >
</template>

<script>
export default {
  props: ['type', 'placeholder', 'value', 'rules', 'meg_err'],
  data () {
    return {
      statu: false
    }
  },
  mounted () {
    this.statu = !!this.value
  },
  methods: {
    // 响应文本框内容的变化
    handlerInput (event) {
      let value = event.target.value
      // 验证当前输入是否合法
      if (this.rules) {
        if (this.rules.test(value)) {
          this.statu = true
        } else {
          this.statu = false
        }
      } else {
        this.statu = !!value
      }

      this.$emit('input', value)
    },
    // 响应文本框失焦
    handlerBlur (event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        this.$toast.fail(this.meg_err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .inp{
        width: 318*100vw/360;
        height: 40*100vw/360;
        border: none;
        outline: none;
        border-bottom: 2px solid rgb(117,117,117);
        font-size: 18px;
        padding: 0 10px;
        margin: 5px 0;
        background-color: transparent;
    }
    .error{
        border-bottom-color:red;
    }
    .success{
        border-bottom-color:green;
    }
</style>
