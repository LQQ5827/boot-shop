<template>
  <!-- 商品管理 -->
  <div>
    <el-row class="topRow">
      <el-col :span="6">
        <!-- 分类列表 -->
        <el-cascader :options="options" class="category"></el-cascader>
      </el-col>
      <el-col :span="6">
        <el-input v-model="keyword"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="success" class="search">查询</el-button>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="goodsData" tooltip-effect="dark" style="width: 100%">
      <!-- 复选接钮 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="订单编号" prop="id" width="120"></el-table-column>
      <el-table-column prop="username" label="会员" width="120"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="categoryName" label="商品分类" width="120"></el-table-column>
      <el-table-column prop="state" label="订单状态" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === '已付款' ? 'primary' : 'success'"
            close-transition
          >{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template>
          <el-button size="mini" type="primary">发货</el-button>
          <el-button size="mini" type="success">订单完成</el-button>
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
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-cascader :options="options"></el-cascader>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="isUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      total: 25,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      isUpload: false,
      form: { id: "", goodsName: "" },
      title: "",
      options: [
        {
          label: "已付款",
          value: "1"
        },
        {
          label: "未付款",
          value: "2"
        },
        {
          label: "未发货",
          value: "3"
        }
      ],
      goodsData: [
        {
          id: "1",
          username: "张三",
          goodsName: "华为手机",
          categoryName: "数码/手机",
          state: "已发货"
        },
        {
          id: "2",
          username: "李四",
          goodsName: "小米手机",
          categoryName: "数码/手机",
          state: "已付款"
        }
      ]
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    addGoods() {
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      console.log(file);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
.topRow {
  margin-bottom: 10px;
  float: left;
}
.category {
  margin-right: 10px;
}
.search {
  margin-left: 10px;
}
</style>