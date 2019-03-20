<template>
  <el-dialog title="开通名片" :visible.sync="dialogOpenEdition" width="500px" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label="公司名称" prop="CompanyName">
        <span>{{form.CompanyName}}</span>
      </el-form-item>
      <el-form-item label="名片数量" prop="CardStartSize">
        <el-input v-model="form.CardStartSize" type="number" class="el-input" />
      </el-form-item>
      <el-form-item label="开始时间" required prop="StartTime">
        <el-date-picker v-model="form.StartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" required prop="EndTime">
        <el-date-picker v-model="form.EndTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即开通{{form.EndTime}}</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { parseTime } from "@/utils";
import EditionService from "@/services/admin/EditionService";
import BusinessServices from "@/services/YDH/Business";

export default {
  label: "开通名片",
  name: "openBusinessCard",
  props: ["dialogOpenEdition", "user"],
  components: {},
  data() {
    return {
      form: {
        CompanyId: "",
        CompanyName: "",
        CardStartSize: 5,
        StartTime: "",
        EndTime: ""
      },
      rules: {
        CardStartSize: [
          {
            required: true,
            message: "请选择开通数量",
            trigger: "change"
          }
        ],
        StartTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "blur"
          }
        ],
        EndTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.form.CompanyName = this.user.CompanyName;
    this.form.CompanyId = this.user.CompanyId;
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            let text = `
            <div> 开通公司: <strong>${
              this[formName].CompanyName
            }</strong> </div> 
            <div> 名片数量: <strong>${
              this[formName].CardStartSize
            }</strong></div> 
            <div> 开始时间: <strong>${this[formName].StartTime}</strong></div> 
            <div> 结束时间: <strong>${this[formName].EndTime}</strong></div> 
             `;
            this.$alert(text, "开通确认", {
              dangerouslyUseHTMLString: true
            }).then(() => {
              this.toSave(this[formName]);
            });
          }, 100);
        } else {
          return false;
        }
      });
    },
    toSave(data) {
      BusinessServices.SetCompanyCard(data).then(res => {
        console.log(res);
        this.$message({
          type: "success",
          message: "开通名片成功"
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
  width: 350px;
}
</style>
