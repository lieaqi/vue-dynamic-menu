
<template>
  <section>
    <el-button type="primary" @click="openDialog('addOrUpdateMenuDiglog','add')">新增菜单</el-button>
    <div class="dividing-line"></div>
    <el-tree :data="trees" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :check-strictly="true">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="openDialog('addOrUpdateMenuDiglog','add',node)">
            新增
          </el-button>
          <el-button type="text" size="mini" @click="openDialog('addOrUpdateMenuDiglog','update',node)">
            修改
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <addOrUpdateMenu :dialogVisible.sync="addOrUpdateMenuDiglog" :checkType="checkType" :checkNode="checkNode"></addOrUpdateMenu>
  </section>
</template>

<script>
let id = 1000
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
      checkNode: {},
      checkType: null
    }
  },
  created() {},

  mounted() {},

  methods: {
    openDialog(dialog, type, node = {}) {
      this.checkNode = node
      this.checkType = type
      this[dialog] = true
    },
    append(data) {
      this.$confirm()
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node) {
      this.$confirm(`是否删除菜单 ${node.label}`).then(res => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
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
