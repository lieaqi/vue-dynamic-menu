
<template>
  <section>
    <div>
      <el-button type="primary" @click="openDialog('addOrUpdateAgentDiglog')">新增代理商</el-button>
    </div>
    <div class="dividing-line m-bottom-20"></div>

    <div class="flex-1">
      <el-table :data="agentData" border style="width: 100%" v-loading="loading">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in agentTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <el-button type="text" v-if="data.prop=='Name'" @click="openDialog('addOrUpdateAgentDiglog',scope.row.Id)">{{scope.row.Name}}</el-button>
            <span v-else-if="data.prop=='Province'">{{scope.row.Province+scope.row.City+scope.row.County}}</span>
            <span v-else>{{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteAgent(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="margin-10-0 center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.PageIndex" :page-sizes="[10,20,30]" :page-size="searchInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="TotalNum">
      </el-pagination>
    </div>
    <addOrUpdateAgent :dialogVisible.sync="addOrUpdateAgentDiglog" :checkId="checkId" v-if="addOrUpdateAgentDiglog" @saveClose="GetAgent()"></addOrUpdateAgent>
  </section>
</template>

<script>
import addOrUpdateAgent from './addOrUpdateAgent'
export default {
  label: '代理商配置',

  name: 'agentConfig',

  mixins: [],

  components: {
    addOrUpdateAgent
  },

  props: {},

  data() {
    return {
      loading: false,
      addOrUpdateAgentDiglog: false,
      agentTable: [
        { label: '代理商', width: '120px', minWidth: '', prop: 'Name', checked: true },
        { label: '地址', width: '', minWidth: '', prop: 'Province', checked: true }
      ],
      agentData: [],
      checkId: null,
      searchInfo: {
        PageIndex: 1,
        PageSize: 10,
        Filter: []
      },
      TotalNum: 0
    }
  },
  created() {
    this.GetAgent()
  },

  mounted() {},

  methods: {
    // deleteAgent(row) {
    //   this.$confirm(`是否删除代理商 ${row.Name}`).then(res => {
    //     this.$request.Site.DeleteMenu({ IdList: [row.Id] }).then(res => {
    //       this.$message.success('删除成功')
    //       this.GetMenuTree()
    //     })
    //   })
    // },
    GetAgent() {
      this.$request.Agent.GetAgent(this.searchInfo).then(res => {
        this.agentData = res.Data.List
        this.TotalNum = res.Data.TotalNum
      })
    },
    openDialog(dialog, id) {
      this.checkId = id
      this[dialog] = true
    },
    handleCurrentChange(val) {
      this.searchInfo.PageIndex = val
      this.GetAgent()
    },
    handleSizeChange(val) {
      this.searchInfo.PageIndex = 1
      this.searchInfo.PageSize = val
      this.GetAgent()
    }
  }
}
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
}
</style>
