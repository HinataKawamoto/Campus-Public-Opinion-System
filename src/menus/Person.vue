<template>
  <div class="left">
    <ul>
      <router-link to="/index"
        ><img src="../assets/any2.png" alt="" class="any2"
      /></router-link>
      <li class="sy">
        <img src="../assets/首页.png" alt="" class="zy" />
        <router-link to="/admin/homepage"> 首页</router-link>
      </li>
      <li class="lb">
        <img src="../assets/文章蓝.png" alt="" class="wz" /><router-link
          to="/admin/article"
          >发布文章</router-link
        >
      </li>
      <li class="lb">
        <img src="../assets/留言.png" alt="" class="ly" />
        <router-link to="/admin/board">留言管理</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.left {
  position: absolute;
  background-color: rgb(0, 30, 52);
  height: 100%;
  width: 220px;
  left: 0px;
  top: 0px;
}
.sy {
  margin-top: 160px;
  text-align: center;
  font-size: 18px;
}
.lb {
  margin-top: 50px;
  text-align: center;
  font-size: 18px;
}
.router-link-active {
  color: rgb(255, 208, 75);
}
a {
  text-decoration: none;
  color: white;
}
/* a链接代表routerlink颜色 */
a:hover {
  color: rgb(255, 208, 75);
}
.zy {
  position: absolute;
  width: 9%;
  left: 68px;
  top: 162px;
}
.wz {
  position: absolute;
  width: 10%;

  left: 50px;
}
.any2 {
  position: absolute;
  width: 30%;
  top: 40px;
  left: 70px;
}
.ly {
  position: absolute;
  width: 14%;
  top: 305px;
  left: 40px;
}
</style>