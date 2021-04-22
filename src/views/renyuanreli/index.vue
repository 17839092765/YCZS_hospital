<template>
  <div v-if="chailouFalg" class="renyuanreli">
    <div @click="golouceng(11)" class="top">
      住院层
    </div>
    <div @click="golouceng(8)" class="case">F16</div>
    <div @click="golouceng(9)" class="case">F15</div>
    <div @click="golouceng(10)" class="case">F14</div>
    <div @click="black()" class="box">
      关闭
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      chailouFalg: (state) => state.chailouFalg,
    }),
  },
  watch: {},
  methods: {
    golouceng(val) {
      console.log(val);

      let f = new BPFunctionData();
      f.objectName = "BP_BuildLayer_5";
      f.functionName = "Clicklayer";
      f.paramType = BPFuncParamType.Float;
      f.paramValue = val;
      __g.misc.callBPFunction(f);
    },
    black() {
      this.$store.commit("chailouFalg", false);
      let f = new BPFunctionData();
      f.objectName = "BP_BuildLayer_5";
      f.functionName = "Openlayer";
      f.paramType = BPFuncParamType.String;
      f.paramValue = "True";
      __g.misc.callBPFunction(f);
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
.renyuanreli {
  z-index: 10;
  position: absolute;
  bottom: 1rem;
  right: 5rem;
  width: 0.5rem;
  height: 3rem;
  > div {
    width: 100%;
    text-align: center;
    line-height: 0.5rem;
    height: 0.5rem;
    margin: 0.05rem;
    font-weight: 600;
    color: rgb(226, 175, 33);
    background: rgba(124, 124, 124, 0.692);
  }
}
</style>
