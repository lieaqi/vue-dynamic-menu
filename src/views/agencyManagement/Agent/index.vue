<template>
  <section class="crm-section">
    <header class="agent-header">
      <div class="c-flex" @keyup.enter="GetTenantList(1)">
        <div class="flex-1">
          <span>公司名称</span>
          <el-input style="width:200px" size="mini" v-model="searchInfo.tenancyName"></el-input>
          <el-button @click="GetTenantList(1)" size="mini" type="primary">搜索</el-button>
        </div>
        <el-button round type="primary" icon="el-icon-plus" @click="openDialog('','addAgentDialog')" size="mini">添加代理商</el-button>
      </div>
    </header>
    <section>
      <el-table :data="agentData" border style="width: 100%" v-loading="loading" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in agentTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            {{scope.row[data.prop]}}
          </template>
        </el-table-column>
        <el-table-column label="底部版权" width="100">
          <template slot-scope="scope">
            <span class="canClick" @click="CanUpdateVersion(scope.row)">
              <span v-if="scope.row.isCanUpdateVersion">开启</span>
              <span v-else style="color:red">关闭</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="360" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'agentRechargeDialog')">充值</el-button>
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'addAgentDialog')">修改</el-button>
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'agentFlowingDialog')">查看订单/流水</el-button>
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'agentProductDialog')">代理产品</el-button>
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'changePassWordDialog')">修改密码</el-button>
            <el-button type="text" size="mini" @click="openDialog(scope.row.id,'withdrawingDialog')">扣费</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[10,20,30]" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" style="float:right;">
      </el-pagination>
      <addAgent :dialogVisible.sync="addAgentDialog" v-if="addAgentDialog" @saveOk="GetTenantList(1)" :checkId="checkId"></addAgent>
      <agentRecharge :dialogVisible.sync="agentRechargeDialog" v-if="agentRechargeDialog" :checkId="checkId" @saveOk="GetTenantList(1)"></agentRecharge>
      <agentProduct :dialogVisible.sync="agentProductDialog" v-if="agentProductDialog" :checkId="checkId" @saveOk="GetTenantList(1)"></agentProduct>
      <agentFlowing :dialogVisible.sync="agentFlowingDialog" v-if="agentFlowingDialog" :checkId="checkId"></agentFlowing>
      <changePassWord :dialogVisible.sync="changePassWordDialog" v-if="changePassWordDialog" :checkId="checkId"></changePassWord>
      <withdrawing :dialogVisible.sync="withdrawingDialog" v-if="withdrawingDialog" @saveOk="GetCapitalaccount(1)" :checkId="checkId"></withdrawing>
    </section>
  </section>
</template>

<script>
import { agentTable } from '@/utils/StaticData'
import addAgent from './addAgent.vue'
import agentRecharge from './agentRecharge.vue'
import agentProduct from './agentProduct.vue'
import agentFlowing from './agentFlowing.vue'
import Tenant from '@/services/agencyManagement/Tenant'
import changePassWord from '@/components/changePassWord'
import withdrawing from './withdrawing'

export default {
  label: '代理商管理',

  name: 'Agent',

  mixins: [],

  components: {
    addAgent,
    agentRecharge,
    agentProduct,
    agentFlowing,
    changePassWord,
    withdrawing
  },

  props: {},

  data() {
    return {
      loading: false,
      addAgentDialog: false,
      agentRechargeDialog: false,
      agentProductDialog: false,
      agentFlowingDialog: false,
      changePassWordDialog: false,
      withdrawingDialog: false,
      agentTable,
      checkId: '',
      agentData: [{}],
      totalCount: 0,
      searchInfo: {
        pageCount: 1,
        pageSize: 10,
        tenancyName: ''
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    // this.GetTenantList();
  },

  destroyed() {},

  methods: {
    CanUpdateVersion(row) {
      let data = {
        tenantId: row.id,
        isCanUpdateVersion: !row.isCanUpdateVersion
      }

      this.$confirm(`是否${row.isCanUpdateVersion ? '关闭' : '开启'}底部版权`, '提示', {}).then(
        () => {
          Tenant.UpdateTenantIsCanUpdateVersion(data).then(res => {
            this.$message.success('操作成功')
            row.isCanUpdateVersion = !row.isCanUpdateVersion
          })
        }
      )
    },
    openDialog(checkId, type) {
      this.checkId = checkId || ''
      this[type] = true
    },
    GetTenantList(pageCount) {
      this.loading = true
      this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount

      Tenant.GetTenantList(this.searchInfo).then(
        res => {
          this.agentData = res.result.items
          this.totalCount = res.result.totalCount
          this.loading = false
        },
        () => {
          this.loading = false
        }
      )
    },
    handleCurrentChange(val) {
      this.searchInfo.pageCount = val
      this.GetTenantList()
    },
    handleSizeChange(val) {
      this.searchInfo.pageSize = val
      this.GetTenantList()
    }
  }
}
</script>
<style lang="scss" scoped>
.agent-header {
  padding: 10px 0;
}
</style>