<template>
  <section class="weather-torrow container" v-if="torrowInfo.length > 0">
    <!-- now -->
    <div class="item">
      <div class="top">
        <p class="date">今天</p>
        <p class="temp">{{nowDay.tem2}}~{{nowDay.tem1}}°</p>
      </div>
      <div class="bottom">
        <p class="wea">{{nowDay.wea_day}}</p>
        <weather-img :weatherTxt="nowDay.wea_day_img"></weather-img>
      </div>
    </div>
    <!-- torrow -->
    <div class="item">
      <div class="top">
        <p class="date">明天</p>
        <p class="temp">{{torrowDay.tem2}}~{{torrowDay.tem1}}°</p>
      </div>
      <div class="bottom">
        <p class="wea">{{torrowDay.wea_day}}</p>
        <weather-img :weatherTxt="torrowDay.wea_day_img"></weather-img>
      </div>
    </div>
  </section>
</template>

<script>
import WeatherImg from '@/components/weather-img/weather-img'
export default {
  name: 'weather-torrow',
  props: {
    torrowInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // 今天
    nowDay () {
      return this.torrowInfo[0]
    },
    // 明天
    torrowDay () {
      return this.torrowInfo[1]
    }
  },
  components: {
    WeatherImg
  }
}
</script>

<style lang="stylus" scoped>
.weather-torrow
  position relative
  padding 25px 0 20px 0
  margin 0 auto 10px auto
  border-bottom 1px solid #f1f1f1
  background-color #fff
  display flex
  align-items center
  justify-content center
  &.container
    max-width 500px
    box-sizing border-box
  .item
    width 50%
    padding 0 20px
    &:first-child
      border-right 2px solid #007FFF
    .top
      margin-bottom 10px
      display flex
      align-items center
      justify-content space-between
      .date
        display inline-block
        font-size 14px
      .temp
        display inline-block
        font-size 14px
    .bottom
      display flex
      align-items center
      justify-content space-between
      .wea
        display inline-block
        font-size 14px
</style>
