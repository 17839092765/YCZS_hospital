<template>
  <div class="fivebutton">
    <div class="case" v-for="(item, index) in btnlist" :key="index">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnlist: [
        {
          name: "医院报警系统",
          key: 1,
          path: "",
          clickpath: "",
        },
        {
          name: "视频监控系统",
          key: 2,
          path: "",
          clickpath: "",
        },
        {
          name: "人脸识别",
          key: 3,
          path: "",
          clickpath: "",
        },
        {
          name: "火灾报警系统",
          key: 4,
          path: "",
          clickpath: "",
        },
        {
          name: "门禁管理系统",
          key: 5,
          path: "",
          clickpath: "",
        },
        {
          name: "区域客流分析系统",
          key: 6,
          path: "",
          clickpath: "",
        },
        {
          name: "梯控",
          key: 7,
          path: "",
          clickpath: "",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss" scoped>
.fivebutton {
  position: absolute;
  left: 5rem;
  bottom: 1rem;
  width: 1rem;
  height: 4rem;
  background: #000;
}
</style>
