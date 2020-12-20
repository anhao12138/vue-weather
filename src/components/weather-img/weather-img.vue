<template>
  <div class="weather-img">
    <img :src="weaSelect" alt="">
  </div>
</template>

<script>
export default {
  name: 'weather-img',
  props: {
    weatherTxt: {
      type: String,
      default: 'qing'
    }
  },
  computed: {
    weaSelect () {
      switch (this.weatherTxt) {
        case 'qing':
          return `${require('@/assets/day/00.svg')}`
        case 'yun':
          return `${require('@/assets/day/01.svg')}`
        case 'yin':
          return `${require('@/assets/day/02.svg')}`
        case 'lei':
          return `${require('@/assets/day/04.svg')}`
        case 'yu':
          return `${require('@/assets/day/08.svg')}`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.weather-img
  display inline-block
  width 22px
  height 22px
  overflow hidden
  img
    width 22px
    height 22px
</style>
