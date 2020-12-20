<template>
  <section class="weather-main container" :class="[dayOrNight, weatherSelect]">
    <!-- 地理位置市级 -->
    <div class="nav-bar">
      <div class="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 城市 -->
      <div class="location-box" @click="cityDialog">
        <i class="iconfont icon-zuobiao"></i>
        <span class="city">{{weatherInfo.city}}市</span>
      </div>
      <div class="share" @click="ShareDialog = true">
        <i class="iconfont icon-fenxiang1"></i>
      </div>
    </div>
    <div class="update-time">
      <p class="time">最后更新时间{{weatherInfo.update_time}}</p>
    </div>
    <!-- 当前天气信息 -->
    <div class="weathter-info">
      <!-- 摄氏度 -->
      <p class="temperature">{{weatherInfo.tem}}</p>
      <p class="weather-text">{{weatherInfo.wea}}</p>
      <div class="wind-hum-box">
        <transition name="fade">
          <!-- 湿度 -->
          <span class="wind" v-show="windHumToggle">湿度 {{weatherInfo.humidity}}</span>
        </transition>
        <transition name="fade">
          <!-- 风向风力 -->
          <span class="hum" v-show="!windHumToggle">{{weatherInfo.win}} {{weatherInfo.win_speed}}</span>
        </transition>
      </div>
      <!-- 提示 -->
      <p class="tip-text">{{tipText}}</p>
    </div>
    <!-- 背景 -->
    <weather-bg></weather-bg>

    <!-- 空气质量 -->
    <div class="air-box" :class="airStyle" @click="airDialog = true">
      <p class="num">{{weatherInfo.air}}</p>
      <p class="value">{{weatherInfo.air_level}}</p>
    </div>
    <!-- 预警  -->
    <div class="waring-box" v-show="weatherInfo.alarm.length > 0">
      <ul>
        <li class="waring-list"
            @click="waringDialogShow(index)"
            v-for="(list, index) in weatherInfo.alarm"
            :key="list.id"
            :class="{
              level1: list.alarm_level === '蓝色',
              level2: list.alarm_level === '黄色',
              level3: list.alarm_level === '橙色',
              level4: list.alarm_level === '红色'
            }"
        >{{list.alarm_type}}预警</li>
      </ul>
    </div>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model="ShareDialog"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <!-- 警报面板 -->
    <weather-dialog
      :showDialog="showDialog"
      @closeDialog="showDialog = false"
      :dialogTitle="alarmInfo.alarm_level + this.alarmInfo.alarm_type + '预警'"
      :dialogInfo="alarmInfo.alarm_content"
      :dialogBgColor="dialogStyle"
    >
    </weather-dialog>
    <!-- 空气质量面板 -->
    <weather-air
      @closeAirDialog="airDialog = false"
      :show="airDialog"
      :level="airStyle"
      v-bind="$attrs"></weather-air>
  </section>
</template>

<script>
import WeatherBg from '@/components/weather-bg/weather-bg'
import WeatherDialog from '@/components/weather-dialog/weather-dialog'
import WeatherAir from '@/components/weather-air/weather-air'

