<template>
  <el-dialog title="新增订单" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent">
    <section>
      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">选择客户 <span style="font-size:12px">(可输入搜索)</span> </div>
          <div class="addAgent-card-content">
            <el-select v-model="form.customerId" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="GetCustomer" :loading="loading" @change="changeCustomer">
              <el-option v-for="(item,i) in customerData" :key="i" :label="item.companyName" :value="item.customerId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">账号余额</div>
          <div class="addAgent-card-content">
            {{CompanAmount}}
          </div>
        </div>
      </div>
      <div class="addAgent-card">
        <div class="addAgent-card-type">详情（备注）</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入详情" v-model="form.orderDetail" type="textarea" :rows="2" resize="none"></el-input>
        </div>
      </div>
    </section>
    <section>
      <div class="c-flex" style="margin:10px 0">
        <span class="flex-1">产品</span>
        <el-button round type="primary" icon="el-icon-plus" size="mini" @click="addProductToMealDialog=true">添加</el-button>
      </div>
      <el-table :data="form.orderProductList" border style="width: 100%" highlight-current-row class="normalTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div style="margin-left: 45px" v-if="props.row.checkType=='mealList'">
              <el-table :data="props.row.childList" border style="width: 100%" highlight-current-row class="normalTable">
                <el-table-column prop="productName" label="产品名称">
                </el-table-column>
                <el-table-column prop="productPrice" label="单价">
                </el-table-column>
              </el-table>
            </div>
            <div v-else class="addOrder-mess">
              只有套餐有产品列表
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称/套餐">
        </el-table-column>
        <el-table-column prop="productPrice" label="单价">
        </el-table-column>
        <el-table-column label="产品数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.productNum" :min="1" controls-position="right" style="width:100px"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="产品年数">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.productTimeNum" :min="1" controls-position="right" style="width:100px" v-if="scope.row.checkType=='productList'"></el-input-number>
            <span v-else>----</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" v-loading="saveLoading">确 定</el-button>

    </span>
    <addProductToMeal :dialogVisible.sync="addProductToMealDialog" v-if="addProductToMealDialog" @checked="checked" :productList="form.orderProductList" :lists="['productList','mealList']"></addProductToMeal>
  </el-dialog>
</template>

<script>
import { mealProductTable } from "@/utils/StaticData";
import Agment from "@/services/agencyManagement/Agment";
import addProductToMeal from "@/components/addProductToMeal.vue";
export default {
  label: "修改订单",

  name: "updateOrder",

  mixins: [],

  components: {
    addProductToMeal
  },

  props: {
    dialogVisible: Boolean
  },

  data() {
    return {
      addProductToMealDialog: false,
      loading: false,
      customerData: [],
      saveLoading: false,
      CompanAmount: 0,
      companyName: "",
      form: {
        orderDetail: "",
        customerId: null,
        orderProductList: []
      },
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        companyName: ""
      }
    };
  },

  computed: {},

  watch: {},

  created() {
    this.GetCustomer("");
    this.GetCompanAmount();
  },

  mounted() {},

  destroyed() {},

  methods: {
    changeCustomer(e) {
      let company = this._.find(this.customerData, { customerId: e });
      this.companyName = company && company.companyName;
    },
    GetCompanAmount() {
      Agment.GetCompanAmount({}).then(res => {
        this.CompanAmount = res.result;
      });
    },
    checked(row) {
      this.form.orderProductList.push({
        productId: row.productId,
        productNum: 1,
        productTimeNum: 1,
        productPrice: row.productPrice,
        productName: row.productName,
        checkType: row.checkType,
        childList: row.childList
      });
      this.addProductToMealDialog = false;
      console.log(this.form);
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    GetCustomer(query) {
      this.searchInfo.companyName = query;
      this.loading = true;
      Agment.GetCustomer(this.searchInfo).then(
        res => {
          this.customerData = res.result.items;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    save() {
      let config = [
        { label: "客户名称", value: this.companyName },
        { label: "详情", value: this.form.orderDetail },
        {
          label: "产品",
          value: this.form.orderProductList.map(o => o.productName).join(" | ")
        }
      ];
      this.getConfirmHtml(config).then(res => {
        this.saveLoading = true;
        Agment.AddOrder(this.form).then(
          res => {
            this.$message.success("添加成功");
            this.saveLoading = false;
            this.handleClose();
            this.$emit("saveOk");
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
.addOrder-mess {
  font-size: 12px;
  color: #ccc;
  margin: 10px 0;
  text-align: center;
}
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
  color: #666666;
  letter-spacing: 0;
  margin-left: 15px;
}
.addAgent-card-content {
  margin-left: 15px;
}
</style>
