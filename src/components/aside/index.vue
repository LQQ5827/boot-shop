<template>
  <div>
    <!-- 菜单组件 -->
    <el-menu default-active="1" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
      <!-- 子菜单：用户管理 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="11" @click="navAdmin">用户管理</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group>
          <el-menu-item index="12" @click="navPwd">密码重置</el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>
      <!-- 子菜单：商品管理 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="21" @click="navCategory">商品分类</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="22" @click="navGoods">商品管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 子菜单：订单管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="31"  @click="navOrder">订单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 子菜单：会员管理 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="41"  @click="navUser">会员管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navAdmin() {
        if (this.$route.path != "/admin/admin") {
        this.$router.push({ path: "/admin/admin" });
      }
    },
    navGoods() {
      if (this.$route.path != "/admin/goods") {
        this.$router.push("/admin/goods");
      }
    },
    navCategory() {
      if (this.$route.path != "/admin/category") {
        this.$router.push({ path: "/admin/category" });
      }
    },
    navOrder() {
      if (this.$route.path != "/admin/order") {
        this.$router.push({ path: "/admin/order" });
      }
    },
    navUser() {
      if (this.$route.path != "/admin/user") {
        this.$router.push({ path: "/admin/user" });
      }
    }
  }
};
</script>

<style scoped>
.el-menu-vertical {
  height: 680px;
}
</style>