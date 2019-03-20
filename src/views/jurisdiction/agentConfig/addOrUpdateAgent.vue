<template>
  <el-dialog :title="title" :visible.sync="dialog" width="500px" :before-close="close" :close-on-click-modal="false">
    <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="代理商名称" prop="name">
        <el-input v-model="roleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商描述" prop="Description">
        <el-input type="textarea" :rows="2" placeholder="请输入代理商描述" v-model="roleForm.Description">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sumbit" :loading="saveLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  label: '新增或修改代理商',

  name: 'dialogSave',

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number]
  },

  data() {
    return {
      saveLoading: false,
      title: '新增代理商',
      roleForm: {},
      roleRules: {
        name: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }]
      },
      dialog: false
    }
  },

  computed: {},

  watch: {},

  created() {
    this.title = this.checkId ? '修改代理商' : '新增代理商'
  },

  mounted() {
    this.dialog = this.dialogVisible
  },

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
.el-input,
.el-textarea {
  width: 350px;
}
</style>