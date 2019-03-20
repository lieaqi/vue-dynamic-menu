<template>
  <el-dialog title="查看订单" :visible.sync="dialogVisible" width="1100px" :before-close="handleClose" class="agentProduct">
    <header style="margin: 10px 0 20px 0;">
      <span style="margin-right:10px">时间</span>
      <el-date-picker v-model="searchInfo.startTime" type="date" placeholder="选择日期" size="mini" @change="GetOrder(1)" value-format="yyyy-MM-dd">
      </el-date-picker>
      <span style="margin:0 5px">至</span>
      <el-date-picker v-model="searchInfo.endTime" type="date" placeholder="选择日期" size="mini" @change="GetOrder(1)" value-format="yyyy-MM-dd">
      </el-date-picker>
    </header>
    <section style="min-height:400px">
      <el-table :data="orderData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in orderTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <span v-if="data.prop=='productList'">{{getProducts(scope.row[data.prop])}}</span>
            <span v-else> {{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex-center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.PageIndex" :page-sizes="[10,20,30]" :page-size="searchInfo.PageSize" layout="total, prev, pager, next" :total="totalNum" style="float:right;">
        </el-pagination>
      </div>
    </section>
  </el-dialog>
</template>

<script>
import { orderTable } from "@/utils/StaticData";
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "查看订单",

  name: "lookOrder",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    customerId: [String, Number]
  },

  data() {
    return {
      orderTable,
      orderData: [],
      loading: false,
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        customerId: ""
      },
      totalNum: 10
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
      this.searchInfo.customerId = this.customerId;
      this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount;
      this.loading = true;
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
    handleCurrentChange(val) {
      this.searchInfo.PageIndex = val;
      this.GetOrder();
    },
    handleSizeChange(val) {
      this.searchInfo.PageSize = val;
      this.GetOrder();
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
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
