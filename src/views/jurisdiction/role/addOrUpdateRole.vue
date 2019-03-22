<template>
  <el-dialog :title="title" :visible.sync="dialog" width="500px" :before-close="close" :close-on-click-modal="false">
    <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="TelPhone">
        <el-input v-model="roleForm.TelPhone" name="roleTelPhone" auto-complete="new-roleTelPhone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="PassWord">
        <el-input v-model="roleForm.PassWord" type="password" auto-complete="new-PassWord"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="UserType">
        <el-radio v-model="roleForm.UserType" label="Agent">代理商</el-radio>
        <el-radio v-model="roleForm.UserType" label="Manager">管理员</el-radio>
      </el-form-item>
      <el-form-item label="是否激活" prop="Activate">
        <el-switch v-model="roleForm.Activate" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sumbit" :loading="saveLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  label: '新增或修改角色',

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
      title: '新增角色',
      roleForm: {
        Id: '',
        TelPhone: '',
        PassWord: '',
        UserType: 'Agent',
        Activate: true
      },
      roleRules: {
        TelPhone: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        PassWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      dialog: false
    }
  },

  computed: {},

  watch: {},

  created() {
    this.title = this.checkId ? '修改角色' : '新增角色'
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
      this.$message(`${this.title}成功`)
      this.saveLoading = false
    },
    //数据提交
    sumbit() {
      this.$refs.roleForm.validate(state => {
        if (state) {
          let url = this.checkId ? 'UpdateUser' : 'AddUser'
          this.$request.Site[url](this.roleForm).then(res => {
            this.saveClose()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input,
.el-textarea {
  width: 350px;
}
</style>