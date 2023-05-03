<template>
  <div id="box">
    <dv-decoration-8 style="width: 300px; height: 50px" class="left" />
    <dv-decoration-8
      :reverse="true"
      style="width: 300px; height: 50px"
      class="right"
    />
    <h1>校园舆情系统</h1>
    <dv-decoration-5 style="width: 400px; height: 40px" class="mid" />

    <router-link to="/admin">
      <dv-decoration-9
        style="width: 150px; height: 150px; position: absolute; z-index: 10"
        class="enter"
      >
      </dv-decoration-9>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#box {
  display: flex;
  float: left;
  z-index: 10;
}
.left {
  float: left;
  // position: absolute;
  margin-top: 20px;
  margin-left: 20px;
  z-index: 10;
}
.right {
  float: right;
  position: relative;
  margin-top: 20px;
  left: 105%;
  z-index: 10;
}
.mid {
  position: relative;
  margin: 60px auto;
  right: 50px;
  z-index: 10;
}
h1 {
  position: relative;
  margin: 20px auto;
  left: 250px;
  color: white;
  font-family: "微软雅黑", "黑体", "宋体";
  z-index: 10;
}
.enter {
  float: left;
  left: 0%;
}
</style>