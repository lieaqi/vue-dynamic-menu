<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="500px" :before-close="close" :close-on-click-modal="false">
    <el-form :model="menuForm" :rules="menuRules" ref="menuForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="路由名称" prop="name">
        <el-input v-model="menuForm.name"></el-input>
      </el-form-item>
      <el-form-item label="路由地址" prop="name">
        <el-input v-model="menuForm.url"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sumbit" :loading="saveLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  label: '带保存模态框',

  name: 'dialogSave',

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkType: [String, Number],
    checkNode: Object
  },

  data() {
    return {
      saveLoading: false,
      title: '新增菜单',
      menuForm: {},
      menuRules: {
        name: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入路由地址', trigger: 'blur' }]
      }
    }
  },

  computed: {},

  watch: {},

  created() {
    this.title = this.checkType == 'update' ? '修改菜单' : '新增菜单'
  },

  mounted() {},

  destroyed() {},

  methods: {
    //关闭
    close() {
      this.$emit('update:dialogVisible', false)
    },
    //保存关闭
    saveClose() {
      this.close()
      this.$emit('saveClose')
      this.saveLoading = false
    },
    //数据提交
    sumbit() {}
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 350px;
}
</style>