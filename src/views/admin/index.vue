<template>
  <!-- 用户管理 -->
  <div>
    <el-row class="topRow">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="success" @click="batchDel">批量删除</el-button>
      <el-button type="warning" @click="pwdReset">密码重置</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="userData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 复选接钮 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="编号" prop="id" width="120"></el-table-column>
      <el-table-column prop="username" label="用户" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item v-if="showAdmin" label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重置密码对话框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="resetVisible"
      width="30%"
      :before-close="handleResetClose"
    >
      <el-form :model="adminPwd" label-width="80px">
        <el-form-item label="用户">{{adminPwd.username}}</el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="adminPwd.password" placeholder="输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetPwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  addAdmin,
  updateAdmin,
  getList,
  batchDelete,
  deleteAdmin,
  resetPassword
} from "@/api/admin/admin.js";
export default {
  data() {
    return {
      showAdmin: false,
      username: "admin",
      form: { id: "", username: "", createTime: "" },
      userData: [
        // { id: 1, username: "王小虎", createTime: "2019-08-13 15:00:00" },
        // { id: 2, username: "李小七", createTime: "2019-08-13 15:00:00" },
        // { id: 3, username: "张小八", createTime: "2019-08-13 15:00:00" }
      ],
      multipleSelection: [],
      title: "",
      adminPwd: { id: "", username: "", password: "" },
      dialogVisible: false,
      resetVisible: false
    };
  },
  created() {
    this.getAdminList();
  },
  methods: {
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑
    handleEdit(index, rows) {
      this.showAdmin = false;
      this.title = "编辑用户";
      this.form.id = rows.id;
      this.form.username = rows.username;
      this.dialogVisible = true;
      console.log(index + "->" + rows.username);
    },
    // 删除
    handleDelete(index, rows) {
      let admin = this;
      deleteAdmin(rows.id).then(response => {
        if (response.data.code == 0) {
          admin.userData.splice(index, 1);
        }
        alert(response.data.msg);
      });
      // this.userData.splice(index, 1);
      // console.log(
      //   index + "->" + rows.username + "size:" + this.userData.length
      
    },
    // 批量删除
    batchDel() {
      let ids = [];
      let admin = this;
      this.multipleSelection.forEach(element => {
        ids.push(element.id);
      });
      batchDelete(ids).then(response => {
        if (response.data.code == 0) {
          admin.getAdminList();
        }
        alert(response.data.msg);
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    save() {
      let admin = this;
      if (this.title == "添加用户") {
        let user = { username: "", password: "" };
        user.username = this.form.username;
        user.password = this.form.password;

        addAdmin(user).then(response => {
          alert(response.data.msg);
          admin.getAdminList();
        });
        this.dialogVisible = false;
      } else if (this.title == "编辑用户") {
        updateAdmin(this.form).then(response => {
          if (response.data.code == 0) {
            this.dialogVisible = false;
            admin.getAdminList();
          }
          alert(response.data.msg);
        });

        // this.userData.forEach(item => {
        //   if (item.id == this.form.id) {
        //     item.username = this.form.username;
        //     this.dialogVisible = false;
        //     return;
        //   }
        // });
      }
    },
    resetPwd() {
      let admin = this;
      resetPassword(this.adminPwd).then(response => {
        if (response.data.code == 0) {
          admin.resetVisible = false;
        }
        alert(response.data.msg);
      });
    },
    addUser() {
      this.showAdmin = true;
      this.form.id = "";
      this.form.username = "";
      this.title = "添加用户";
      this.dialogVisible = true;
    },
    handleResetClose() {
      this.resetVisible = false;
    },
    pwdReset() {
      if (this.multipleSelection.length > 1) {
        alert("只能选择一个用户");
      } else {
        this.multipleSelection[0];
        this.resetVisible = true;
        this.adminPwd.id = this.multipleSelection[0].id;
        this.adminPwd.username = this.multipleSelection[0].username;
      }
    },
    getAdminList() {
      let admin = this;
      getList().then(response => {
        admin.userData = response.data.data;
      });
    }
  }
};
</script>
<style scoped>
.topRow {
  margin-bottom: 10px;
  float: left;
}
</style>