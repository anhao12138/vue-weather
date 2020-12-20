<template>
  <div class="weather-icon">
    <span class="icon" :class="iconClass"></span>
  </div>
</template>

<script>

export default {
  name: 'weather-icon',
  props: {
    iconClass: {
      type: String,
      default: 'chenlian'
    }
  }
}
</script>

<style lang="stylus" scoped>
.weather-icon
  height 24px
  width 24px
  display block
  margin 15px auto 10px
  background-size 24px
  .icon
    display inline-block
    width 24px
    height 24px
    background-size 24px
</style>
