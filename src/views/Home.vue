<template>

  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-image style="width: 210px; height: 54px" :src="url"></el-image>
          
        </el-col>
        <el-col class="logout" :span="12">
          <template>
            <div class="navOperater">
              <el-link type="info">退出系统</el-link>
            </div>
            <div class="navOperater">
              <el-avatar
                class="avatar"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566509402562&di=7a9691bd31f234607d929fd24604481c&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-f34145b01ab1d5bb463cac35ddc9777d_hd.jpg"
              ></el-avatar>
            </div>
          </template>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <Aside />
      </el-aside>
      <!-- 内容区 -->
      <el-main>
        <template>
          <router-view />
        </template>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// 导入组件
import Aside from "@/components/aside/index.vue";

export default {
  name: "home",
  components: {
    Aside
  },
  data() {
    return {
      // url: "/logo.png",
      url: "/a.jpg",
      fits: ["fill", "contain", "cover", "none", "scale-down"]
    };
  }
};
</script>
<style lang="scss" scoped>
body > .el-container {
  margin-bottom: 40px;
  
}

.container {
  height: 780px;
  
}
.el-header {
  text-align: left;
  background-color: white;
  .logout {
    text-align: right;
    .navOperater {
      width: 80px;
      height: 80px;
      float: right;
      line-height: 50px;
    }
  }
}
.el-main {
  background-color: #e9eef3;
  text-align: center;
  // background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566022330476&di=cb8d8b9fea906aa717147ee295edf153&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F00%2F05%2F12%2F605625ecebb7902.JPG");

}
</style>
