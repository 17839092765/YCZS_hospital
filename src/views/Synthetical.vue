<template>
  <div class="synthetical">
    <div class="left part"></div>
    <div class="right part"></div>
  </div>
</template>

<script>
export default {
  name: "Synthetical",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
  components: {},
};
</script>

<style lang='scss' scoped>
.synthetical {
  .part {
    position: absolute;
    width: 4.5rem;
    height: 6.4rem;
  }
  .left {
    left: 0;
    background: linear-gradient(
      to left,
      rgba(7, 11, 26, 0) 0%,
      rgba(7, 11, 26, 0.7) 21%,
      rgba(7, 11, 26, 0.8) 100%
    );
    // opacity: 0.8;
  }
  .right {
    right: 0;
    background: linear-gradient(
      to right,
      rgba(7, 11, 26, 0) 0%,
      rgba(7, 11, 26, 0.7) 21%,
      rgba(7, 11, 26, 0.8) 100%
    );
    // opacity: 0.8;
  }
}
</style>