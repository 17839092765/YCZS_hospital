<template>
  <div class="header">
    <div class="header-part left">
      <img src="../assets/img/logo.png" alt="" />
      <div class="reset" @click="reset">首页</div>
    </div>
    <div class="header-title">
      <img src="../assets/img/top-title.png" alt="" />
    </div>
    <div class="header-part right"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    reset() {
      __g.camera.set();
      __g.misc.setDateTime(2021, 4, 22, 11, 0, 0, false);
    },
  },
  mounted() {},
  beforeDestroy() {},
  components: {},
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 10;

  width: 100%;
  position: absolute;
  top: 0;
  height: 0.84rem;

  .header-title {
    // position: absolute;
    width: 100%;
    > img {
      position: absolute;
      width: 19.2rem;
    }
  }
  .header-part {
    position: absolute;
    height: 100%;
  }
  .left {
    left: 5px;
    width: 4.48rem;
    height: 0.57rem;
    background: url("../assets/img/left_logobg.png");
    > img {
      position: absolute;
      width: 55%;
      left: 25px;
      top: 5px;
    }
    .reset {
      position: absolute;
      right: 10px;
      bottom: 10px;
      cursor: pointer;
    }
  }
  .right {
    right: 5px;
    width: 4.76rem;
    height: 0.59rem;
    background: url("../assets/img/top-rightTime.png") no-repeat;
  }
}
</style>
