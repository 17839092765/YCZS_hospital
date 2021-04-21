<template>
  <div class="polarbar">
    <Title title="科室病患占比情况" />
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import Title from "../common/Title";

export default {
  name: "PolarBar",
  data() {
    return {};
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        angleAxis: {},
        radiusAxis: {
          show: false,
          type: "category",
          data: ["周一", "周二", "周三", "周四"],
          //   z: 10,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [2, 2, 3, 4],
            coordinateSystem: "polar",
            name: "A",
            emphasis: {
              focus: "series",
            },
          },
        ],
        legend: {
          show: true,
          data: ["A",'123'],
          orient: "vertical",
          align: "right",
        },
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {},
  components: {
    Title,
  },
};
</script>

<style lang='scss' scoped>
.polarbar {
  .chart {
    height: 1.8rem;
  }
}
</style>