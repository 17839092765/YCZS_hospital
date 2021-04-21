<template>
  <div class="bar">
    <Title title="资产使用分析统计" />
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import Title from "../common/Title";

export default {
  name: "Bar",
  data() {
    return {};
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: ["科研设备", "公共设备", "公用资源", "停车场"],
          axisLabel: {
            fontSize: 8,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: " rgba(255, 255, 255, 0.15)",
            },
          },
          axisLabel: {
            fontSize:10,
          },
        },
        grid: {
          top: "15%",
          bottom: "15%",
          left: "12%",
          right: "0%",
        },
        series: [
          {
            data: [120, 200, 390, 280],
            type: "bar",
            barWidth: "25%",
            itemStyle: {
              normal: {
                barBorderRadius: [25, 25, 0, 0],
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  [
                    { offset: 0, color: "#FAD376" },
                    { offset: 1, color: " rgba(93, 207, 241, 0.2)" },
                  ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                ),
              },
            },
          },
        ],
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
.chart {
  // height: 1.8rem;
  height: 2.6rem;
}
</style>