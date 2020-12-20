<template>
  <div class="weather-dialog" :class="showClass">
    <div class="dialog-cover" @click="closeDialog"></div>
    <div class="dialog-box">
      <h3 class="dialog-title" :style="{backgroundColor: dialogBgColor}">{{dialogTitle}}</h3>
      <p class="dialog-text">{{dialogInfo}}</p>
      <button class="btn-close" @click="closeDialog" :style="{backgroundColor: dialogBgColor}">{{btnText}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'weather-dialog',
  props: {
    // 显示弹窗
    showDialog: {
      type: Boolean,
      default: false
    },
    // 按钮颜色标题颜色
    dialogBgColor: {
      type: String,
      default: '#7da0ec'
    },
    // 传入标题
    dialogTitle: {
      type: String,
      default: '自定义标题'
    },
    // 按钮文字
    btnText: {
      type: String,
      default: '我知道了'
    },
    // 主体内容
    dialogInfo: {
      type: String
    }
  },
  computed: {
    showClass () {
      if (this.showDialog === true) {
        return 'show'
      } else {
        return 'hide'
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style lang="stylus" scoped>
.weather-dialog
  text-align center
  .dialog-cover
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color: rgba(0,0,0,.43)
    z-index 999
    display none
    backdrop-filter blur(2px)
  .dialog-box
    border-radius 8px
    background #fff
    padding-bottom 20px
    position fixed
    width 250px
    left 50%
    top 50%
    margin-left -125px
    z-index: 1000
    visibility hidden
    transform translateY(-40%)
    opacity 0
    transition all .3s ease
    .dialog-title
      height 58px
      line-height 58px
      font-size 20px
      color #fff
      border-top-right-radius 8px
      border-top-left-radius 8px
    .dialog-text
      font-size 14px
      color #333
      line-height 22px
      padding 26px 20px 20px
      text-align left
    .btn-close
      width 200px
      height 40px
      line-height 40px
      border-radius 6px
      font-size 16px
      color #fff
      border none
.weather-dialog.show
  .dialog-cover
    display block
  .dialog-box
    visibility visible
    transform translateY(-50%)
    opacity 1
    margin-top -5%
.weather-dialog.hide
  .dialog-cover
    display none
  .dialog-box
    visibility hidden
</style>
