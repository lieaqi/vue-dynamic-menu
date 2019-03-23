<template>
  <el-dialog :title="title" :visible.sync="dialog" width="500px" :before-close="close" :close-on-click-modal="false">
    <el-form :model="agentForm" :rules="agentRules" ref="agentForm" label-width="80px" class="demo-ruleForm" v-loading="loading">
      <el-form-item label="名称" prop="Name">
        <el-input v-model="agentForm.Name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="TelPhone" v-if="!checkId">
        <el-input v-model="agentForm.TelPhone"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="GradeName">
        <el-select v-model="agentForm.GradeName" placeholder="请选择">
          <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区" prop="address">
        <el-cascader placeholder="选择地区" :options="options" filterable v-model="agentForm.address" :props="props"></el-cascader>
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
      agentForm: {
        TelPhone: '',
        Name: '',
        ProvinceId: '',
        CityId: '',
        CountyId: '',
        GradeName: '',
        address: null,
        Id: ''
      },
      agentRules: {
        Name: [{ required: true, message: '请输入代理商名称', trigger: 'blur' }],
        TelPhone: [{ required: true, message: '请输入代理商电话', trigger: 'blur' }],
        address: [{ required: true, message: '请选择地区', trigger: 'blur' }]
      },
      dialog: false,
      options: [],
      props: {
        children: 'ChildrenList',
        label: 'Name',
        value: 'Id'
      },
      grades: [],
      loading: false
    }
  },

  computed: {},

  watch: {},

  created() {
    this.grades = [
      { label: '金牌', value: 'GoldMedal' },
      { label: '银牌', value: 'SilverMedal' },
      { label: '铜牌', value: 'CopperMedal' }
    ]
    this.GetArea()
    this.title = this.checkId ? '修改代理商' : '新增代理商'
    this.checkId && this.GetAgentDetail(this.checkId)
  },

  mounted() {
    this.dialog = this.dialogVisible
  },

  destroyed() {},

  methods: {
    GetAgentDetail(Id) {
      this.loading = true
      this.$request.Agent.GetAgentDetail({ Id }).then(
        res => {
          Object.keys(this.agentForm).forEach(s => {
            this.agentForm[s] = res.Data[s]
          })
          this.agentForm.address = [
            this.agentForm.ProvinceId,
            this.agentForm.CityId,
            this.agentForm.CountyId
          ]
          this.loading = false
        },
        () => {
          this.loading = false
        }
      )
    },
    GetArea() {
      this.$request.Agent.GetArea({}).then(res => {
        this.options = res.Data
      })
    },
    //关闭
    close() {
      this.$emit('update:dialogVisible', false)
    },
    //保存关闭
    saveClose() {
      this.close()
      this.$message.success(`${this.title}成功`)
      this.$emit('saveClose')
      this.saveLoading = false
    },
    //数据提交
    sumbit() {
      this.$refs.agentForm.validate(state => {
        if (state) {
          this.agentForm.ProvinceId = this.agentForm.address[0]
          this.agentForm.CityId = this.agentForm.address[1]
          this.agentForm.CountyId = this.agentForm.address[2]
          let url = this.checkId ? 'UpdateAgment' : 'AddAgent'
          console.log(url, this.$request.Agent)
          this.$request.Agent[url](this.agentForm).then(res => {
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
.el-select,
.el-textarea {
  width: 350px;
}
.el-cascader {
  width: 350px;
  .el-input {
    width: 100% !important;
  }
}
</style>