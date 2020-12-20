<template>
  <footer class="weather-footer container">
    <p class="desc">
      <a class="friend-link" href="https://www.tianqiapi.com">数据来源于天气API</a>
    </p>
    <p class="copy">Copyright©2020-12-16</p>
  </footer>
</template>

<script>
export default {
  name: 'weather-footer'
}
</script>

<style lang="stylus" scoped>
.weather-footer
  padding 20px 0
  &.container
    display block
    max-width 500px
    box-sizing border-box
    margin 0 auto
    .desc, .copy
      font-size 14px
      color #999
      line-height 26px
      height 26px
      .friend-link
        margin-right 10px

</style>
