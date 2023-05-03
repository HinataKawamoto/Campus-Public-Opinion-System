<template>
  <div>
    <dv-scroll-board
      :config="config"
      style="width: 600px; height: 220px; position: absolute; z-index: 10"
      class="scoll"
    />
    <dv-digital-flop
      :config="config"
      style="width: 500px; height: 50px; z-index: 10; position: absolute"
    />
    <div class="exit" @click="exit">退出</div>
    <div class="box">
      <p>今日不在学校人数</p>
      <p class="num">29</p>
    </div>
    <div class="box1">
      <p>活动参加次数不足人数</p>
      <p class="num">36</p>
    </div>
    <div class="box2">
      <p>成绩不合格人数</p>
      <p class="num">13</p>
    </div>
  </div>
</template>

<script>
import { Actv, Score } from "@/api/user.js";

export default {
  data() {
    return {
      config: {
        header: ["姓名", "学号", "报警原因"],
        data: [],
        index: true,
        columnWidth: [50],
        align: ["center"],
      },
    };
  },
  methods: {
    actv() {
      var a = [];
      Actv({
        pageNum: 0,
        pageSize: 0,
      }).then((res) => {
        this.config.data = res.list;
        for (var i in res.list) {
          var arr = [];
          arr[0] = res.list[i].name;
          arr[1] = res.list[i].stdid;
          arr[2] = res.list[i].result;
          // console.log(arr);
          a.push(arr);
        }
        //this.config.data.push(arr);
        this.config.data = a;
        this.config = { ...this.config };
        // console.log(this.config.data);
      });
    },
    score() {
      var a = [];
      Score({
        pageNum: 0,
        pageSize: 0,
      }).then((res) => {
        this.config.data = res.list;
        for (var i in res.list) {
          var arr = [];
          arr[0] = res.list[i].name;
          arr[1] = res.list[i].id;
          arr[2] = res.list[i].result;
          a.push(arr);
        }
        this.config.data = a;
        this.config = { ...this.config };
      });
    },
    exit() {
      localStorage.removeItem("token");
      this.$message({
        message: "退出成功",
        type: "success",
      });
      this.$router.push({ path: "/login" });
    },
  },
  mounted() {
    this.score();
    this.actv();
  },
};
</script>

<style lang="less" scoped>
.scoll {
  left: 68%;
  top: 11%;
}
.exit {
  float: right;
  position: relative;
  z-index: 10;
  right: 80px;
  top: 10px;
  cursor: pointer;
  font-size: 20px;
  color: white;
}
.box {
  float: right;
  width: 200px;
  height: 70px;
  position: absolute;
  top: 4%;
  left: 68%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  p {
    color: rgb(78, 110, 187);
    font-size: 20px;
  }
  .num {
    font-size: 30px;
    color: rgb(114, 181, 190);
  }
}
.box1 {
  float: right;
  width: 200px;
  height: 70px;
  position: absolute;
  top: 4%;
  left: 79%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  p {
    color: rgb(78, 110, 187);
    font-size: 20px;
  }
  .num {
    font-size: 30px;
    color: rgb(114, 181, 190);
  }
}
.box2 {
  float: right;
  width: 200px;
  height: 70px;
  position: absolute;
  top: 4%;
  left: 90%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  p {
    color: rgb(78, 110, 187);
    font-size: 20px;
  }
  .num {
    font-size: 30px;
    color: rgb(114, 181, 190);
  }
}
</style>