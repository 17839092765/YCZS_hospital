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
      path: "E:\\Freedo\\中山医院\\YCZS_hospital\\src\\assets\\video\\",
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
      __g.tag.clear();
      if (this.$store.state.chailouFalg) {
        let f = new BPFunctionData();
        f.objectName = "BP_BuildLayer_5";
        f.functionName = "Openlayer";
        f.paramType = BPFuncParamType.String;
        f.paramValue = "True";
        __g.misc.callBPFunction(f);
        this.$store.commit("chailouFalg", false);
      }
      // __g.camera.lookAt(
      //   168.938278,
      //   761.998657,
      //   253.821777,
      //   -27.264795,
      //   104.205376,
      //   0
      // );
      this.$store.commit("baojing", false);
      __g.weather.setDateTime(2021, 4, 22, 16, 0, 0, false);
      let f = new BPFunctionData();
      f.objectName = "BP_BuildLayer_5";
      f.functionName = "SetXLight";
      f.paramType = BPFuncParamType.String;
      f.paramValue = "False";
      __g.misc.callBPFunction(f);

      this.active = active;
      switch (active) {
        case 1:
          console.log(1);
          this.$store.commit("baojing", true);

          break;
        case 2:
          this.reli();
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          this.menjin();

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
    // 门禁
    menjin() {
      __g.camera.lookAt(
        168.938278,
        761.998657,
        353.821777,
        -27.264795,
        84.205376,
        0
      );
      if (!this.$store.state.chailouFalg) {
        let f = new BPFunctionData();
        f.objectName = "BP_BuildLayer_5";
        f.functionName = "Openlayer";
        f.paramType = BPFuncParamType.String;
        f.paramValue = "True";
        __g.misc.callBPFunction(f);
        this.$store.commit("chailouFalg", true);
      }
      // 标签1
      let id1 = "SN-1111"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
      let coord1 = [
        230.70632934570312,
        515.3101196289062,
        -0.000009765624781721272,
      ]; //坐标值：标签添加的位置
      let imagePath1 = ""; //图片路径，可以是本地路径，也支持网络路径
      let url1 = this.path + "16-大西门云台.mp4"; //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
      let imageSize1 = [28, 28]; //图片的尺寸
      let text1 = "正常"; //标签显示的文字
      let range1 = [1, 8000.0]; //标签的可见范围
      let showLine1 = true; //标签下方是否显示垂直牵引线

      let o1 = new TagData(
        id1,
        coord1,
        imagePath1,
        imageSize1,
        url1,
        text1,
        range1,
        showLine1
      );
      o1.textColor = [1, 1, 1, 1]; //设置文字颜色
      o1.textBackgroundColor = Color.Green;

      __g.tag.add(o1);
    },
    // 拆楼
    reli() {
      if (!this.$store.state.chailouFalg) {
        let f = new BPFunctionData();
        f.objectName = "BP_BuildLayer_5";
        f.functionName = "Openlayer";
        f.paramType = BPFuncParamType.String;
        f.paramValue = "True";
        __g.misc.callBPFunction(f);
        this.$store.commit("chailouFalg", true);
      }
      __g.camera.lookAt(
        168.938278,
        761.998657,
        453.821777,
        -27.264795,
        84.205376,
        0
      );
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
        await __g.weather.setDateTime(2021, 4, 22, 23, 0, 0, false);

        let f = new BPFunctionData();
        f.objectName = "BP_BuildLayer_5";
        f.functionName = "SetXLight";
        f.paramType = BPFuncParamType.String;
        f.paramValue = "True";
        __g.misc.callBPFunction(f);

        __g.camera.lookAt(
          168.938278,
          761.998657,
          253.821777,
          -27.264795,
          84.205376,
          0
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
        // 标签4
        let id4 = "5FF"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
        let coord4 = [202.37767028808594, 481.6473083496094, 22.59228515625]; //坐标值：标签添加的位置
        let imagePath4 = ""; //图片路径，可以是本地路径，也支持网络路径
        let url4 = ""; //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
        let imageSize4 = [28, 28]; //图片的尺寸
        let text4 = "异常"; //标签显示的文字
        let range4 = [1, 8000.0]; //标签的可见范围
        let showLine4 = true; //标签下方是否显示垂直牵引线

        let o4 = new TagData(
          id4,
          coord4,
          imagePath4,
          imageSize4,
          url4,
          text4,
          range4,
          showLine4
        );
        o4.textColor = [1, 1, 1, 1]; //设置文字颜色
        o4.textBackgroundColor = Color.Red;
        __g.tag.add(o4);
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
