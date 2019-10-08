<template>
  <!-- 商品管理 -->
  <div>
    <el-row class="topRow">
      <el-button type="primary" @click="addGoods">添加商品</el-button>
      <el-button type="success">上架</el-button>
      <el-button type="info">批量删除</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="goodsData" tooltip-effect="dark" style="width: 100%">
      <!-- 复选接钮 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="编号" prop="id" width="120"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="categoryName" label="商品类别" width="120"></el-table-column>
      <el-table-column prop="stock" label="库存" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
      <el-table-column prop="state" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === '1' ? 'primary' : 'success'"
            close-transition
          >{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template>
          <el-button size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-cascader :options="options" change-on-select @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            ref="upload"
            action="http://localhost:8888/goodsPic"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handlePictureSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { addGoods, getListPage } from "@/api/goods/goods.js";
import { deletePic } from "@/api/goods/goodsPic.js";
import { getList } from "@/api/admin/category.js";
export default {
  data() {
    return {
      total: 25,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      isUpload: false,
      form: {
        id: "",
        name: "",
        price: "",
        stock: "",
        categoryId: "",
        pics: ""
      },
      images: [],
      title: "",
      goodsData: [],
      options: [ ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let pageData = { currentPage: this.currentPage, pageSize: this.pageSize };
      let goods = this;
      getListPage(JSON.stringify(pageData)).then(response => {
        goods.goodsData = response.data.data.data;
        goods.total = response.data.data.total;
        // console.log(response.data.data)
      });
    },
    save() {
      addGoods(this.form).then(response => {
        if(response.data.code==0){
           this.dialogVisible = false;
        }
      });
    },
    handleChange(value) {
      this.form.categoryId = value[value.length - 1];
    },
    handleClose() {
      this.dialogVisible = false;
    },
    addGoods() {
       getList().then(response => {
        this.options = response.data.data;
        // console.log(response.data)
      });
      this.dialogVisible = true;
    },
    handlePictureSuccess(response, file) {
      // 图片内容
      // console.log( URL.createObjectURL(file.raw));
      // 向数组添加图片
      this.images.push(response.msg);
      this.form.pics = JSON.stringify(this.images);
      console.log(this.form.pics);
      console.log(response.msg);
    },
    // 移除图片
    handleRemove(file, fileList) {
      // 删除数据
      this.images.forEach((item, index) => {
        if (file.response.msg == item) {
          this.images.splice(index, 1);
        }
      });

      deletePic(file.response.msg).then(res => {
        if (res.data.code == 0) {
          alert("删除成功");
        }
      });
      this.form.pics = JSON.stringify(this.images);
      console.log(this.form.pics);
      console.log(file.response.msg);
      console.log(file, fileList);
    },
    // 浏览图片
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      console.log(file);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.getList();
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