<template>
  <div class="videoTv">
    <div class="title">
      视频监控
    </div>
    <div class="case_box">
      <div class="case" v-for="(item, index) in video" :key="index">
        <div class="viddata"></div>
        <div class="tit">
          <i></i>
          <span>{{ item.tit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video: [
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
        {
          tit: "综合楼北门",
          video: "",
        },
      ],
    };
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
  components: {},
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 0.3rem;
  text-indent: 0.2rem;
  background: url("../../../assets/img/box-title.png") no-repeat center/cover;
}
.case_box {
  width: 100%;
  height: 2.3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .case {
    width: 1.1rem;
    height: 1.2rem;
    .viddata {
      width: 100%;
      background: #000;
      height: 70%;
    }
    .tit {
      margin: 0.1rem 0;
      font-size: 0.14rem;
      padding-left: 0.03rem;
      > i {
        display: inline-block;
        width: 0.08rem;
        height: 0.08rem;
        background: #00ffb8;
        border-radius: 50%;
        margin: 0 0.03rem;
      }
    }
  }
}
</style>
