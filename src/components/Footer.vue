<template>
  <div class="footer">
    <div
      :class="index === active && 'active'"
      v-for="(item, index) in list"
      :key="index"
      @click="nav(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      list: [
        "综合态势",
        "安防应急",
        "通行管理",
        "设施管理",
        "人员管理",
        "环境空间",
        "业务管理",
        "能耗统计",
      ],
      active: 0,
    };
  },
  methods: {
    nav(index) {
      this.active = index;
      this.$router.push("/" + index);
    },
  },
  mounted() {},
  beforeDestroy() {},
  components: {},
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  z-index: 10;

  bottom: 0;
  height: 0.53rem;
  width: 100%;
  display: flex;
  justify-content: center;
  background: url("../assets/img/bot-menubg.png") no-repeat;
  background-size: contain;
  > div {
    width: 1.1rem;
    height: 0.52rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    cursor: pointer;
  }
  > div.active {
    background: url("../assets/img/选中的菜单背景.png") no-repeat;
    background-size: contain;
  }
}
</style>
