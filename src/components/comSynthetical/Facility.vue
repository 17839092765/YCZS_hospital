<template>
  <div class="facility">
    <Title title="现有设施数据" />
    <div class="facility-list">
      <div v-for="(item, index) in list" :key="index">
        <div>{{ item.name }}</div>
        <div>{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../common/Title";

export default {
  name: "Facility",
  data() {
    return {
      list: [
        {
          name: "资产数量(台)",
          value: 67341,
        },
        {
          name: "完好率(%)",
          value: 89,
        },
        {
          name: "役龄新度",
          value: 673,
        },
        {
          name: "闲置数(台)",
          value: 59,
        },
        {
          name: "故障数(台)",
          value: 21,
        },
      ],
    };
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
  components: {
    Title,
  },
};
</script>

<style lang='scss' scoped>
.facility {
  width: 2.01rem;
  .facility-list {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../../assets/img/数据显示背景.png") no-repeat;
      background-size: contain;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      margin-right: 6px;
      margin-bottom: 25px;
      > div:first-of-type {
        transform: scale(0.66667);
      }
    }
    > div:nth-of-type(odd) {
      > div:last-of-type {
        color: #fad376;
      }
    }
    > div:nth-of-type(2) {
      > div:last-of-type {
        color: #83fae5;
      }
    }
    > div:nth-of-type(4) {
      > div:last-of-type {
        color: #fad376;
      }
    }
    > div:nth-of-type(5) {
      > div:last-of-type {
        color: #bb4569;
      }
    }
  }
}
</style>