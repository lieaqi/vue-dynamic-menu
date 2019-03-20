<template>
  <section class="crm-section">
    <header style="margin: 10px 0 20px 0;">
      <span style="margin-right:10px">时间</span>
      <el-date-picker v-model="searchInfo.startTime" type="date" placeholder="选择日期" size="mini" @change="GetCapitalaccount(1)" value-format="yyyy-MM-dd">
      </el-date-picker>
      <span style="margin:0 5px">至</span>
      <el-date-picker style="margin-right:10px" v-model="searchInfo.endTime" type="date" placeholder="选择日期" size="mini" @change="GetCapitalaccount(1)" value-format="yyyy-MM-dd">
      </el-date-picker>
      <span>类型选择:</span>
      <el-select clearable v-model="searchInfo.tradeName" placeholder="请类型" @change="GetCapitalaccount(1)" size="mini">
        <el-option v-for="item in trades" :key="item.enName" :label="item.name" :value="item.enName">
        </el-option>
      </el-select>
    </header>
    <section style="min-height:400px">
      <el-table :data="agentFlowingData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in FinanceTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <span v-if="data.prop=='productList'">{{getProducts(scope.row[data.prop])}}</span>
            <span v-else> {{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" style="float:right;">
      </el-pagination>
    </section>
  </section>

</template>

<script>
import { FinanceTable } from "@/utils/StaticData";
import Agment from "@/services/agencyManagement/Agment";
export default {
  label: "查看流水",

  name: "financialManagement",

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      FinanceTable,
      agentFlowingData: [],
      loading: false,
      checkId: "",
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        tradeName: ""
      },
      trades: [],
      totalCount: 10
    };
  },

  computed: {},

  watch: {},

  created() {
    this.GetTradeType();
    this.GetCapitalaccount();
  },

  mounted() {},

  destroyed() {},

  methods: {
    GetTradeType() {
      Agment.GetTradeType({}).then(res => {
        this.trades = res.result;
      });
    },
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
