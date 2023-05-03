<template>
  <div class="nav">
    <!-- <div class="box">
      <div class="head">
        <ul>
          <li>ID</li>
          <li>Name</li>
          <li class="ms">描述</li>
          <li class="">操作</li>
        </ul>
      </div>
      <div class="main" v-for="(item, index) in List" :key="index">
        <ul>
          <li>{{ item.id }}</li>
          <li>{{ item.name }}</li>
          <li>{{ item.description }}</li>
          <li></li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { RoleInfo } from "@/api/user.js";
export default {
  data() {
    return {
      List: [],
    };
  },
  methods: {
    // roleInfo() {
    //   var a = [];
    //   RoleInfo({}).then((res) => {
    //     res.map((item) => {
    //       console.log(res);
    //       this.List.id = item.id;
    //       this.name = item.name;
    //       this.description = item.description;
    //     });
    //   });
    
    // },
  },
  mounted() {
    this.roleInfo();
  },
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: rgb(233, 238, 243);
  z-index: -2;
}
.box {
  // display: flex;
  position: relative;
  top: 100px;
  left: 100px;
  width: 1500px;
  height: 800px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  .head {
    width: 1500px;
    height: 70px;
    background-color: rgb(242, 242, 242);
  }
  li {
    position: relative;
    float: left;
    font-size: 20px;
    margin-top: 20px;
    margin-left: 200px;
    right: 100px;
  }
}
.main {
  position: relative;
  width: 100%;
  height: 70px;
  background-color: pink;
  margin-top: 20px;
}
.ms {
  position: relative;
  left: -20px;
}
</style>