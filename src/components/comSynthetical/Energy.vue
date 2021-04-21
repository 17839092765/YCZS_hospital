<template>
  <div class="energy">
    <Title title="能耗分析" />
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import Title from "../common/Title";

export default {
  name: "Energy",
  data() {
    return {};
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        color: ["#5DCFF1", "#FEEAA6"],
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["65%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 3324, name: "电耗" },
              { value: 1149, name: "水耗" },
            ],
            label: {
              show: true,
              fontSize: "10",
              color: "#fff",
              align: "left",
              alignTo: "labelLine",
              formatter: function (params) {
                return `${params.name} ${params.value}kWh`;
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
  height: 1.8rem;
}
</style>