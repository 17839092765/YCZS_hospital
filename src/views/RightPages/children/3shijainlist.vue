<template>
  <div class="shijianlist">
    <div class="title">
      事件列表
    </div>
    <div class="shi_casebox">
      <div
        @click="tolooklou(item.key ? item.key : 0)"
        class="case"
        v-for="(item, index) in shidata"
        :key="index"
      >
        <div class="tit">{{ item.tit }}</div>
        <div class="bottom">
          <i class="right_fangxiang"></i>
          <span>
            {{ item.class }}
          </span>
          <span>
            {{ item.time }}
          </span>
          <span class="wancheng1" v-if="item.flag">
            <i class="wancheng"></i> 已处理
          </span>
          <span class="weiwancheng1" v-if="!item.flag">
            <i class="weiwancheng"></i> 未处理
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shidata: [
        {
          tit: "供电异常",
          class: "能效管理报警",
          time: "2021/04/19",
          flag: true,
        },
        {
          tit: "烟感异常",
          class: "消防报警",
          time: "2021/04/19",
          flag: false,
          key: 10,
        },
        {
          tit: "安防报警",
          class: "黑名单报警",
          time: "2021/04/18",
          flag: true,
        },
        {
          tit: "梯控异常",
          class: "设备管理报警",
          time: "2021/04/17",
          flag: true,
        },
        {
          tit: "资产非法外出",
          class: "设备管理报警",
          time: "2021/04/18",
          flag: true,
        },
        {
          tit: "门禁异常",
          class: "设备管理报警",
          time: "2021/04/16",
          flag: true,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    tolooklou(val) {
      let id4 = "wree"; //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
      let coord4 = [223.996337890625, 511.6087646484375, 152.8629608154297]; //坐标值：标签添加的位置
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

      console.log(val);
      let f = new BPFunctionData();
      f.objectName = "BP_BuildLayer_5";
      f.functionName = "Clicklayer";
      f.paramType = BPFuncParamType.Float;
      f.paramValue = val;

      __g.misc.callBPFunction(f, (e) => {
        console.log(e, 123213213);
        setTimeout(() => {
          __g.tag.add(o4);
        }, 3000);
      });
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
.shijianlist {
  margin-top: 0.5rem;
}
.title {
  font-weight: 600;
  width: 100%;
  height: 0.3rem;
  text-indent: 0.2rem;
  margin-bottom: 0.1rem;

  background: url("../../../assets/img/box-title.png") no-repeat center/cover;
}
.shi_casebox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .case {
    font-size: 0.14rem;
    width: 49%;
    height: 0.6rem;
    margin: 0.05rem 0;
    background: #162035b4;
    box-shadow: 0px 0px 4px 0px rgba(82, 181, 214, 1);
    .tit {
      width: 100%;
      height: 0.2rem;
      margin: 0.02rem 0.08rem;
    }
    .bottom {
      width: 100%;
      height: 0.5rem;
      position: relative;

      .right_fangxiang {
        position: absolute;
        top: 0.05rem;
        left: 0.02rem;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 0.05rem solid transparent;
        border-left: 0.05rem solid rgb(255, 255, 255);
        border-bottom: 0.05rem solid transparent;
        transform: scale(0.8);
      }
      .wancheng {
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        background: url("../../../assets/img/icon_已处理.png") no-repeat
          center/cover;
        transform: scale(2);
      }
      .wancheng1 {
        color: #00ffb8;
      }
      .weiwancheng1 {
        color: #fc474c;
      }
      .weiwancheng {
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        background: url("../../../assets/img/icon_未处理.png") no-repeat
          center/cover;
        transform: scale(2);
      }

      span {
        white-space: nowrap;
        width: 0.72rem;
        float: left;
        margin-left: 0.03rem;
        -webkit-transform: scale(0.85);
      }
      span:nth-of-type(1) {
        transform: scale(0.8);
      }
    }
  }
}
</style>
