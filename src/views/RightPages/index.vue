<template>
  <div class="rightpages">
    <VideoTv />
    <JiDian />
    <ShiJian />
  </div>
</template>

<script>
import VideoTv from "./children/1video";
import JiDian from "./children/2jidian";
import ShiJian from "./children/3shijainlist";
export default {
  data() {
    return {};
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
  components: { VideoTv, JiDian, ShiJian },
};
</script>

<style lang="scss" scoped>
.rightpages {
  margin-top: 0.8rem;
  padding: 0 0.2rem;
  font-size: 0.16rem;
  color: #fff;
}
</style>
