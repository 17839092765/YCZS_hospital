<template>
  <div class="synthetical">
    <div class="left part">
      <Left />
    </div>
    <div class="right part">
      <RightPages />
    </div>
  </div>
</template>

<script>
import Left from "../components/comSynthetical/Left";
import RightPages from "./RightPages";
export default {
  name: "Synthetical",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
  components: {
    Left,
    RightPages,
  },
};
</script>

<style lang="scss" scoped>
.synthetical {
  // height: 95%;
  .part {
    position: absolute;
    width: 5rem;
    height: 100%;
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
    width: 5rem;
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
