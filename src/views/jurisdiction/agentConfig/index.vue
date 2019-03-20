
<template>
  <section>
    <div>
      <el-button type="primary" @click="openDialog('addOrUpdateAgentDiglog')">新增代理商</el-button>
    </div>
    <div class="dividing-line m-bottom-20"></div>
    <div class="c-flex flex-1">
      <div class="flex-1">
        <el-table :data="roleManagementData" border style="width: 100%" v-loading="loading" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in roleManagementTable" :key="data.prop" v-if="data.checked">
            <template slot-scope="scope">
              <el-button type="text" v-if="data.prop=='Name'" @click="openDialog('addRoleDialog',scope.row.Id)">{{scope.row.Name}}</el-button>
              <span v-else>{{scope.row[data.prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
      <el-tree :data="trees" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :check-strictly="true" class="flex-1">
      </el-tree>
    </div>

    <addOrUpdateAgent :dialogVisible.sync="addOrUpdateAgentDiglog" :checkId="checkId" v-if="addOrUpdateAgentDiglog"></addOrUpdateAgent>
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
      roleManagementTable: [
        { label: '代理商', width: '120px', minWidth: '', prop: 'Name', checked: true },
        { label: '描述', width: '', minWidth: '', prop: 'Description', checked: true },
        { label: '创建时间', width: '120px', minWidth: '', prop: 'CreateTime', checked: true }
      ],
      roleManagementData: [
        {
          Name: '测试角色',
          Description: '测试角色',
          CreateTime: '2019-03-18'
        }
      ],
      trees: [
        {
          id: 1,
          label: '测试菜单1',
          children: [
            {
              id: 4,
              label: '测试菜单 1-1'
            }
          ]
        },
        {
          id: 2,
          label: '测试菜单 2',
          children: [
            {
              id: 5,
              label: '测试菜单 2-1'
            },
            {
              id: 6,
              label: '测试菜单 2-2'
            }
          ]
        }
      ],
      checkId: null,
      currentRow: {}
    }
  },
  created() {},

  mounted() {},

  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
    openDialog(dialog, id) {
      this.checkId = id
      this[dialog] = true
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
