
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
              <el-button type="text" v-if="data.prop=='TelPhone'" @click="openDialog('addOrUpdateRoleDiglog',scope.row.Id)">{{scope.row.TelPhone}}</el-button>
              <span v-else-if="data.prop=='Activate'">{{scope.row[data.prop]?'是':'否'}}</span>
              <span v-else>{{scope.row[data.prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="margin-10-0 center">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.PageIndex" :page-sizes="[10,20,30]" :page-size="searchInfo.PageSize" layout="total, sizes, prev, pager, next, jumper" :total="TotalNum">
          </el-pagination>
        </div>
      </div>
      <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
      <div class="flex-1">
        <h3>当前用户: {{currentRow.TelPhone||'请选择'}}
        </h3>
        <div class="dividing-line m-bottom-20"></div>

        <el-tree :data="trees" node-key="id" default-expand-all :expand-on-click-node="false" :check-strictly="true" :props="defaultProps">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="flex-1">{{ node.label }}<span class="menu-hidden" v-if="data.IsHidden">隐</span> </span>
            <el-switch v-model="data.IsHave" active-color="#13ce66" inactive-color="#ff4949" class="mini-switch" @change="state=>setUserMenu(state,data)">
            </el-switch>
          </span>
        </el-tree>
      </div>

    </div>

    <addOrUpdateRole :dialogVisible.sync="addOrUpdateRoleDiglog" :checkId="checkId" v-if="addOrUpdateRoleDiglog" @saveClose="GetUser()"></addOrUpdateRole>
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
      searchInfo: {
        PageIndex: 1,
        PageSize: 10,
        Filter: [
          { CalculatedField: 'UserType', CalculatedMethod: 'Equal', CalculatedValue: 'Agent' }
        ]
      },
      loading: false,
      addOrUpdateRoleDiglog: false,
      roleManagementTable: [
        { label: '电话', width: '', minWidth: '', prop: 'TelPhone', checked: true },
        { label: '用户类型', width: '', minWidth: '', prop: 'UserType', checked: true },
        { label: '是否激活	', width: '80px', minWidth: '', prop: 'Activate', checked: true }
      ],
      roleManagementData: [],
      trees: [],
      checkId: null,
      currentRow: {},
      TotalNum: 0,
      defaultProps: {
        children: 'ChildList',
        label: 'Name'
      }
    }
  },
  created() {
    this.GetUser()
  },

  mounted() {},

  methods: {
    setUserMenu(state, menu) {
      let url = state ? 'AddUserAndMenu' : 'DeleteUserAndMenu'
      let text = state ? '绑定菜单' : '解绑菜单'
      let data = {
        UserId: this.currentRow.Id,
        MenuId: menu.Id
      }
      this.$request.Site[url](data).then(
        res => {
          this.$message.success(`${text}成功`)
        },
        error => {
          menu.IsHave = !state
        }
      )
    },
    GetUser() {
      this.$request.Site.GetUser(this.searchInfo).then(res => {
        this.roleManagementData = res.Data.List
        this.TotalNum = res.Data.TotalNum
      })
    },
    handleCurrentChange(val) {
      this.searchInfo.PageIndex = val
      this.GetUser()
    },
    handleSizeChange(val) {
      this.searchInfo.PageIndex = 1
      this.searchInfo.PageSize = val
      this.GetUser()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
      this.GetMenuTree()
    },
    openDialog(dialog, id) {
      this.checkId = id
      this[dialog] = true
    },
    GetMenuTree() {
      this.$request.Site.GetMenuTreeByUserId({ Id: this.currentRow.Id }).then(res => {
        this.trees = res.Data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
}
.custom-tree-node {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 5px 0;
}
</style>
