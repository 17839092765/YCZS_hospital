<template>
  <div class="shijianlist">
    <div class="title">
      事件列表
    </div>
    <div class="shi_casebox">
      <div class="case" v-for="(item, index) in shidata" :key="index">
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
      span:last-child {
      }
      span {
        float: left;
        margin-left: 0.02rem;
        -webkit-transform: scale(0.85);
      }
    }
  }
}
</style>
