<template>
  <div class="weather-wrapper">
    <!-- 天气动画面板 -->
    <weather-main
      :weatherInfo="weatherInfo"
      :airInfo="airInfo"
      @cityDialogShow="showDialog">
    </weather-main>
    <!-- 今天明天天气 -->
    <weather-torrow :torrowInfo="torrowInfo"></weather-torrow>
    <!-- 24小时天气 -->
    <weather-hours :hoursInfo="hoursInfo"></weather-hours>
    <!-- 一周天气 -->
    <weather-week :weekInfo="weekInfo"></weather-week>
    <!-- 生活指数 -->
    <weather-exponent :exponent="exponent"></weather-exponent>
    <!-- 版权 -->
    <weather-footer></weather-footer>
    <!-- 城市搜索 -->
    <weather-city :show="selectCityShow" @closeCity="closeCity" @currentCity="currentCity"></weather-city>
  </div>
</template>

<script>
// @ is an alias to /src
import { getLocation } from '@/plugins/getLocation'
import WeatherMain from '@/components/weather-main/weather-main'
import WeatherTorrow from '@/components/weather-torrow/weather-torrow'
import WeatherHours from '@/components/weather-hours/weather-hours'
import WeatherWeek from '@/components/weather-week/weather-week'
import WeatherExponent from '@/components/weather-exponent/weather-exponent'
import WeatherFooter from '@/components/weather-footer/weather-footer'
import WeatherCity from '@/components/weather-city/weather-city'
export default {
  name: 'home',
  data () {
    return {
      // 当前城市
      nowLocation: '',
      // 当天天气信息
      weatherInfo: {
        city: '绵阳',
        update_time: '10:46',
        tem: '27',
        wea: '多云',
        win: '东北风',
        win_speed: '1级',
        air: '37',
        air_level: '优',
        humidity: '',
        alarm: []
      },
      // 今天与明天天气
      torrowInfo: [],
      // 24小时天气
      hoursInfo: [],
      // 一周天气
      weekInfo: [],
      // 生活指数
      exponent: {},
      // 空气质量
      airInfo: {},
      // 选择城市
      selectCityShow: false
    }
  },
  created () {
    this.getCity()
  },
  methods: {
    // 获取定位
    getCity () {
      getLocation().then(() => {
        const geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((position) => {
          // 获取城市信息
          let city = position.address.city
          let nowCity = city.slice(0, city.length - 1)
          this.nowLocation = nowCity
          this.getWeather()
          this.getWeekWeather()
        }, (e) => {
          console.log(e)
        })
      })
    },
    // 请求当地天气
    async getWeather () {
      const { data: res } = await this.$http.get('api', {
        params: {
          version: 'v62',
          appid: 56989828,
          appsecret: 'zQfNlTp4',
          city: this.nowLocation
        }
      })
      if (res.errcode) {
        return false
      }
      this.weatherInfo.city = res.city
      this.weatherInfo.update_time = res.update_time
      this.weatherInfo.tem = res.tem
      this.weatherInfo.wea = res.wea
      this.weatherInfo.win = res.win
      this.weatherInfo.win_speed = res.win_speed
      this.weatherInfo.air = res.air
      this.weatherInfo.humidity = res.humidity
      this.weatherInfo.air_level = res.air_level
      if (res.alarm.alarm_type === '') {
        this.weatherInfo.alarm = []
      } else {
        this.weatherInfo.alarm = []
        this.weatherInfo.alarm.push(res.alarm)
      }
      // 小时天气
      this.hoursInfo = res.hours
      // 生活指数
      this.exponent = res.zhishu
      // 空气质量
      this.airInfo = res.aqi
    },
    // 请求七天天气
    async getWeekWeather () {
      const { data: res } = await this.$http.get('api', {
        params: {
          version: 'v9',
          appid: 56989828,
          appsecret: 'zQfNlTp4',
          city: this.nowLocation
        }
      })
      // 获取城市失败
      if (res.errcode) {
        return false
      }
      this.weekInfo = res.data
      for (let i = 0; i < 2; i++) {
        this.torrowInfo.push(res.data[i])
      }
    },
    // 打开选择城市弹窗
    showDialog (arg) {
      this.selectCityShow = arg
    },
    // 关闭选择城市弹窗
    closeCity (arg) {
      this.selectCityShow = arg
    },
    // 选择城市重新获取数据
    currentCity (val) {
      this.nowLocation = val
      this.getWeather()
      this.getWeekWeather()
    }
  },
  components: {
    WeatherCity,
    WeatherFooter,
    WeatherMain,
    WeatherTorrow,
    WeatherHours,
    WeatherWeek,
    WeatherExponent
  }
}
</script>
