<template>
  <div class="weather-bg">
    <div class="weather-box" id="bg1"></div>
    <!-- <div class="weather-box" id="bg2"></div>
    <div class="weather-box" id="bg3"></div> -->
  </div>
</template>

<script>
export default {
  name: 'weather-bg'
}
</script>

<style lang="stylus" scoped>
.weather-bg
  position absolute
  top 60px
  bottom 0
  width 100%
  z-index -666
  overflow hidden
  margin-top -35%
  .weather-box
    position absolute
    top 60px
    bottom 0
    background-size 100% auto
    background-repeat no-repeat
    background-position bottom
    left -6%
    right -6%
</style>
