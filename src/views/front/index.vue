<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in imageData" :key="item.id">
      <img :src="getUrl(item)" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { getFirst } from "@/api/goods/goods.js";
export default {
  data() {
    return {
      imageData: []
    };
  },
  created() {
    this.getFirst();
  },
  methods: {
    getFirst() {
      getFirst().then(response => {
        if (response.data.code == 0) {
          this.imageData = response.data.data;
        }
      });
    },
    getUrl(url){
        return "http://localhost:8888/"+url.picPath;
    }
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>