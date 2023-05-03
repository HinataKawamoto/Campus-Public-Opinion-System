<template>
  <dv-full-screen-container class="box">
    <dv-border-box-1 class="border">
      <Head></Head>
      <Map></Map>
      <Right></Right>
      <Left></Left>
    </dv-border-box-1>
  </dv-full-screen-container>
</template>

<script>
import Head from "../components/head.vue";
import Map from "../components/map.vue";
import Right from "../components/right.vue";
import Left from "../components/left.vue";
export default {
  components: {
    Head,
    Map,
    Right,
    Left,
  },
};
</script>

<style lang="less" scoped>
.box {
  // background-image: url(https://i.postimg.cc/B6mMd8c1/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.border {
  position: absolute;
  z-index: 10;
}
</style>