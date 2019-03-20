<template>
  <el-dialog title="选择产品" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent" :append-to-body="true">
    <el-tabs v-model="checkType">
      <el-tab-pane label="产品管理" name="productList" v-if="lists.includes('productList')"></el-tab-pane>
      <el-tab-pane label="套餐管理" name="mealList" v-if="lists.includes('mealList')"></el-tab-pane>
    </el-tabs>
    <div style=" max-height:500px;overflow: auto;">
      <el-table :data="productData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column type="expand" v-if="checkType=='mealList'">
          <template slot-scope="props">
            <div style="margin-left: 45px;width:700px;">
              <el-table :data="props.row.childList" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
                <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in productTable" :key="data.prop" v-if="data.checked">
                  <template slot-scope="scope">
                    <span v-if="data.prop=='status'"> {{scope.row[data.prop]?'上架':'下架'}}</span>
                    <span v-else> {{scope.row[data.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in productTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <span v-if="data.prop=='status'"> {{scope.row[data.prop]?'上架':'下架'}}</span>
            <span v-else> {{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="60" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="checked(scope.row)" :disabled="ifHave(scope.row.productId)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="totalCount" style="float:right;">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import Agment from "@/services/agencyManagement/Agment";
import { productTable } from "@/utils/StaticData";

export default {
  label: "添加产品到套餐",

  name: "addProductToMeal",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    productList: Array,
    lists: {
      type: [Array, String],
      default: ["productList"]
    }
  },

  data() {
    return {
      loading: false,
      productTable,
      productData: [],
      totalCount: 0,
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        isSetMealT: false
      },
      checkType: "productList"
    };
  },

  computed: {},

  watch: {
    checkType: function(val) {
      this.searchInfo = {
        pageCount: 1,
        pageSize: 10,
        isSetMealT: val == "mealList"
      };
      this.GetProductOrSetMeal();
    }
  },
  mounted() {
    this.GetProductOrSetMeal();
  },

  destroyed() {},

  methods: {
    ifHave(productId) {
      return Boolean(this._.find(this.productList, { productId, productId }));
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    checked(row) {
      let data = JSON.parse(JSON.stringify(row));
      this.$set(data, "checkType", this.checkType);
      this.$emit("checked", data);
    },
    GetProductOrSetMeal() {
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
.addMeal-addproduct {
  text-align: right;
  padding-bottom: 10px;
}
.addAgent-card {
  border-left: 8px solid #2a2a3f;
  background-color: #f8f8f9;
  height: 90px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.addAgent-card-type {
  font-size: 16px;
  color: #666666;
  letter-spacing: 0;
  margin-left: 15px;
}
.addAgent-card-content {
  margin-left: 15px;
}
</style>
