<template>
  <section>
    <header class="agent-header">
      <el-button round type="primary" icon="el-icon-plus" @click="openDialog('')" size="medium">添加产品</el-button>
    </header>
    <el-table :data="productData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
      <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in productTable" :key="data.prop" v-if="data.checked">
        <template slot-scope="scope">
          <span v-if="data.prop=='status'"> {{scope.row[data.prop]?'上架':'下架'}}</span>
          <span v-else> {{scope.row[data.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="openDialog(scope.row.productId)">修改</el-button>
          <!-- <el-button type="text" size="mini" @click="deleteProduct(scope.row)">删除</el-button> -->
          <el-button type="text" size="mini" @click="upProduct(scope.row)">上架</el-button>
          <el-button type="text" size="mini" @click="downProduct(scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" style="float:right;">
    </el-pagination>
    <addProduct :dialogVisible.sync="addProductDialog" v-if="addProductDialog" @saveOk="GetProductOrSetMeal(1)" :productId="productId"></addProduct>
  </section>
</template>

<script>
import { productTable } from "@/utils/StaticData";
import addProduct from "./addProduct.vue";
import Agment from "@/services/agencyManagement/Agment";
export default {
  label: "产品管理",

  name: "productList",

  mixins: [],

  components: {
    addProduct
  },

  props: {},

  data() {
    return {
      loading: false,
      addProductDialog: false,
      productTable,
      productData: [],
      totalCount: 0,
      productId: "",
      searchInfo: {
        pageCount: 1,
        pageSize: 25,
        isSetMealT: false
      }
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.GetProductOrSetMeal();
  },

  destroyed() {},

  methods: {
    openDialog(productId) {
      this.productId = productId || "";
      this.addProductDialog = true;
      console.log("productId", this.productId);
    },
    GetProductOrSetMeal(pageCount) {
      this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount;
      this.loading = true;
      Agment.GetProductOrSetMeal(this.searchInfo).then(
        res => {
          this.productData = res.result.items;
          this.totalCount = res.result.totalCount;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    deleteProduct() {
      this.$confirm("是否删除此产品?", "提示", {}).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    upProduct(row) {
      let searchInfo = {
        id: row.productId,
        status: true
      };
      this.UpdateStatus(searchInfo);
    },
    downProduct(row) {
      let searchInfo = {
        id: row.productId,
        status: false
      };
      this.UpdateStatus(searchInfo);
    },
    //修改上下架状态
    UpdateStatus(searchInfo) {
      let message = searchInfo.status ? "上架" : "下架";
      this.$confirm(`是否${message}此产品?`, "提示", {}).then(() => {
        Agment.UpdateStatus(searchInfo).then(res => {
          this.$message({
            type: "success",
            message: message + "成功"
          });
          this.GetProductOrSetMeal();
        });
      });
    },
    handleCurrentChange(val) {
      this.searchInfo.pageCount = val;
      this.GetProductOrSetMeal();
    },
    handleSizeChange(val) {
      this.searchInfo.pageSize = val;
      this.GetProductOrSetMeal();
    }
  }
};
</script>
<style lang="scss" scoped>
.agent-header {
  padding: 0 10px 10px 0px;
}
</style>
