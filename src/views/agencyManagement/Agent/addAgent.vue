<template>
  <el-dialog title="添加代理商/修改" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent">
    <section>
      <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="c-flex">
          <div class="addAgent-card flex-1" style="margin-right:20px">
            <el-form-item prop="tenancyName">
              <div class="addAgent-card-type">代理商名称</div>
              <div class="addAgent-card-content">
                <el-input placeholder="请输入代理商名称" v-model="form.tenancyName"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="addAgent-card flex-1">
            <div class="addAgent-card-type">区域</div>
            <div class="addAgent-card-content">
              <el-cascader ref="quyu" placeholder="区域选择" :options="areaList" filterable change-on-select :props="props" v-model="selectedOptions"></el-cascader>
            </div>
          </div>
        </div>
        <div class="c-flex" >
          <div class="addAgent-card flex-1" style="margin-right:20px">
            <el-form-item prop="adminName">
              <div class="addAgent-card-type">管理员登录名（只能是英文和数字</div>
              <div class="addAgent-card-content">
                <el-input placeholder="请输入代理商名称" v-model="form.adminName" :disabled="Boolean(checkId)"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="addAgent-card flex-1" v-if="!checkId">
            <el-form-item prop="password">
              <div class="addAgent-card-type">管理员密码</div>
              <div class="addAgent-card-content">
                <el-input placeholder="请输入代理商名称" v-model="form.password" type="password" :disabled="Boolean(checkId)"></el-input>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="c-flex">
          <div class="addAgent-card flex-1" style="margin-right:20px">
            <el-form-item prop="adminEmailAddress">
              <div class="addAgent-card-type">邮箱</div>
              <div class="addAgent-card-content">
                <el-input placeholder="请输入邮箱" v-model="form.adminEmailAddress"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="addAgent-card flex-1">
            <el-form-item prop="isActive">
              <div class="addAgent-card-type">是否激活</div>
              <div class="addAgent-card-content">
                <el-switch v-model="form.isActive" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="c-flex">
          <div class="addAgent-card flex-1" style="margin-right:20px">
            <div class="addAgent-card-type">负责人</div>
            <div class="addAgent-card-content">
              <el-input placeholder="请输入负责人姓名" v-model="form.contactPerson"></el-input>
            </div>
          </div>
          <div class="addAgent-card flex-1">
            <div class="addAgent-card-type">联系方式</div>
            <div class="addAgent-card-content">
              <el-input placeholder="请输入联系方式" v-model="form.contactTelPhone"></el-input>
            </div>
          </div>
        </div>
        <div class="c-flex">
          <!-- <div class="addAgent-card flex-1" style="margin-right:20px">
            <div class="addAgent-card-type">折扣(%)</div>
            <div class="addAgent-card-content">
              <el-input-number v-model="form.discount" :min="1" :max="100"></el-input-number>
            </div>
          </div> -->
          <div class="addAgent-card flex-1">
            <div class="addAgent-card-type">级别</div>
            <div class="addAgent-card-content">
              <el-select v-model="form.grade" placeholder="请选择">
                <el-option v-for="g in gradeList" :key="g.id" :label="g.name" :value="g.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-form>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" v-loading="saveLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tenant from "@/services/agencyManagement/Tenant";
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "添加代理商",

  name: "addAgent",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number]
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员登录名"));
      } else {
        let re = /^[\u9fa5_a-zA-Z0-9]+$/;
        re.test(value) ? callback() : callback(new Error("只能输入英文或数字"));
      }
    };
    return {
      rules: {
        adminName: [{ validator: validatePass, trigger: "blur" }],
        tenancyName: [
          { required: true, message: "请输入代理商名称", trigger: "blur" }
        ],
        tenancyName: [
          { required: true, message: "请输入代理商名称", trigger: "blur" }
        ],
        adminEmailAddress: [],
        isActive: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      form: {
        id: "",
        tenancyName: "",
        adminEmailAddress: "",
        isActive: "",
        contactPerson: "",
        contactTelPhone: "",
        discount: 50,
        grade: "",
        provinceId: "",
        cityId: "",
        countyId: "",
        adminName: "",
        password: "",
        isActive: true
      },
      selectedOptions: [],
      saveLoading: false,
      areaList: [],
      gradeList: [],
      props: {
        value: "id",
        label: "name",
        children: "childrenList"
      }
    };
  },

  computed: {},

  watch: {},

  created() {
    this.GetGrade();
    this.GetArea();
    this.checkId && this.GetTenantDetail(this.checkId);
    if (!this.checkId) {
      this.rules.adminEmailAddress = [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"]
        }
      ];
    }
  },

  mounted() {},

  destroyed() {},

  methods: {
    GetTenantDetail(customerId) {
      Tenant.GetTenantDetail({ id: customerId }).then(res => {
        Object.keys(this.form).map(f => {
          this.form[f] = res.result[f];
        });
        this.selectedOptions = [
          res.result.provinceId,
          res.result.cityId,
          res.result.countyId
        ];
      });
    },
    GetGrade() {
      Tenant.GetGrade({}).then(res => {
        this.gradeList = res.result;
      });
    },
    GetArea() {
      Agment.GetArea({}).then(res => {
        this.areaList = res.result;
      });
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let config = [
            { label: "代理商名称", value: this.form.tenancyName },
            { label: "管理员登录名", value: this.form.adminName },
            { label: "管理员密码", value: this.form.password },
            { label: "邮箱", value: this.form.adminEmailAddress },
            { label: "是否激活", value: this.form.isActive ? "是" : "否" },
            { label: "负责人", value: this.form.contactPerson },
            { label: "联系方式", value: this.form.contactTelPhone },
            // { label: "折扣(%)", value: this.form.discount },
            {
              label: "级别",
              value: this._.find(this.gradeList, { id: this.form.grade })
                ? this._.find(this.gradeList, { id: this.form.grade }).name
                : ""
            }
          ];
          this.form.id && config.splice(1, 2);
          this.getConfirmHtml(config).then(res => {
            this.saveLoading = true;
            let url = this.form.id ? "UpdateTenant" : "CreateTenant";
            let message = this.form.id ? "修改成功" : "创建成功";
            let newForm = JSON.parse(JSON.stringify(this.form));
            newForm.name = newForm.tenancyName;
            [
              newForm.provinceId,
              newForm.cityId,
              newForm.countyId
            ] = this.selectedOptions;
            Tenant[url](newForm).then(
              res => {
                this.saveLoading = false;
                this.$emit("saveOk");
                this.handleClose();
                this.$message.success(message);
              },
              () => {
                this.saveLoading = false;
              }
            );
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.addAgent-card {
  border-left: 8px solid #2a2a3f;
  background-color: #f8f8f9;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: 10px;
}
.addAgent-card-type {
  color: #666666;
  letter-spacing: 0;
  margin-left: 15px;
}
.addAgent-card-content {
  margin-left: 15px;
}
</style>
