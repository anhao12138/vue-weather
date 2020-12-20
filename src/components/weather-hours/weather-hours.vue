<template>
  <section class="weather-hours container" v-if="hoursInfo.length > 0">
    <div class="horizontal-container">
      <div class="scroll-wrapper">
        <ul class="scroll-content">
          <li v-for="(list, index) in hoursInfo" :key="index" class="scroll-item">
            <p class="time">{{list.hours}}</p>
            <weather-img :weatherTxt="list.wea_img"></weather-img>
            <p class="tem">{{list.tem}}°</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import WeatherImg from '../weather-img/weather-img'

export default {
  name: 'weather-hours',
  components: {
    WeatherImg
  },
  props: {
    hoursInfo: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.weather-hours
  border-bottom 1px solid #e4e4e4
  background-color #fff
  margin 0 auto 10px auto
  padding-top 30px
  padding-bottom 25px
  &.container
    display block
    max-width 500px
    box-sizing border-box
.horizontal-container
  .scroll-wrapper
    width 100%
    white-space nowrap
    overflow-y hidden
    overflow-x auto
    display block
    &::-webkit-scrollbar
        display none
    .scroll-content
      display inline-block
      min-width 1200px
      text-align left
      .scroll-item
        font-size 14px
        display inline-block
        text-align center
        height 82px
        >>>
          .weather-img
            margin 15px
</style>
