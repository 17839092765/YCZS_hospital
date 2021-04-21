<template>
  <div v-show="flag" class="home">
    <Footer />
    <!-- <Synthetical /> -->
    <router-view></router-view>
    <Header />
    <div id="player"></div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Synthetical from "./Synthetical";
export default {
  name: "Home",
  data() {
    return {
      flag: true,
    };
  },
  components: {
    Header,
    Footer,
    Synthetical,
  },
};
</script>
<style lang="scss" scoped>
#player {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
