<template>
  <el-dialog title="代理" :visible.sync="dialogVisible" width="1100px" :before-close="handleClose" class="agentProduct">
    <el-tabs v-model="checkType">
      <el-tab-pane label="产品" name="productList"></el-tab-pane>
      <el-tab-pane label="套餐" name="mealList"></el-tab-pane>
    </el-tabs>
    <section class="c-flex">
      <div class="flex-1 normalTable">
        <el-table :data="productData" ref="productTable" border style="width: 100%" v-loading="loading" highlight-current-row height="400px" @selection-change="selectProduct">
          <el-table-column type="selection" width="55" :selectable="checkSelectable">
          </el-table-column>
          <el-table-column type="expand" v-if="checkType=='mealList'">
            <template slot-scope="props">
              <div style="margin:0 10px">
                <el-table :data="props.row.childList" border style="width: 100%" highlight-current-row class="normalTable">
                  <el-table-column prop="productName" label="产品名称">
                  </el-table-column>
                  <el-table-column prop="productPrice" label="产品价格">
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="productPrice" label="产品价格">
          </el-table-column>
        </el-table>
        <div class="agentProduct-center">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="totalCount" style="float:right;">
          </el-pagination>
        </div>
      </div>
      <div class="agentProduct-btn">
        <div>
          <el-button type="primary" icon="el-icon-arrow-right" circle @click="setRight"></el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-arrow-left" circle @click="setLeft"></el-button>
        </div>
      </div>
      <div class="flex-1 normalTable">
        <el-table :data="productData_check" ref="productTable_check" border style="width: 100%" v-loading="loading_check" highlight-current-row height="400px" @selection-change="selectProduct_check">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="expand" v-if="checkType=='mealList'">
            <template slot-scope="props">
              <div style="margin:0 10px">
                <el-table :data="props.row.childList" border style="width: 100%" highlight-current-row class="normalTable">
                  <el-table-column prop="productName" label="产品名称">
                  </el-table-column>
                  <el-table-column prop="productPrice" label="产品价格">
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="productPrice" label="产品价格">
          </el-table-column>
          <el-table-column label="折扣价">
            <template slot-scope="scope">
              <el-input v-model="scope.row.discount" type="number"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="UpdateAndAgment" :disabled="loading_check&&loading" v-loading="saveLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "代理产品",

  name: "agentProduct",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number]
  },

  data() {
    return {
      checkType: "productList",
      form: {
        level: 1
      },
      productData: [],
      productData_check: [],
      loading: false,
      loading_check: false,
      saveLoading: false,
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        isSetMealT: false
      },
      totalCount: 10,
      multipleProduct: [],
      multipleProduct_check: []
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
      this.GetProductOrSetMealById();
    }
  },

  created() {
    this.GetProductOrSetMeal();
    this.GetProductOrSetMealById();
  },

  mounted() {},

  destroyed() {},

  methods: {
    checkSelectable(row) {
      return !this._.find(this.productData_check, {
        productId: row.productId
      });
    },
    setRight() {
      this.productData_check = this.productData_check.concat(
        this.multipleProduct
      );
      this.toggleSelection("productTable");
    },
    setLeft() {
      this.productData_check = this.productData_check.filter(p => {
        return !this._.find(this.multipleProduct_check, {
          productId: p.productId
        });
      });
      this.toggleSelection("productTable_check");
    },
    toggleSelection(type) {
      this.$refs[type].clearSelection();
    },
    selectProduct(val) {
      this.multipleProduct = val;
    },
    selectProduct_check(val) {
      this.multipleProduct_check = val;
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
    GetProductOrSetMealById() {
      this.loading_check = true;
      let data = {
        isSetMealT: this.checkType == "mealList",
        tenantId: this.checkId
      };
      Agment.GetProductOrSetMealById(data).then(
        res => {
          this.productData_check = res.result;
          this.loading_check = false;
        },
        () => {
          this.loading_check = false;
        }
      );
    },
    handleCurrentChange(val) {
      this.searchInfo.PageIndex = val;
      this.GetProductOrSetMeal();
    },
    handleSizeChange(val) {
      this.searchInfo.PageSize = val;
      this.GetProductOrSetMeal();
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    UpdateAndAgment() {
      let label = this.checkType == "mealList" ? "套餐" : "产品";
      let config = [
        {
          label,
          value: this.productData_check
            .map(p => p.productName + `(折扣价:${p.discount || 0})`)
            .join(" | ")
        }
      ];
      this.getConfirmHtml(config).then(res => {
        this.saveLoading = true;
        let data = {
          tenantId: this.checkId,
          productInputList: this.productData_check.map(p => {
            return {
              discount: p.discount,
              productId: p.productId
            };
          }),
          isSetMealT: this.checkType == "mealList"
        };
        Agment.UpdateAndAgment(data).then(
          res => {
            this.saveLoading = false;
            this.$confirm("操作成功, 是否继续?", "提示", {}).catch(() => {
              this.$emit("saveOk");
              this.handleClose();
            });
          },
          () => {
            this.saveLoading = false;
          }
        );
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.agentProduct-btn {
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  > div {
    margin-bottom: 20px;
  }
}
.agentProduct-center {
  display: flex;
  justify-content: center;
}
</style>
