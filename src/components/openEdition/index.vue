<template>
  <el-dialog title="版本设置" :visible.sync="dialogOpenEdition" width="500px" :before-close="handleClose">
    <el-form :model="editionForm" :rules="rules" ref="editionForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="公司名称" prop="CompanyName">
        <span>{{editionForm.CompanyName}}</span>
      </el-form-item>
      <el-form-item label="版本选择" prop="type">
        <div>
        <el-radio-group v-model="editionForm.type" class="ydh-radio" @change="getCustomerCount">
          <el-radio :label="v.id" name="type" v-for="v in versionList" :key="v.id">{{v.versionName}}</el-radio>
        </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="限制客户数">
        <el-input v-model="defaultCustomerCount" type="number" class="el-input"/>
      </el-form-item>
      <el-form-item label="开通时间" required prop="date">
        <el-date-picker v-model="editionForm.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editionForm')">立即开通</el-button>
        <el-button @click="resetForm('editionForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { parseTime } from "@/utils";
import EditionService from "@/services/admin/EditionService";
import BusinessServices from "@/services/YDH/Business";

export default {
  label: "开通版本",
  name: "openEdition",
  props: ["dialogOpenEdition", "user"],
  components: {},
  data() {
    return {
      defaultCustomerCount:'',
      versionList: [],
      editionForm: {
        UserName: "",
        NickName: "",
        date: "",
        type: ""
      },
      rules: {
        type: [
          {
            required: true,
            message: "请选择版本",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择开通时间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    console.log(this.user)
    this.editionForm.type=this.user.VersionId
    this.editionForm.CompanyName = this.user.CompanyName;
    this.defaultCustomerCount = this.user.LimitCustomerCount;
    this.getEditions();
  },
  methods: {
    getCustomerCount(val){
      this.versionList.map(e=>{
        if(e.id == val) {
          this.defaultCustomerCount = e.defaultCustomerCount
        }
      })
      console.log(val,this.versionList.filter(e=>e.id==val)[0].defaultCustomerCount,this.defaultCustomerCount)
    },
    getEditions() {
      EditionService.getEditions().then(res => {
        this.versionList = res.result.data.filter(d=>d.statusType=='Version')
      });
    },
    handleClose() {
      this.$emit("close");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let typeCnName = this._.find(this.versionList, {
            id: this[formName].type
          });
          typeCnName = typeCnName && typeCnName.versionName;
          let text = `
            <div> 开通公司: <strong>${this[formName].CompanyName}</strong> </div> 
            <div> 开通版本: <strong>${typeCnName}</strong></div> 
            <div> 开通时间: <strong>${parseTime(
              this[formName].date[0]
            )}-${parseTime(this[formName].date[1])}</strong></div> 
             `;
          this.$alert(text, "开通确认", {
            dangerouslyUseHTMLString: true
          }).then(() => {
            this.toSave(this[formName]);
          });
        } else {
          return false;
        }
      });
    },
    toSave(mess) {
      let data = {
        CompanyId: this.user.CompanyId,
        VersionId: mess.type,
        StartTime: mess.date[0],
        EndTime: mess.date[1],
        IsApply: true,
        LimitCustomerCount:this.defaultCustomerCount
      };
      BusinessServices.SetVersionCompany(data).then(res => {
        this.$message({
          type: "success",
          message: "开通成功"
        });
        this.handleClose();
        this.$emit("goSearch");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input {
  width:350px;
}
</style>
