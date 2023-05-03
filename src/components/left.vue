<template>
  <div>
    <dv-scroll-ranking-board
      :config="config"
      style="width: 500px; height: 300px; position: absolute; z-index: 10"
      class="rank"
    />
  </div>
</template>

<script>
import { Avg } from "@/api/user.js";
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "",
            value: 0,
          },
        ],
      },
    };
  },
  methods: {
    avg() {
      Avg({}).then((res) => {
        this.config.data = res.map((item) => {
          // console.log(item);
          return {
            name: item.academy,
            value: item.avgscore,
          };
        });
        this.config = { ...this.config };
      });
    },
  },
  mounted() {
    this.avg();
  },
};
</script>

<style lang='less' scoped>
.rank {
  left: 1%;
  top: 65%;
}
.a {
  position: relative;
  z-index: 10;
}
</style>