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
  height: 0.25rem;
  line-height:  0.25rem;
  background: url("../../assets/img/box-title.png") no-repeat;
  background-size: cover;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 15px;
}
</style>