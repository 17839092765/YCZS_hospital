<template>
  <div v-show="flag" class="home">
    <Footer />
    <Synthetical />
    <Header />
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
