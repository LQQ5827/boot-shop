<template>
  <div class="topRow">
    <!-- 商品分类 -->
    <el-row class="topRow">
      <el-button type="primary" @click="addCategory">添加分类</el-button>
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="categoryData">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <!-- 分类列表 -->
          <el-cascader :options="options" change-on-select @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="form.name" placeholder="输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
      
 <script>
import { add, getList, deleteCategory } from "@/api/admin/category.js";
export default {
  data() {
    return {
      title: "",
      dialogVisible: false,
      form: { id: "", name: "" },
      categoryData: [{ id: 1, name: "数码" }],
      options: [
      /*   {
          label:"数码",
          value:"1",
          children:[
            {
              label:"手机",
              value:"11"
            }
          ]
        
        } */
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addCategory() {
      this.dialogVisible = true;
    },
    handleEdit(index, rows) {
      this.dialogVisible = true;
      console.log(index + "->" + rows);
    },
    // 保存分类数据
    save() {
      if (this.form.id.length==0) {
        this.form.id = 0;
      }
      let category={name:this.form.name,parentId:this.form.id}
      add(category).then(resposne=>{
        if(resposne.data.code==0){
           this.dialogVisible = false;
        }
        alert(resposne.data.msg);
      });
    },
    getList() {
      let category = this;
      getList().then(response => {
        category.options = response.data.data;
        // console.log(response.data)
      });
    },
    handleDelete() {},
    handleClose() {
      this.dialogVisible = false;
    },
    handleChange(value) {
        this.form.id = value[value.length-1];
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