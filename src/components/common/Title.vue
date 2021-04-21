<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: ["title"],
  methods: {},
  mounted() {},
  beforeDestroy() {},
  components: {},
};
</script>

<style lang='scss' scoped>
.title {
  width: 2.1rem;
  height: 0.15rem;
  background: url("../../assets/img/box-title.png") no-repeat;
  background-size: contain;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 10px;
}
</style>