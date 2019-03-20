<template>
  <el-dialog title="流水订单" :visible.sync="dialogVisible" width="1100px" :before-close="handleClose" class="agentProduct">
    <header style="margin: 10px 0 20px 0;">
      <span style="margin-right:10px">时间</span>
      <el-date-picker v-model="searchInfo.startTime" type="date" placeholder="选择日期" size="mini" @change="GetCapitalaccount(1)" value-format="yyyy-MM-dd">
      </el-date-picker>
      <span style="margin:0 5px">至</span>
      <el-date-picker v-model="searchInfo.endTime" type="date" placeholder="选择日期" size="mini" @change="GetCapitalaccount(1)" value-format="yyyy-MM-dd">
      </el-date-picker>
    </header>
    <section style="min-height:400px">
      <el-table :data="agentFlowingData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in agentFlowingTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <span v-if="data.prop=='productList'">{{getProducts(scope.row[data.prop])}}</span>
            <span v-else> {{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex-center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="totalCount" style="float:right;">
        </el-pagination>
      </div>
    </section>
  </el-dialog>
</template>

<script>
import { agentFlowingTable } from "@/utils/StaticData";
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "代理流水",

  name: "agentFlowing",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number],
    customerId: [String, Number]
  },

  data() {
    return {
      agentFlowingTable,
      agentFlowingData: [],
      loading: false,
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        tenantId: "",
        customerId: ""
      },
      totalCount: 10
    };
  },

  computed: {},

  watch: {},

  created() {
    this.searchInfo.tenantId = this.checkId;
    this.customerId && (this.searchInfo.customerId = this.customerId);
    this.GetCapitalaccount();
  },

  mounted() {},

  destroyed() {},

  methods: {
    GetCapitalaccount(pageCount) {
      this.loading = true;
      this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount;
      Agment.GetCapitalaccount(this.searchInfo).then(
        res => {
          this.agentFlowingData = res.result.items;
          this.totalCount = res.result.totalCount;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
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
    handleCurrentChange(val) {
      this.searchInfo.pageCount = val;
      this.GetCapitalaccount();
    },
    handleSizeChange(val) {
      this.searchInfo.pageSize = val;
      this.GetCapitalaccount();
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
