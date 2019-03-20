<template>
  <el-dialog title="转移客户" :visible.sync="dialogVisible" width="900px" :before-close="handleClose" class="addAgent">
    <header class="agent-header" style="margin-bottom:10px">
      <div class="c-flex" @keyup.enter="GetTenantList(1)">
        <div class="flex-1">
          <span>公司名称</span>
          <el-input style="width:200px" size="mini" v-model="searchInfo.tenancyName" placeholder="请输入公司名称"></el-input>
          <el-button @click="GetTenantList(1)" size="mini" type="primary">搜索</el-button>
        </div>
      </div>
    </header>
    <section>
      <el-table :data="agentData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in agentTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            {{scope.row[data.prop]}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="60" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="checkAgent(scope.row)">转移</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="overflow: auto;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" style="float:right;">
        </el-pagination>
      </div>

    </section>
  </el-dialog>
</template>

<script>
import Tenant from "@/services/agencyManagement/Tenant";
import Agment from "@/services/agencyManagement/Agment";
import { agentTable } from "@/utils/StaticData";

export default {
  label: "扣款",

  name: "withdrawing",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    customerId: [String, Number],
    customerName: [String]
  },

  data() {
    return {
      loading: false,
      agentTable,
      agentData: [],
      totalCount: 0,
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        tenancyName: ""
      }
    };
  },

  computed: {},

  watch: {},

  created() {
    this.GetTenantList();
  },

  mounted() {},

  destroyed() {},

  methods: {
    checkAgent(row) {
      let html = `<span>是否将客户 <strong>${
        this.customerName
      }</strong> 转移到代理商 <strong>${row.tenancyName}</strong> 下</span>`;
      this.$alert(html, "转移提示", {
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.loading = true;
        Agment.TransferCustomer({
          customerId: this.customerId,
          tenantId: row.id
        }).then(
          res => {
            this.$message({
              type: "success",
              message: "转移成功!"
            });
            this.GetTenantList(0);
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      });
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    GetTenantList(pageCount) {
      this.loading = true;
      this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount;

      Tenant.GetTenantList(this.searchInfo).then(
        res => {
          this.agentData = res.result.items;
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
      this.GetTenantList();
    },
    handleSizeChange(val) {
      this.searchInfo.pageSize = val;
      this.GetTenantList();
    }
  }
};
</script>
<style lang="scss" scoped>
.addAgent-card {
  border-left: 8px solid #2a2a3f;
  background-color: #f8f8f9;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: 10px;
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
