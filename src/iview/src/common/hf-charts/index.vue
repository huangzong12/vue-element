<template>
  <div class="charts" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import debounce from 'lodash/debounce'
  import {on, off} from '@/utils/dom'

  export default {
    name: 'HfCharts',
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      option: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      option: {
        deep: true,
        handler() {
          this.setOptions()
        }
      }
    },
    methods: {
      setOptions() {
        this.chart.setOption(this.option)
      },
      initChart() {
        this.chart = echarts.init(this.$el)
        this.setOptions()
      }
    },
    created() {
      this.resize = debounce(() => {
        this.chart.resize()
      }, 50)
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
        on(window, 'resize', this.resize)
      })
    },
    beforeDestroy() {
      off(window, 'resize', this.resize)
    }
  }
</script>
