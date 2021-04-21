<template>
  <div class="synthetical">
    <div class="left part">
      <Left />
    </div>
    <div class="right part">
      <RightPages />
    </div>
    <FiveButton />
    <BaoJing v-if="baojing" />
    <RenyuanReli />
    <div @click="isShowTag = !isShowTag" class="button">隐藏按钮</div>
    <transition name="tag">
      <div v-if="isShowTag" class="tag">
        <div>
          <span>报警：</span>
          <span>监测到电梯报警</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Left from "../components/comSynthetical/Left";
import RightPages from "./RightPages";
import FiveButton from "./fivebutton";
import BaoJing from "./baojing";
import RenyuanReli from "./renyuanreli";
export default {
  name: "Synthetical",
  data() {
    return {
      isShowTag: false,
    };
  },
  computed: {
    ...mapState({
      baojing: (state) => state.baojing,
    }),
  },
  methods: {
    a() {
      let a = 10;
    },
  },
  mounted() {},
  beforeDestroy() {},
  components: {
    Left,
    RightPages,
    FiveButton,
    RenyuanReli,
    BaoJing,
  },
};
</script>

<style lang="scss" scoped>
.synthetical {
  // height: 95%;
  z-index: 10;
  .part {
    position: absolute;
    width: 5rem;
    height: 100%;
  }
  .left {
    z-index: 10;

    left: 0;
    background: linear-gradient(
      to left,
      rgba(7, 11, 26, 0) 0%,
      rgba(7, 11, 26, 0.7) 21%,
      rgba(7, 11, 26, 0.8) 100%
    );
    // opacity: 0.8;
  }
  .right {
    z-index: 10;

    width: 5rem;
    right: 0;
    background: linear-gradient(
      to right,
      rgba(7, 11, 26, 0) 0%,
      rgba(7, 11, 26, 0.7) 21%,
      rgba(7, 11, 26, 0.8) 100%
    );
    // opacity: 0.8;
  }
}
.button {
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 1;
  top: 400px;
  left: 500px;
  color: #ccc;
  // opacity: 0;
}
.tag {
  position: absolute;
  left: 5rem;
  top: 1rem;
  z-index: 1;
  width: 2.5rem;
  height: 0.25rem;
  padding-right: 10px;
  text-align: right;
  font-size: 16px;
  background-color: #72261e;
  overflow: hidden;
}
.tag-enter-active,
.tag-leave-active {
  transition: all 0.3s linear;
}

.tag-enter {
  width: 0;
}
.tag-leave {
  width: 2.5rem;
}
.tag-enter-to {
  width: 2.5rem;
}
.tag-leave-to {
  width: 0;
}
</style>
