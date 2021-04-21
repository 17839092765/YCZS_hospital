<template>
  <div class="synleft">
    <Personnel />
    <PolarBar />
    <Bar />
    <Energy />
    <Facility />
    <Parking />
  </div>
</template>

<script>
import Personnel from "./Personnel";
import PolarBar from "./PolarBar";
import Bar from "./Bar";
import Energy from "./Energy";
import Facility from "./Facility";
import Parking from "./Parking";
export default {
  name: "Left",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
  components: {
    Personnel,
    PolarBar,
    Bar,
    Energy,
    Facility,
    Parking,
  },
};
</script>

<style lang='scss' scoped>
.synleft {
  width: 100%;
  height: 7.9rem;
  box-sizing: border-box;
  margin: 0.84rem 0 0 0;
  display: flex;
  justify-content: space-around;
  align-content: space-between;
  flex-wrap: wrap;
}
</style>