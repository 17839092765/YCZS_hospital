<template>
  <div class="parking">
    <Title title="停车位占用情况" />
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import Title from "../common/Title";

export default {
  name: "Parking",
  data() {
    return {};
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          show: false,
        },
        yAxis: {
          type: "category",
          data: ["负三层", "负二层", "负一层", "地面层"],
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "2012年",
            type: "bar",
            data: [97, 179, 209, 261],
            barWidth: "35%",
            barGap: "-100%",
            // showBackground: true,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 25, 25, 0],
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  [
                    { offset: 0, color: "rgba(99, 136, 246, 0.2)" },
                    { offset: 1, color: "#FC474C" },
                  ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                ),
              },
            },
            label: {
              show: true,
              verticalAlign: "middle",
              color: "#fff",
              formatter: function (params) {
                return `${params.value} (${parseInt(
                  (params.value / (97 + 179 + 209 + 261)) * 100
                )}%)`;
              },
              fontSize: 9,
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
  height: 1.8rem;
}
</style>