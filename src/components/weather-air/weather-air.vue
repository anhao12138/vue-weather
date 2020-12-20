<template>
  <div class="weather-air" :class="[showClass, level]" v-if="airInfo.hasOwnProperty('air')">
    <!-- 遮罩层 -->
    <div class="air-cover" @click="closeAir"></div>
    <!-- 主体内容 -->
    <div class="air-box">
      <div class="air-pannel">
        <a href="javascript:void(0)" class="close" @click="closeAir">
          <span class="iconfont icon-guanbi"></span>
        </a>
        <p class="title">空气质量指数</p>
        <p class="air-num">{{airInfo.air}}</p>
        <p class="air-level">{{airInfo.air_level}}</p>
      </div>
      <table class="air-table">
        <tbody>
          <tr>
            <td>
              <p class="title">{{airInfo.pm25}}</p>
              <p class="value">PM2.5</p>
            </td>
            <td>
              <p class="title">{{airInfo.pm10}}</p>
              <p class="value">Pm10</p>
            </td>
            <td>
              <p class="title">{{airInfo.so2}}</p>
              <p class="value">SO2</p>
            </td>
          </tr>
          <tr>
            <td>
              <p class="title">{{airInfo.no2}}</p>
              <p class="value">NO2</p>
            </td>
            <td>
              <p class="title">{{airInfo.o3}}</p>
              <p class="value">O3</p>
            </td>
            <td>
              <p class="title">{{airInfo.co}}</p>
              <p class="value">CO</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'weather-air',
  props: {
    // 显示弹窗
    show: {
      type: Boolean,
      default: false
    },
    // 等级
    level: {
      type: String,
      default: 'level2'
    },
    // 数据
    airInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showClass () {
      if (this.show === true) {
        return 'show'
      } else {
        return ''
      }
    }
  },
  methods: {
    closeAir () {
      this.$emit('closeAirDialog')
    }
  }
}
</script>
<style lang="stylus" scoped>
.weather-air
  text-align center
  &.show
    .air-cover
      display block
    .air-box
      visibility visible
      transform translateY(-50%)
      opacity 1
      margin-top -5%
  .air-cover
    position: fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color: rgba(0,0,0,.43)
    z-index 999
    display none
    backdrop-filter blur(2px)
  .air-box
    border-radius 8px
    background #fff
    padding-bottom 5px
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
    overflow hidden
    .air-pannel
      width 250px
      height 250px
      background-size 250px auto
      background-position-y 190px
      background-repeat no-repeat
      border-top-right-radius 8px
      border-top-left-radius 8px
      padding-top 50px
      background-color: #70defc;
      background-image: url("./../../assets/air/01.png")
      box-sizing border-box
      .close
        position absolute
        right 10px
        top 10px
        height 25px
        width 25px
        color #fff
        line-height 25px
        text-align center
        z-index 99
      .title
        font-size 14px
        color #fff
      .air-num
        font-size 60px
        margin 15px 0 20px
        color #fff
      .air-level
        display inline-block
        border-radius 6px
        background-color #a3d765
        color #fff
        padding 0 14px
        height 24px
        line-height 24px
    .air-table
      width 100%
      margin-top 5px
      background-color #fff
      tr
        position relative
        &:first-child:after
          content ""
          position absolute
          left 0
          height 1px
          width 100%
          transform scaleY(.5)
          background #e4e4e4
          bottom 60px
          top auto
        td
          width 33.33%
          font-size 14px
          text-align center
          padding 12px 0
          border-right 0.5px solid #e4e4e4
          &:last-child
            border 0
          .title
            color #434343
            font-size 14px
            margin-bottom 5px
          .value
            color #999
            font-size 12px
</style>
