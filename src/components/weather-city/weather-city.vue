<template>
  <section class="weather-city container" :class="{show: show}">
    <!-- 搜索 -->
    <div class="city-seach">
      <form action="/">
        <van-search
          v-model="keyword"
          show-action
          placeholder="请输入城市名称"
          @search="onSearch"
          @cancel="onCancel"
          @focus="onFocus"
        />
      </form>
    </div>
    <div class="default-box" v-if="selectShow">
      <!-- 历史记录 -->
      <div class="history-box" v-if="historyCity.length > 0">
        <p class="caption">历史记录</p>
        <span class="iconfont icon-lajitong icon" @click="deleteHistory"></span>
        <ol class="history-pannel">
          <li
            class="history-list"
            v-for="(item, index) in historyCity"
            :key="index"
            @click="cityHistory"
          >{{item}}</li>
        </ol>
      </div>
      <!-- 热门城市 -->
      <div class="hot-city" v-if="hotCity.length > 0">
        <p class="caption">热门城市</p>
        <ol class="hot-pannel">
          <li
            class="hot-list"
            v-for="(list, index) in hotCity"
            :key="index"
            @click="citySelect"
          >{{list}}</li>
        </ol>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div class="seach-list" v-if="!selectShow">
      <div class="city-wrapper" ref="cityScroll" @click.stop="onRemove">
        <ul class="city-pannel" ref="cityPannel">
          <li
            class="city-list"
            v-for="(items, index) in cityList"
            :key="index"
            @click.stop="cityThis"
          >{{items}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import BScroll from '@better-scroll/core'

export default {
  name: 'weather-city',
  data () {
    return {
      keyword: '',
      // 热门城市数据
      hotCity: [
        '北京',
        '上海',
        '广州',
        '厦门',
        '兰州',
        '西安',
        '昆明',
        '长沙',
        '武汉',
        '成都',
        '绵阳',
        '德阳'
      ],
      // 历史记录
      historyCity: [],

      selectShow: true,

      cityList: [],
      // 节流定时器
      timer: null,

      allCity: [],
      showNow: this.show
    }
  },
  created () {
    this.getLocationCity()
    this.getAllCity()
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 输入的内容监听
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.cityList = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        this.allCity.forEach((list) => {
          if (list.name.indexOf(this.keyword) > -1) {
            result.push(list.name)
          }
        })
        this.cityList = result
      }, 100)
    },
    // 获取城市数据监听
    cityList () {
      this.cityBetter()
    }
  },
  methods: {
    // 获取所有城市的数据
    async getAllCity () {
      const { data: res } = await this.$http.get(
        'https://www.easy-mock.com/mock/5f5dfe733d43414305879786/city/list'
      )
      this.allCity = res.data
    },
    // 点击搜索触发
    onSearch (val) {
      this.$toast(val)
      this.$emit('currentCity', val)
      this.onRemove()
    },
    // input触发焦点
    onFocus () {
      this.selectShow = false
    },
    onRemove () {
      this.selectShow = true
      this.keyword = ''
    },
    // 点击取消触发
    onCancel () {
      this.$emit('closeCity', false)
      this.onRemove()
    },
    // 初始化better-scroll
    cityBetter () {
      this.$nextTick(() => {
        if (this.cityList.length === 0) {
          return false
        }
        const height = this.cityList.length * 39
        this.$refs.cityPannel.style.height = height + 'px'
        if (!this.scroll) {
          this.bs = new BScroll(this.$refs.cityScroll, {
            startX: 0,
            scrollX: true,
            probeType: 3,
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    // 热门城市选择
    citySelect (e) {
      this.$toast(e.target.innerText)
      if (this.historyCity.length <= 2) {
        this.historyCity.unshift(e.target.innerText)
        this.historyCity = this.unique(this.historyCity)
      } else {
        this.historyCity.unshift(e.target.innerText)
        this.historyCity = this.unique(this.historyCity)
        if (this.historyCity.length > 3) {
          this.historyCity.pop()
        }
      }
      window.localStorage.setItem('historyCity', this.historyCity)
      this.sendFatherCity(e)
      this.onRemove()
    },
    // 历史城市弹窗
    cityHistory (e) {
      this.$toast(e.target.innerText)
      this.sendFatherCity(e)
      this.onRemove()
    },
    // 获取localStrong里城市数据
    getLocationCity () {
      let cityList = window.localStorage.getItem('historyCity')
      if (cityList) {
        this.historyCity = cityList.split(',')
      }
    },
    // 去重
    unique (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    deleteHistory () {
      window.localStorage.removeItem('historyCity')
      this.historyCity = []
    },
    // 发送给父组件事件
    sendFatherCity (e) {
      this.$emit('currentCity', e.target.innerText)
      this.$emit('closeCity', false)
    },
    // 搜索城市点击事件
    cityThis (e) {
      this.$toast(e.target.innerText)
      if (e.target.innerText.indexOf('市')) {
        let value = e.target.innerText
        let filterValue = value.slice(0, value.length - 1)
        this.$emit('currentCity', filterValue)
        this.$emit('closeCity', false)
        this.sendFatherCity(e)
        this.onRemove()
      } else {
        this.sendFatherCity(e)
        this.onRemove()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.weather-city
  position fixed
  z-index 5
  top 0
  left 0
  right 0
  bottom 0
  background-color #fff
  transform translate3d(0, -120%, 0)
  transition transform 0.25s ease-in-out
  &.container
    display block
    max-width 500px
    margin 0 auto
    box-sizing border-box
  &.show
    transform translateZ(0)
  .city-seach
    border-bottom 1px solid #f4f4f4
    z-index 999
    background-color #fff
    position relative
  .history-box
    padding 10px
    position relative
    .caption
      font-size 16px
      color #434343
      line-height 22px
      height 22px
      margin 10px 0
      text-align left
    .icon
      position absolute
      right 20px
      top 21px
      display inline-block
      width 24px
      height 24px
      line-height 24px
      text-align center
      font-size 18px
      color #434343
  .history-pannel
    display block
    overflow hidden
    .history-list
      float left
      box-sizing border-box
      width 32%
      background-color #f2f2f2
      border-radius 44px
      height 32px
      line-height 32px
      text-align center
      font-size 14px
      color #434343
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      padding 0 10px
      margin 0 0.5%
  .hot-city
    padding 10px
    display block
    .caption
      font-size 16px
      color #434343
      line-height 22px
      height 22px
      margin 10px 0
      text-align left
    .hot-pannel
      display flex
      align-items center
      justify-content space-between
      flex-wrap wrap
      width 100%
      .hot-list
        box-sizing border-box
        width 32%
        background-color #f2f2f2
        border-radius 44px
        height 32px
        line-height 32px
        text-align center
        font-size 14px
        color #434343
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        padding 0 10px
        margin 0 0.5% 10px 0.5%
  .seach-list
    position absolute
    top 54px
    left 0
    width 100%
    bottom 0
    .city-wrapper
      height 100%
      .city-pannel
        display block
        width 100%
        .city-list
          padding 12px
          width 100%
          border-bottom 1px solid #f4f4f4
          color #434343
          font-size 14px
          text-align left
          box-sizing border-box
  >>>, .van-search
    box-sizing border-box
</style>
