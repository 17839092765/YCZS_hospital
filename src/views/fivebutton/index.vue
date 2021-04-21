<template>
  <div class="fivebutton">
    <div
      :class="active === item.key && 'active'"
      v-for="(item, index) in btnlist"
      :key="index"
      @click="interactive(item.key)"
    >
      <!-- {{ item.name }} -->
      <img v-if="active === item.key" :src="item.clickpath" alt="" />
      <img v-else :src="item.path" alt="" />
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
          path: require("../../assets/img/icon_报警1.png"),
          clickpath: require("../../assets/img/icon_报警2.png"),
        },
        {
          name: "视频监控系统",
          key: 2,
          path: require("../../assets/img/icon_摄像头1.png"),
          clickpath: require("../../assets/img/icon_摄像头2.png"),
        },
        {
          name: "人脸识别",
          key: 3,
          path: require("../../assets/img/icon_人脸1.png"),
          clickpath: require("../../assets/img/icon_人脸2.png"),
        },
        {
          name: "火灾报警系统",
          key: 4,
          path: require("../../assets/img/icon_烟感1.png"),
          clickpath: require("../../assets/img/icon_烟感2.png"),
        },
        {
          name: "门禁管理系统",
          key: 5,
          path: require("../../assets/img/icon_门禁1.png"),
          clickpath: require("../../assets/img/icon_门禁2.png"),
        },
        {
          name: "区域客流分析系统",
          key: 6,
          path: require("../../assets/img/icon_热力1.png"),
          clickpath: require("../../assets/img/icon_热力2.png"),
        },
        {
          name: "梯控",
          key: 7,
          path: require("../../assets/img/icon_专梯1.png"),
          clickpath: require("../../assets/img/icon_专梯2.png"),
        },
      ],
      active: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    interactive(active) {
      this.active = active;
      switch (active) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        default:
          break;
      }
    },
  },
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
  // height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // background: #000;
  > div {
    width: 0.66rem;
    height: 0.53rem;
    background: url("../../assets/img/iconmenu_defaultbg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div.active {
    background: url("../../assets/img/iconmenu_choosed.png") no-repeat;
    background-size: cover;
  }
}
</style>
