<template>
  <section class="weather-week container" v-if="weekInfo.length > 0">
    <div class="week-wrapper">
      <div class="week-content">
        <ul class="week-box">
          <li v-for="(list, index) in weekInfo" :key="index" class="week-item">
            <p class="day">{{list.week}}</p>
            <p class="date">{{list.date | formatDate}}</p>
            <p class="wea">{{list.wea_day}}</p>
            <weather-img :weatherTxt="list.wea_day_img"></weather-img>
            <p class="day-tem">
              <span class="day-icon"></span>
              <span class="value">{{list.tem1}}°</span>
            </p>
            <p class="night-tem">
              <span class="night-icon"></span>
              <span class="value">{{list.tem2}}°</span>
            </p>
            <weather-img :weather-txt="list.wea_night_img"></weather-img>
            <p class="wea-night">{{list.wea_night}}</p>
            <p class="win">{{list.win[0]}}</p>
            <p class="win-level">{{list.win_speed}}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import WeatherImg from '../weather-img/weather-img'
export default {
  name: 'weather-week',
  props: {
    weekInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      let arrDate = value.split('-').splice(1, value.length)
      return arrDate.join('/')
    }
  },
  components: {
    WeatherImg
  }
}
</script>

<style lang="stylus" scoped>
.weather-week
  border-bottom 1px solid #e4e4e4
  background-color #fff
  margin 0 auto 10px auto
  padding-top 30px
  padding-bottom 25px
  &.container
    display block;
    max-width 500px
    box-sizing border-box
  .week-wrapper
    .week-content
      width 100%
      white-space nowrap
      overflow-y hidden
      overflow-x auto
      display block
      &::-webkit-scrollbar
        display none
      .week-box
        display inline-block
        text-align left
        .week-item
          font-size 14px
          display inline-block
          text-align center
          width 80px
          .day, .date
            color #999
            font-size 12px
            height 12px
            line-height 12px
            overflow hidden
          .date
            margin 5px 0 15px
          .wea
            color #434343
            margin-bottom 15px
          .wea-night
            margin 16px 0 20px
          .win-level, .win
            color #b2b2b2
            margin 0 auto 6px
            font-size 12px
            height 12px
            line-height 12px
            overflow hidden
          .day-tem, .night-tem
            margin 15px 0
            display flex
            align-items center
            justify-content center
            .day-icon
              display inline-block
              width 24px
              height 24px
              background-image url("./../../assets/night/rise.svg")
              background-repeat no-repeat
            .night-icon
              display inline-block
              width 24px
              height 24px
              background-image url("./../../assets/night/set.svg")
              background-repeat no-repeat
            .value
              font-size 14px
              height 24px
              line-height 30px
              margin-left 5px
</style>
