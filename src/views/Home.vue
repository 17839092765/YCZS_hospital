<template>
  <div class="home">
    <!-- <Footer /> -->
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
  components: {
    Header,
    Footer,
    Synthetical,
  },
};
</script>
