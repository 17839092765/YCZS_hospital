<template>
  <div class="fivebutton">
    <div
      :class="active === item.key && 'active'"
      v-for="(item, index) in btnlist"
      :key="index"
      @click="interactive(item.key)"
    >
      <!-- {{ item.name }} -->
      <img v-if="active === item.key" :src="item.clickpath" alt="" />
      <img v-else :src="item.path" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      btnlist: [
        {
          name: "医院报警系统",
          key: 1,
          path: require("../../assets/img/icon_报警1.png"),
          clickpath: require("../../assets/img/icon_报警2.png"),
        },
        {
          name: "视频监控系统",
          key: 2,
          path: require("../../assets/img/icon_摄像头1.png"),
          clickpath: require("../../assets/img/icon_摄像头2.png"),
        },
        {
          name: "人脸识别",
          key: 3,
          path: require("../../assets/img/icon_人脸1.png"),
          clickpath: require("../../assets/img/icon_人脸2.png"),
        },
        {
          name: "火灾报警系统",
          key: 4,
          path: require("../../assets/img/icon_热力1.png"),
          clickpath: require("../../assets/img/icon_热力2.png"),
        },
        {
          name: "门禁管理系统",
          key: 5,
          path: require("../../assets/img/icon_门禁1.png"),
          clickpath: require("../../assets/img/icon_门禁2.png"),
        },
        {
          name: "区域客流分析系统",
          key: 6,
          path: require("../../assets/img/icon_热力1.png"),
          clickpath: require("../../assets/img/icon_热力2.png"),
        },
        {
          name: "梯控",
          key: 7,
          path: require("../../assets/img/icon_专梯1.png"),
          clickpath: require("../../assets/img/icon_专梯2.png"),
        },
      ],
      active: 1,
    };
  },
  computed: {
    ...mapState({
      chailouFalg: (state) => state.chailouFalg,
    }),
  },
  watch: {},
  methods: {
    interactive(active) {
      this.$store.commit("baojing", false);

      this.active = active;
      switch (active) {
        case 1:
          console.log(1);
          this.$store.commit("baojing", true);

          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          this.reli();

          break;
        case 7:
          this.dianti();
          break;
        default:
          break;
      }
    },
    // 拆楼
    reli() {
      this.$store.commit("chailouFalg", true);
      let f = new BPFunctionData();
      f.objectName = "BP_BuildLayer_5";
      f.functionName = "Openlayer";
      f.paramType = BPFuncParamType.String;
      f.paramValue = "True";
      __g.misc.callBPFunction(f);
    },

    // 电梯
    async dianti() {
      if (__g) {
        console.log(1);
        /* 
         1）点击【电梯】，时间变夜晚，同时箭头所指楼宇变X光模式；  镜头正视建筑，并叠加电梯3dt.
        （2）在红色异常电梯上，打红色异常电梯标签【住院楼-5F-医梯】   点击首页需回到默认初始视角和状态。
        */
        /* 设置时间 */
        // await __g.weather.setDateTime(2021, 4, 22, 23, 0, 0, false);
        /* X光模式 */
        await __g.tileLayer.enableXRay(
          "01CC25A649555B383446ED9CF9FC6ED1",
          Color.LightBLue
        );
        /* 镜头正视建筑 */
        // await __g.camera.set(
        //   168.938278,
        //   761.998657,
        //   243.821777,
        //   -27.264795,
        //   84.205376,
        //   0
        // );
        /* 打红色异常电梯标签【住院楼-5F-医梯】 */
        let o = new TagData("tag1");
        o.coordinate = [495269.37, 2491073.25, 25.4];
        o.imagePath = HostConfig.Path + "/images/tag.png";
        o.url = HostConfig.Path + "/int_popup.html";
        o.imageSize = [28, 28];
        o.text = "北京银行";
        o.range = [1, 8000.0];
        o.textRange = 3000;
        o.showLine = true;
        o.textColor = Color.Black;
        o.textBackgroundColor = Color.White;
        o.hoverImagePath = HostConfig.Path + "/images/hilightarea.png";
        // await __g.tag.add(o);
        __g.tag.focus(o.id, 200, 0);
      }
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
.fivebutton {
  z-index: 10;

  position: absolute;
  left: 5rem;
  bottom: 1rem;
  width: 1rem;
  // height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // background: #000;
  > div {
    width: 0.66rem;
    height: 0.53rem;
    background: url("../../assets/img/iconmenu_defaultbg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div.active {
    background: url("../../assets/img/iconmenu_choosed.png") no-repeat;
    background-size: cover;
  }
}
</style>
