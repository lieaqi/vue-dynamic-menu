<template>
  <el-dialog title="扣费" :visible.sync="dialogVisible" width="400px" :before-close="handleClose" class="addAgent">
    <section>
      <div class="addAgent-card">
        <div class="addAgent-card-type">扣费金额</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入扣费金额" v-model="form.reduceAmount" type="number"></el-input>
        </div>
      </div>
      <div class="addAgent-card">
        <div class="addAgent-card-type">扣费说明</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入扣费说明" v-model="form.remark" type="textarea" :rows="2" resize="none"></el-input>
        </div>
      </div>
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
  label: "扣款",

  name: "withdrawing",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number]
  },

  data() {
    return {
      form: {
        tenantId: "",
        reduceAmount: "",
        remark:"",
      },
      saveLoading: false
    };
  },

  computed: {},

  watch: {},
 
  created() {
    this.form.tenantId=this.checkId;
  },

  mounted() {},

  destroyed() {},

  methods: {
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      this.saveLoading = true;
      Agment.DeductMoney(this.form).then(
        res => {
          this.saveLoading = false;
          this.$emit("saveOk");
          this.handleClose();
          this.$message.success("设置成功");
        },
        () => {
          this.saveLoading = false;
        }
      );
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
