<template>
  <div class="jidian">
    <div class="title">
      机电设备
    </div>
    <div class="shebeilist">
      <el-dropdown size="mini" split-button type="primary">
        设备列表
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>1</el-dropdown-item>
          <el-dropdown-item>2</el-dropdown-item>
          <el-dropdown-item>3</el-dropdown-item>
          <el-dropdown-item>4</el-dropdown-item>
          <el-dropdown-item>5</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="databox">
      <div class="left">
        <div class="pic">
          <img src="../../../assets/img/设备.png" alt="新风机组" />
        </div>
        <div class="left_case">
          <div class="tit">
            {{ shebeidata.tit }}
          </div>
          <div class="shebeicase">
            <div class="top">
              <i></i>
              <span>设备详情</span>
            </div>
            <div class="data">
              {{ shebeidata.case }}
            </div>
          </div>
          <div class="shebeichang">
            <div class="top">
              <i></i>
              <span>设备厂家</span>
            </div>
            <div class="data">
              {{ shebeidata.chang }}
            </div>
          </div>
          <div class="shebeitime">
            <div class="top">
              <i></i>
              <span>建成时间</span>
            </div>
            <div class="data">
              {{ shebeidata.time }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="case">
          <div class="pic">
            <img src="../../../assets/img/icon_设备总数.png" alt="" />
          </div>
          <div class="data">
            <div class="tit">设备总数</div>
            <p>
              <span>
                {{ shebeidata.num }}
              </span>
              <span>台</span>
            </p>
          </div>
        </div>
        <div class="case">
          <div class="pic">
            <img src="../../../assets/img/icon_使用率.png" alt="" />
          </div>
          <div class="data">
            <div class="tit">使用率</div>
            <p>
              <span>
                {{ shebeidata.shiyong }}
              </span>
              <span>%</span>
            </p>
          </div>
        </div>
        <div class="case">
          <div class="pic">
            <img src="../../../assets/img/icon_运行总数.png" alt="" />
          </div>
          <div class="data">
            <div class="tit">设备运行总数</div>
            <p>
              <span>
                {{ shebeidata.yunxingnum + "/" + shebeidata.num }}
              </span>
              <span>台</span>
            </p>
          </div>
        </div>
        <div class="case">
          <div class="pic">
            <img src="../../../assets/img/icon_维护时间.png" alt="" />
          </div>
          <div class="data">
            <div class="tit">维护时间</div>
            <p>
              <span>
                {{ shebeidata.weihu }}
              </span>
              <span></span>
            </p>
          </div>
        </div>
        <div class="case">
          <div class="pic">
            <img src="../../../assets/img/icon_人员编号.png" alt="" />
          </div>
          <div class="data">
            <div class="tit">维护人员编号</div>
            <p>
              <span>
                {{ shebeidata.bianhao }}
              </span>
              <span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shebeidata: {
        tit: "新风机组",
        case: "设备详情设备详情设备详情设备详情",
        chang: "设备厂家名称",
        time: "2020/07/11",
        num: 218,
        shiyong: 76,
        yunxingnum: 154,
        weihu: "2020/03/31",
        bianhao: "011120383713",
      },
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
.jidian {
  position: relative;
  margin-top: 0.3rem;
  .title {
    width: 100%;
    height: 0.3rem;
    text-indent: 0.2rem;
    background: url("../../../assets/img/box-title.png") no-repeat center/cover;
  }
  .shebeilist {
    position: absolute;
    top: 0.01rem;
    right: 0.01rem;
  }
  .databox {
    font-size: 0.14rem;
    width: 100%;
    height: 2.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      .pic {
        margin: 0.1rem 0.1rem;
        width: 1.3rem;
        height: 100%;
        align-items: center;
        display: flex;
        align-items: center;

        img {
          width: 100%;
        }
      }
      .left_case {
        > div {
          margin: 0.1rem 0;
        }
        height: 0.8rem;
        i {
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background: #b768f1;
          margin: 0 0.02rem;
        }
        span {
          color: #5cccee;
        }
        .tit {
          font-size: 0.18rem;
          margin-bottom: 0.07rem;
        }
        .data {
          padding-left: 0.15rem;
        }
      }
    }
    .right {
      font-size: 0.14rem;
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .case {
        width: 50%;
        height: 0.5rem;
        /* display: flex;
        justify-content: space-between;
        align-items: flex-start; */
        .pic {
          width: 22%;
          float: left;
          img {
            width: 80%;
          }
        }
        .data {
          width: 78%;
          float: left;
          > p {
            margin-top: 0.01rem;
            white-space: nowrap;
            span:nth-of-type(1) {
              font-size: 0.18rem;
              color: #0e9eff;
            }
            span:nth-of-type(2) {
              font-size: 0.16rem;
              color: #5dcff1;
            }
          }
        }
      }
    }
  }
}
.el-button,
.el-button--primary,
.el-button--mini {
  background-color: #40a0ff00 !important;
}
</style>
