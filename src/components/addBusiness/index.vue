<template>
  <el-dialog title="新增商户" :visible.sync="dialogAddBusiness" width="500px" :before-close="handleClose">
    <el-form :model="businessForm" :rules="rules" ref="businessForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="PhoneNumber">
        <el-input v-model="businessForm.PhoneNumber"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="PassWord">
        <el-input v-model="businessForm.PassWord" type="password"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="CompanyName">
        <el-input v-model="businessForm.CompanyName"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="ContactName">
        <el-input v-model="businessForm.ContactName"></el-input>
      </el-form-item>
      <el-form-item label="是否激活" prop="IsActive">
        <el-switch v-model="businessForm.IsActive" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('businessForm')">新增</el-button>
        <el-button @click="resetForm('businessForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { parseTime } from "@/utils";
import EditionService from "@/services/admin/EditionService";

export default {
  label: "开通商户",
  name: "addBusiness",
  props: ["dialogAddBusiness"],
  components: {},
  data() {
    return {
      versionList: [],
      businessForm: { IsActive: true },
      rules: {
        PhoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        CompanyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        ContactName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getEditions();
  },
  methods: {
    getEditions() {
      EditionService.getEditions().then(res => {
        this.versionList = res.result.data;
      });
    },
    handleClose() {
      this.$emit("close");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toSave(this[formName]);
        } else {
          return false;
        }
      });
    },
    toSave(mess) {
      this.InitiateRequest("CompanyCreateCompany", mess).then(res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.$emit("goSearch");
        this.handleClose();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
