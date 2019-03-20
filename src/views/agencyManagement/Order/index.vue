<template>
  <section class="crm-section">
    <header class="addAgent" @keydown.enter="GetOrder(1)" style="position: relative;">
      <el-button type="primary" @click="addOrderDialog = true" class="order-add">新增</el-button>
      <div class="addAgent-card">
        <div class="addAgent-card-type">下单时间</div>
        <div class="addAgent-card-content">
          <span>开始时间:</span>
          <el-date-picker v-model="searchInfo.startTime" type="date" placeholder="选择日期" @change="GetOrder(1)" value-format="yyyy-MM-dd">
          </el-date-picker>
          <span>结束时间:</span>
          <el-date-picker v-model="searchInfo.endTime" type="date" placeholder="选择日期" @change="GetOrder(1)" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">公司名称</div>
          <div class="addAgent-card-content">
            <el-input placeholder="请输入公司名称" v-model="searchInfo.companyName"></el-input>
          </div>
        </div>
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">电话</div>
          <div class="addAgent-card-content">
            <el-input placeholder="请输入电话" v-model="searchInfo.phoneNumber"></el-input>
          </div>
        </div>
        <div class="addAgent-card flex-1">
          <div class="addAgent-card-type">订单编号</div>
          <div class="addAgent-card-content">
            <el-input placeholder="请输入订单编号" v-model="searchInfo.number"></el-input>
          </div>
        </div>
      </div>
    </header>
    <section>
      <el-table :data="orderData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in orderTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <span class="canClick" v-if="data.prop=='number'" @click="openDialog(scope.row.id,'orderDetailsDialog')"> {{scope.row[data.prop]}}</span>
            <span v-else-if="data.prop=='productList'">{{getProducts(scope.row[data.prop])}}</span>
            <span v-else> {{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="70" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'openUpDialog',scope.row)" :disabled="scope.row.isDredge">开通</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" style="float:right;">
      </el-pagination>
    </section>
    <orderDetails :dialogVisible.sync="orderDetailsDialog" v-if="orderDetailsDialog" :checkId="id"></orderDetails>
    <addOrder :dialogVisible.sync="addOrderDialog" v-if="addOrderDialog" @saveOk="GetOrder(1)"></addOrder>
    <openUp :dialogVisible.sync="openUpDialog" v-if="openUpDialog" :checkId="id" :config="config" @saveOk="GetOrder(1)"></openUp>

  </section>
</template>

<script>
import { orderTable } from "@/utils/StaticData";
import orderDetails from "./orderDetails.vue";
import addOrder from "./addOrder.vue";
import Agment from "@/services/agencyManagement/Agment";
import openUp from "./openUp";
export default {
  label: "代理商管理",

  name: "Agent",

  mixins: [],

  components: {
    orderDetails,
    addOrder,
    openUp
  },

  props: {},

  data() {
    return {
      loading: false,
      addOrderDialog: false,
      orderDetailsDialog: false,
      openUpDialog: false,
      orderTable,
      orderData: [{}],
      totalCount: 0,
      id: "",
      config: {},
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        number: null,
        companyName: "",
        phoneNumber: ""
      }
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.GetOrder();
  },

  destroyed() {},

  methods: {
    openDialog(id, type, config = {}) {
      this.id = id || "";
      this[type] = true;
      this.config = config;
    },
    getProducts(products) {
      let text = "";
      if (products) {
        for (let index = 0; index < products.length; index++) {
          const element = products[index].productName;
          text += element;
          index < products.length - 1 && (text += " | ");
        }
      }
      return text;
    },
    GetOrder(pageCount) {
      this.loading = true;
      this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount;
      Agment.GetOrder(this.searchInfo).then(
        res => {
          this.orderData = res.result.items;
          this.totalCount = res.result.totalCount;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    deleteOrder() {
      this.$confirm("是否作废此订单?", "提示", {}).then(() => {
        this.$message({
          type: "success",
          message: "作废成功!"
        });
      });
    },
    handleCurrentChange(val) {
      this.searchInfo.pageCount = val;
      this.GetOrder();
    },
    handleSizeChange(val) {
      this.searchInfo.PageSize = val;
      this.GetOrder();
    }
  }
};
</script>
<style lang="scss" scoped>
.order-add {
  position: absolute;
  right: 10px;
  top: 40px;
}
.agent-header {
  padding: 10px 0;
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
