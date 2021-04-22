<template>
  <div class="baojing">
    <!-- <el-button @click="closeTag" type="warr">关闭</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "E:\\Freedo\\中山医院\\YCZS_hospital\\src\\assets\\video\\",
    };
  },
  computed: {},
  watch: {},
  methods: {
    addtag() {
      if (__g) {
        // 标签1
        let id1 = "SN-1"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
        let coord1 = [157.0021209716797, 495.4671325683594, 5.633554458618164]; //坐标值：标签添加的位置
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

        // 标签2
        let id2 = "SN-2-1"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
        let coord2 = [68.44316864013672, 504.0016174316406, 18.78484344482422]; //坐标值：标签添加的位置
        let imagePath2 = ""; //图片路径，可以是本地路径，也支持网络路径
        let url2 = ""; //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
        let imageSize2 = [28, 28]; //图片的尺寸
        let text2 = "正常"; //标签显示的文字
        let range2 = [1, 8000.0]; //标签的可见范围
        let showLine2 = true; //标签下方是否显示垂直牵引线

        let o2 = new TagData(
          id2,
          coord2,
          imagePath2,
          imageSize2,
          url2,
          text2,
          range2,
          showLine2
        );
        o2.textColor = [1, 1, 1, 1]; //设置文字颜色
        o2.textBackgroundColor = Color.Green;

        __g.tag.add(o2);

        // 标签3
        let id3 = "SN-2-2"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
        let coord3 = [
          132.87542724609375,
          414.29913330078125,
          21.959901809692383,
        ]; //坐标值：标签添加的位置
        let imagePath3 = ""; //图片路径，可以是本地路径，也支持网络路径
        let url3 = ""; //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
        let imageSize3 = [28, 28]; //图片的尺寸
        let text3 = "正常"; //标签显示的文字
        let range3 = [1, 8000.0]; //标签的可见范围
        let showLine3 = true; //标签下方是否显示垂直牵引线

        let o3 = new TagData(
          id3,
          coord3,
          imagePath3,
          imageSize3,
          url3,
          text3,
          range3,
          showLine3
        );
        o3.textColor = [0, 1, 0, 1]; //设置文字颜色
        o3.textBackgroundColor = Color.Green;

        __g.tag.add(o3);
        // 标签4
        let id4 = "SN-3-1"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
        let coord4 = [35.28773498535156, 504.0088195800781, 5.330683708190918]; //坐标值：标签添加的位置
        let imagePath4 = ""; //图片路径，可以是本地路径，也支持网络路径
        let url4 = ""; //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
        let imageSize4 = [28, 28]; //图片的尺寸
        let text4 = "正常"; //标签显示的文字
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
        o4.textBackgroundColor = Color.Green;
        __g.tag.add(o4);

        // 标签5
        let id5 = "SN-3-2"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
        let coord5 = [-51.29500198364258, 479.744873046875, 22.0240421295166]; //坐标值：标签添加的位置
        let imagePath5 = ""; //图片路径，可以是本地路径，也支持网络路径
        let url5 = this.path + "17-T7金宝贝南侧中.mp4"; //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
        let imageSize5 = [20, 20]; //图片的尺寸
        let text5 = "异常"; //标签显示的文字
        let range5 = [1, 8000.0]; //标签的可见范围
        let showLine5 = true; //标签下方是否显示垂直牵引线

        let o5 = new TagData(
          id5,
          coord5,
          imagePath5,
          imageSize5,
          url5,
          text5,
          range5,
          showLine5
        );
        o5.textColor = [1, 1, 1, 1]; //设置文字颜色
        o5.textBackgroundColor = Color.Red;

        __g.tag.add(o5);
        // 辐射圈5

        let coordinate5 = [
          -51.29500198364258,
          479.744873046875,
          22.0240421295166,
        ];
        let radius5 = 100;
        let rippleNumber5 = 2;
        let color5 = [1, 0, 1, 1];
        let brightness5 = 0.8;

        let oo5 = new RadiationPointData(
          "5",
          coordinate5,
          radius5,
          rippleNumber5,
          color5,
          brightness5
        );
        __g.radiationPoint.add(oo5);
      }
    },
    closeTag() {
      __g.radiationPoint.clear();
      __g.tag.clear();
      this.$store.commit("baojing", false);
    },
  },
  created() {},
  mounted() {
    this.addtag();
    __g.camera.lookAt(
      198.938278,
      801.998657,
      353.821777,
      -27.264795,
      124.205376,
      0
    );
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    __g.radiationPoint.clear();

    __g.tag.clear();

    this.$store.commit("baojing", false);
  },
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss" scoped>
.baojing {
  z-index: 100;
  /* position: absolute;
  width: 0.5rem;
  height: 0.3rem;
  background: rgb(196, 189, 189);
  top: 1rem;
  left: 1rem; */
  background: rgb(0, 255, 64);
}
</style>
