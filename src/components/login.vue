<template>
  <div>
    <dv-full-screen-container class="box">
      <Head></Head>
      <dv-border-box-1>
        <dv-flyline-chart
          :config="config"
          :dev="true"
          style="width: 100%; height: 100%; position: absolute"
          class="map" />
        <dv-decoration-12
          style="width: 150px; height: 150px; position: absolute"
          class="radar"
      /></dv-border-box-1>
      <dv-border-box-13 class="a">
        <dv-decoration-7
          style="width: 300px; height: 30px; position: absolute"
          class="login-text"
          >用户登陆</dv-decoration-7
        >
        <img src="../assets/用户 .png" alt="" class="user" />
        <img src="../assets/锁.png" alt="" class="lock" />
        <input
          type="text"
          placeholder="请输入账号"
          v-model.trim="username"
          class="login"
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="密码"
          v-model.trim="password"
          class="password"
        />
        <button @click="login" @keyup.enter="login">登陆</button>
      </dv-border-box-13>
    </dv-full-screen-container>
  </div>
</template>

<script>
import Head from "../components/head.vue";
import { Login } from "@/api/user.js";
export default {
  components: {
    Head,
  },
  data() {
    return {
      username: "",
      password: "",
      config: {
        centerPoint: [0.76, 0.55],
        points: [
          [0.83, 0.54],
          [0.8, 0.65],
          [0.78, 0.59],
          [0.74, 0.67],
          [0.68, 0.65],
          [0.72, 0.5],
          [0.69, 0.6],
          [0.43, 0.62],
          [0.51, 0.37],
          [0.52, 0.45],
          [0.56, 0.6],
          [0.7, 0.41],
          [0.64, 0.51],
        ],
        bgImgUrl: require("../assets/湖北省.png"),
      },
    };
  },
  methods: {
    login() {
      Login({
        userName: this.username,
        password: this.password,
      }).then((res) => {
        localStorage.setItem("token", res.data.token);
        this.$message({
          message: "恭喜你，登陆成功",
          type: "success",
        });
        this.$router.push({ path: "/index" });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  background-image: url(https://i.postimg.cc/B6mMd8c1/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.radar {
  left: 90%;
  top: 80%;
}
.login-text {
  color: white;
  font-size: 20px;
  margin: 5% 25%;
}
.light {
  margin: 9% 20%;
}

.a {
  position: absolute;
  width: 600px;
  height: 500px;
  left: 1200px;
  top: 280px;
}
.login {
  position: relative;
  width: 250px;
  height: 40px;
  top: 115px;
  margin: 0px 180px;
}
.password {
  position: relative;
  width: 250px;
  height: 40px;
  margin: 180px 180px;
}
input {
  border: 1px solid #fff;
  background-color: rgba(13, 56, 91, 0.3);
  border-radius: 130px;
  /* 增加磨砂质感 */
  backdrop-filter: blur(10px);
  outline-color: #4e6ef2;
  color: white;
  text-indent: 1rem;
}
.map {
  left: -700px;
  // top: 10px;
}
button {
  position: absolute;
  top: 380px;
  left: 180px;
  width: 250px;
  height: 50px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: rgba(0, 40, 209, 0.3);
  color: white;
  cursor: pointer;
  border-radius: 50px;
}
.lock {
  position: absolute;
  width: 5%;
  top: 45%;
  left: 25%;
}
.user {
  position: absolute;
  width: 5%;
  top: 24%;
  left: 25%;
}
</style>