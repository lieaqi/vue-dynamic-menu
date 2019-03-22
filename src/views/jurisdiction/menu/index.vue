
<template>
  <section>
    <el-button type="primary" @click="openDialog('addOrUpdateMenuDiglog','add')">新增菜单</el-button>
    <div class="dividing-line"></div>
    <el-tree :data="trees" node-key="id" default-expand-all :expand-on-click-node="false" :check-strictly="true" :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }} <span class="menu-hidden" v-if="data.IsHidden">隐</span> </span>
        <span>
          <el-button type="text" size="mini" @click="openDialog('addOrUpdateMenuDiglog','AddMenu',node)">
            新增
          </el-button>
          <el-button type="text" size="mini" @click="openDialog('addOrUpdateMenuDiglog','UpdateMenu',node)">
            修改
          </el-button>
          <el-button type="text" size="mini" @click="() => DeleteMenu(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <addOrUpdateMenu :dialogVisible.sync="addOrUpdateMenuDiglog" v-if="addOrUpdateMenuDiglog" :checkType="checkType" :checkNode="checkNode" @saveClose="GetMenuTree()"></addOrUpdateMenu>
  </section>
</template>

<script>
import addOrUpdateMenu from './addOrUpdateMenu'
export default {
  label: '菜单配置',

  name: 'menuConfig',

  mixins: [],

  components: {
    addOrUpdateMenu
  },

  props: {},

  data() {
    return {
      addOrUpdateMenuDiglog: false,
      trees: [],
      checkNode: {},
      checkType: null,
      defaultProps: {
        children: 'ChildList',
        label: 'Name'
      }
    }
  },
  created() {
    this.GetMenuTree()
  },

  mounted() {},

  methods: {
    GetMenuTree() {
      this.$request.Site.GetMenuTree({}).then(res => {
        this.trees = res.Data
      })
    },
    openDialog(dialog, type, node = {}) {
      this.checkNode = node.data
      this.checkType = type
      this[dialog] = true
    },
    DeleteMenu(data) {
      this.$confirm(`是否删除菜单 ${data.Name}`).then(res => {
        this.$request.Site.DeleteMenu({ IdList: [data.Id] }).then(res => {
          this.$message.success('删除成功')
          this.GetMenuTree()
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tree {
  width: 50%;
  min-width: 600px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
