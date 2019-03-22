<template>
  <el-dialog :title="title" :visible.sync="dialog" width="400px" :before-close="close" :close-on-click-modal="false">
    <el-form :model="menuForm" :rules="menuRules" ref="menuForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="中文名称" prop="Name">
        <el-input v-model="menuForm.Name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称" prop="EnName">
        <el-input v-model="menuForm.EnName"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="Url">
        <el-input v-model="menuForm.Url"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="IconCls">
        <el-input v-model="menuForm.IconCls"></el-input>
      </el-form-item>
      <el-form-item label="是否隐藏" prop="IsHidden">
        <el-switch v-model="menuForm.IsHidden" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="SortId">
        <el-input v-model="menuForm.SortId" type="number"></el-input>
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
      dialog: false,
      menuForm: {
        Name: '',
        EnName: '',
        Url: '',
        IconCls: '',
        SortId: '',
        IsHidden: false,
        Id: '',
        ParentId: 0
      },
      menuRules: {
        Name: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
        EnName: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
        Url: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
        IconCls: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
        IsHidden: [{ required: true, message: '请输入路由地址', trigger: 'blur' }]
      }
    }
  },

  computed: {},

  watch: {},

  created() {
    this.title = this.checkType == 'UpdateMenu' ? '修改菜单' : '新增菜单'
    this.checkType == 'UpdateMenu' && this.GetMenuDetail(this.checkNode.Id)
    console.log(this.checkNode)
  },

  mounted() {
    this.dialog = this.dialogVisible
  },

  destroyed() {},

  methods: {
    GetMenuDetail(Id) {
      this.$request.Site.GetMenuDetail({ Id }).then(res => {
        Object.keys(this.menuForm).forEach(s => {
          this.menuForm[s] = res.Data[s]
        })
      })
    },
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
      this.$refs.menuForm.validate(state => {
        if (state) {
          this.checkType == 'AddMenu' && (this.menuForm.ParentId = this.checkNode.Id || 0)
          this.$request.Site[this.checkType](this.menuForm).then(res => {
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
.el-input {
  width: 270px;
}
</style>