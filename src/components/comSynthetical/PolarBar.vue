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
        series: [
          //系列列表。每个系列通过 type 决定自己的图表类型
          {
            name: "耳鼻咽喉科", //系列名称
            type: "pie", //饼图
            hoverAnimation: false, //是否开启hover(悬停)在扇区上的放大动画效果
            radius: ["30%", "40%"], //饼图的半径,第一项是内半径，第二项是外半径
            center: ["50%", "40%"],
            labelLine: {
              //标签的视觉引导线
              normal: {
                show: false,
              },
            },
            data: [
              //系列中的数据内容数组
              {
                value: 65,
                itemStyle: {
                  normal: {
                    color: "#946DC3", //柱图显示颜色
                  },
                },
              },
              {
                value: 35,
                itemStyle: {
                  normal: {
                    color: "RGBA(0,186,255,0)", //柱图透明色
                  },
                },
              },
            ],
          },
          {
            name: "心血管内科",
            type: "pie",
            hoverAnimation: false,
            radius: ["45%", "55%"],
             center: ["50%", "40%"],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 50,
                itemStyle: {
                  normal: {
                    color: "#2FD0B3",
                  },
                },
              },
              {
                value: 50,
                itemStyle: {
                  normal: {
                    color: "RGBA(0,186,255,0)",
                  },
                },
              },
            ],
          },
          {
            name: "妇科",
            type: "pie",
            hoverAnimation: false,
            radius: ["60%", "70%"],
             center: ["50%", "40%"],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 60,
                itemStyle: {
                  normal: {
                    color: "#F8D17B",
                  },
                },
              },
              {
                value: 40,
                itemStyle: {
                  normal: {
                    color: "RGBA(0,186,255,0)",
                  },
                },
              },
            ],
          },
          {
            name: "普通外科",
            type: "pie",
            hoverAnimation: false,
            radius: ["75%", "85%"],
             center: ["50%", "40%"],
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 70,
                itemStyle: {
                  normal: {
                    color: "#1A98F7",
                  },
                },
              },
              {
                value: 30,
                itemStyle: {
                  normal: {
                    color: "RGBA(0,186,255,0)",
                  },
                },
              },
            ],
          },
        ],
        legend: {
          show: true,
          data: ["耳鼻咽喉科", "心血管内科", "妇科", "普通外科"],
          bottom: "0%",
          textStyle: {
            color: "#fff",
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
.polarbar {
  .chart {
    height: 2.6rem;
  }
}
</style>