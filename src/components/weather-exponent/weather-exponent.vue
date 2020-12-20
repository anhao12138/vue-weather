<template>
  <section class="weather-exponent container" v-if="exponent.chuanyi">
    <div class="exponent-wrapper">
      <ul class="exponent-content">
        <li v-for="(value, key, index) in exponentInfo"
            :key="index" class="exponent-list"
            @click="exponentDialog(key, index)">
          <weather-icon :iconClass="key"></weather-icon>
          <p class="desc">{{value.level}}</p>
          <p class="title">{{key | descValue}}</p>
        </li>
      </ul>
    </div>
    <weather-dialog
      :showDialog="showDialog"
      :dialogTitle="exponentContent.title | descValue"
      :dialogInfo="exponentContent.content"
      :dialogBgColor="exponentContent.bgColor | formatColor"
      @closeDialog="showDialog = false"></weather-dialog>
  </section>
</template>

<script>
import WeatherIcon from '@/components/weather-icon/weather-icon'
import WeatherDialog from '@/components/weather-dialog/weather-dialog'
export default {
  name: 'weather-exponent',
  components: {
    WeatherIcon,
    WeatherDialog
  },
  data () {
    return {
      showDialog: false,
      exponentContent: {
        title: '',
        content: '',
        bgColor: ''
      }
    }
  },
  props: {
    exponent: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    descValue (value) {
      switch (value) {
        case 'chenlian':
          return '晨练指数'
        case 'chuanyi':
          return '穿衣指数'
        case 'daisan':
          return '打伞指数'
        case 'ganmao':
          return '感冒指数'
        case 'ziwaixian':
          return '紫外线指数'
        case 'liangshai':
          return '晾晒指数'
        case 'lvyou':
          return '旅游指数'
        case 'diaoyu':
          return '洗车指数'
      }
    },
    formatColor (value) {
      switch (value) {
        case 'chenlian':
          return '#FFB4A2'
        case 'chuanyi':
          return '#457B9D'
        case 'daisan':
          return '#A8DADC'
        case 'ganmao':
          return '#F4A261'
        case 'ziwaixian':
          return '#2A9D8F'
        case 'liangshai':
          return '#F25F5C'
        case 'lvyou':
          return '#70C1B3'
        case 'diaoyu':
          return '#EF233C'
      }
    }
  },
  computed: {
    exponentInfo () {
      let obj = this.exponent
      delete obj.kaiche
      delete obj.xiche
      return obj
    }
  },
  methods: {
    exponentDialog (key, index) {
      this.exponentContent.content = this.exponent[key].tips
      this.exponentContent.title = key
      this.exponentContent.bgColor = key
      this.showDialog = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.weather-exponent
  background-color #fff
  &.container
    display block
    max-width 500px
    box-sizing border-box
    margin 0 auto
    .exponent-wrapper
      overflow hidden
      .exponent-content
        overflow hidden
        border-top 1px solid #e6e6e6
        border-left 1px solid #e6e6e6
        .exponent-list
          float left
          width 25%
          border-right 1px solid #e6e6e6
          border-bottom 1px solid #e6e6e6
          text-align center
          height 94px
          box-sizing border-box
          .title
            font-size 12px
            color #999
          .desc
            font-size 14px
            color #434343
            margin-bottom 8px
</style>
