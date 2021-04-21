<template>
  <div class="synthetical">
    <div class="left part">
      <Left />
    </div>
    <div class="right part">
      <RightPages />
    </div>
    <FiveButton />
  </div>
</template>

<script>
import Left from "../components/comSynthetical/Left";
import RightPages from "./RightPages";
import FiveButton from "./fivebutton";
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
    FiveButton,
  },
};
</script>

<style lang="scss" scoped>
.synthetical {
  // height: 95%;
  z-index: 10;
  .part {
    position: absolute;
    width: 5rem;
    height: 100%;
  }
  .left {
    z-index: 10;

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
    z-index: 10;

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
