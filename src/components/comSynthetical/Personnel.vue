<template>
  <div class="personnel">
    <Title title="园区人员统计" />
    <div class="personnel-con">
      <div v-for="(item, index) in list" :key="index">
        <div>{{ item.key }}</div>
        <div>
          <span>{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../common/Title";

export default {
  name: "Personnel",
  data() {
    return {
      list: [
        {
          key: "在园总人数",
          value: 3561,
          unit: "人",
        },
        {
          key: "住院人数",
          value: 420,
          unit: "人",
        },
        {
          key: "人员黑名单",
          value: 13,
          unit: "人",
        },
        {
          key: "床位使用率",
          value: 75,
          unit: "%",
        },
        {
          key: "新冠肺炎确诊人数",
          value: 0,
          unit: "人",
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
.personnel {
  width: 2.01rem;
  height: 2.6rem;
}
.personnel-con {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    margin: 10px 10px 10px;

    > div:last-of-type {
      margin-top: 5px;
      font-size: 14px;
      color: #fad376;
      > span:last-of-type {
        font-size: 12px;
      }
    }
  }
  > div:last-of-type {
    > div:last-of-type {
      color: #fc474c;
    }
  }
}
</style>