<template>
  <div class="nav">
    <div class="nav-div">
      <div class="div-title">
        <router-link to="/admin/homepage"><strong>首页</strong></router-link>
        <p class="fb">>留言管理</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
};
</script>

<style scoped>
.nav {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: rgb(233, 238, 243);
  z-index: -2;
}
.nav {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: rgb(233, 238, 243);
  z-index: -2;
}
.nav-div {
  position: absolute;
  width: 85%;
  height: 60%;
  left: 260px;
  top: 120px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}
.div-title {
  width: 100%;
  height: 10%;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

a {
  position: absolute;
  top: 20px;
  left: 10px;
  font-size: 15;
  color: black;
}
.fb {
  position: absolute;
  top: 21px;
  left: 45px;
  font-size: 15px;
  color: rgb(92, 96, 108);
}
</style>