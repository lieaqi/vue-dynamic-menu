
<template>
  <section>
    <div>
      <el-button type="primary" @click="openDialog('addOrUpdateRoleDiglog')">新增角色</el-button>
    </div>
    <div class="dividing-line m-bottom-20"></div>
    <div class="c-flex flex-1">
      <div class="flex-1">
        <el-table :data="roleManagementData" border style="width: 100%" v-loading="loading" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in roleManagementTable" :key="data.prop" v-if="data.checked">
            <template slot-scope="scope">
              <el-button type="text" v-if="data.prop=='Name'" @click="openDialog('addOrUpdateRoleDiglog',scope.row.Id)">{{scope.row.Name}}</el-button>
              <span v-else>{{scope.row[data.prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
      <el-tree :data="trees" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :check-strictly="true" class="flex-1">
      </el-tree>
    </div>

    <addOrUpdateRole :dialogVisible.sync="addOrUpdateRoleDiglog" :checkId="checkId" v-if="addOrUpdateRoleDiglog"></addOrUpdateRole>
  </section>
</template>

<script>
import addOrUpdateRole from './addOrUpdateRole'
export default {
  label: '角色配置',

  name: 'menuConfig',

  mixins: [],

  components: {
    addOrUpdateRole
  },

  props: {},

  data() {
    return {
      loading: false,
      addOrUpdateRoleDiglog: false,
      roleManagementTable: [
        { label: '角色', width: '120px', minWidth: '', prop: 'Name', checked: true },
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