export default {
  name: 'weather-main',
  inheritAttrs: false,
  data () {
    return {
      // 分享弹窗
      ShareDialog: false,
      // 预警弹窗
      showDialog: false,
      // 湿度 风力弹窗
      windHumToggle: true,
      // 空气质量弹窗
      airDialog: false,
      // 预警弹窗的信息
      alarmInfo: {
        alarm_type: '',
        alarm_level: '',
        alarm_content: ''
      },
      // 分享弹窗配置
      options: [
        { name: '微信', icon: `${require('@/assets/share/wx.png')}` },
        { name: '朋友圈', icon: `${require('@/assets/share/pyq.png')}` },
        { name: 'QQ', icon: `${require('@/assets/share/qq.png')}` },
        { name: 'QQ空间', icon: `${require('@/assets/share/qqkj.png')}` },
        { name: '微博', icon: `${require('@/assets/share/xlwb.png')}` }
      ]
    }
  },
  props: {
    weatherInfo: {
      type: Object,
      default () {
        return {
          city: '绵阳',
          update_time: '08:46',
          tem: '27',
          wea: '多云',
          win: '东北风',
          win_speed: '1级',
          air: '37',
          air_level: '优',
          humidity: '',
          alarm: []
        }
      }
    }
  },
  computed: {
    // 计算属性获取白天晚上，添加不同class
    dayOrNight () {
      if (!(this.isDaylight())) {
        return 'day'
      } else {
        return 'night'
      }
    },
    // 提示语
    tipText () {
      let weather = this.weatherInfo.wea
      if (weather === '晴' && this.tem > 30) {
        return '天气太热，吃个西瓜~'
      } else if (weather === '晴') {
        return '你若安好，便是晴天~'
      } else if (weather.includes('雨')) {
        return '下雨了记得带伞噢！'
      } else if (weather === '阴') {
        return '天暗下来了，你就是阳光！'
      } else if (weather === '多云') {
        return '光芒透过云峰，洒下大地！'
      }
    },
    // 通过天气判断当前背景
    weatherSelect () {
      let cond = this.weatherInfo.wea
      if (cond === '晴') {
        return ''
      } else if (cond === '阴') {
        return 'W1'
      } else if (cond === '雨') {
        return 'W2'
      } else if (cond === '雪') {
        return 'W3'
      } else if (cond === '大雨') {
        return 'W4'
      } else if (cond === '雾') {
        return 'W5'
      } else if (cond === '沙尘暴') {
        return 'W6'
      } else if (cond === '多云') {
        return 'W7'
      }
    },
    // 警报弹窗颜色
    dialogStyle () {
      if (this.alarmInfo.alarm_level === '黄色') {
        return '#f5d271'
      } else if (this.alarmInfo.alarm_level === '蓝色') {
        return '#7da0ec'
      } else if (this.alarmInfo.alarm_level === '橙色') {
        return '#ef8c6b'
      } else if (this.alarmInfo.alarm_level === '红色') {
        return '#ec807c'
      }
    },
    // 空气质量
    airStyle () {
      switch (this.weatherInfo.air_level) {
        case '优':
          return 'level1'
        case '良':
          return 'level2'
        case '轻度污染':
          return 'level3'
        case '中度污染':
          return 'level4'
        case '重度污染':
          return 'level5'
        case '严重污染':
          return 'level6'
      }
    }
  },
  created () {
    // 定时切换
    setInterval(this.toggleClass, 5000)
  },
  methods: {
    // 通过时间判断白天或者晚上
    isDaylight () {
      let currDate = new Date()
      if (currDate.getHours() >= 19 || currDate.getHours() < 7) {
        return true
      } else {
        return false
      }
    },
    // 分享
    onSelect (option) {
      this.$toast(option.name)
      this.ShareDialog = false
    },
    // 动态切换class
    toggleClass () {
      this.windHumToggle = !this.windHumToggle
    },
    // 传输预警信息
    waringDialogShow (index) {
      this.alarmInfo.alarm_type = this.weatherInfo.alarm[index].alarm_type
      this.alarmInfo.alarm_level = this.weatherInfo.alarm[index].alarm_level
      this.alarmInfo.alarm_content = this.weatherInfo.alarm[index].alarm_content
      this.showDialog = true
    },
    cityDialog () {
      this.$emit('cityDialogShow', true)
    }
  },
  components: {
    WeatherAir,
    WeatherBg,
    WeatherDialog
  }
}
</script>

<style lang="stylus" scoped>
.weather-main
  position relative
  overflow hidden
  text-align center
  height 470px
  &.container
    display block
    max-width 500px
    margin 0 auto
    box-sizing border-box
  .nav-bar
    position relative
    overflow hidden
    .back
      position absolute
      left 15px
      top 15px
      color #fff
      i
        display inline-block
        width: 22px
        height: 22px
        text-align center
        line-height 22px
        font-size 20px
    .share
      position absolute
      right 15px
      top 15px
      color #fff
      i
        display inline-block
        width: 22px
        height: 22px
        text-align center
        line-height 22px
        font-size 22px
    .location-box
      height 16px
      line-height 16px
      width 80%
      margin 18px auto 6px auto
      font-size 16px
      color #fff
      -webkit-tap-highlight-color transparent
      .city
        margin 0 5px
  .update-time
    .time
      color #fff
      font-size 12px
      line-height 12px
      min-height 12px
  .weathter-info

    .temperature
      font-size 62px
      color #fff
      line-height 62px
      height 62px
      margin-top 66px
      position relative

      &:after
        font-family "iconfont" !important
        font-style normal
        -webkit-font-smoothing antialiased
        content "\e633"
        position absolute
        text-align left
        top 0
        text-indent -20px
    .weather-text
      font-size 22px
      color #fff
      line-height 22px
      height 22px
      margin-top 8px
    .wind-hum-box
      display flex
      align-items center
      justify-content center
      flex-direction column
      position relative
      margin-top 10px
      height 14px
      .wind, .hum
        display block
        width 100%
        text-align center
        color #fff
        font-size 14px
        margin-top 5px
        opacity 1
        position absolute
        &.fade-enter-active, .fade-leave-active
          transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
        &.fade-enter, .fade-leave-active
          opacity: 0
        &.fade-enter
          transform translateY(10px)
        &.fade-leave-to
          transform translateY(-10px)
    .tip-text
      margin-top 66px
      color #fff
  .air-box
    position absolute
    top 67px
    left 8px
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.12)
    height 44px
    padding 8px 12px
    border-radius 8px
    background-color #a3d765
    box-sizing border-box
    z-index 2
    .num, .value
      color #fff
      font-size 12px
      margin-bottom 3px
      height 12px
      line-height 12px
  .waring-box
    position absolute
    top 67px
    right 0
    z-index 3
    ul
      overflow hidden
      .waring-list
        margin-bottom 8px
        padding 0 6px
        color #fff
        font-size 12px
        background-color rgba(0,0,0,0.3)
        text-align left
        height 24px
        line-height 24px
        border-top-left-radius 12px
        border-bottom-left-radius 12px
        overflow hidden
        &::before
          content ''
          height 5px
          width 5px
          display inline-block
          vertical-align middle
          margin-right 3px
          background-color #7da0ec
          border-radius 50%
  >>>
    .van-share-sheet__icon
      width 36px
      height 36px
      margin 0
      padding 0 22px
</style>
