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
      var arr = [
        {
          name: "电耗",
          value: 3324,
        },
        {
          name: "水耗",
          value: 1149,
        },
      ];
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
            center: ["50%", "40%"],
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
              show: false,
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
        legend: {
          bottom: "0%",
          textStyle: {
            color: "#fff",
          },
          formatter: function (name) {
            const total = arr.reduce((p, c) => {
              return (p = p + c.value);
            }, 0);
            const temp = arr.find((item) => {
              if (item.name === name) {
                return true;
              }
            });
            return (
              name +
              " " +
              temp.value +
              "kWh" +
              " " +
              parseInt((temp.value / total) * 100) +
              "%"
            );
          },
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
.chart {
  height: 2.2rem;
}
</style>