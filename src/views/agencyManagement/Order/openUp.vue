<template>
  <el-dialog title="新增订单" :visible.sync="dialogVisible" width="400px" :before-close="handleClose" class="addAgent">
    <section>
      <div class="addAgent-card">
        <div class="addAgent-card-type ">开始时间</div>
        <div class="addAgent-card-content">
          <el-date-picker v-model="form.startTime" @change="changeDate" type="date" placeholder="选择开始时间" style="margin-left: -15px;width:100%" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <!-- <div style="margin-left: 15px;color:#f56c6c" v-if="config.endTime">选择日期大于{{config.endTime.substring(0,10)}}</div> -->
      </div>
      <div class="addAgent-card" v-if="!config.isActive">
        <div class="addAgent-card-type">密码</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入详情" v-model="form.passWord" type="password"></el-input>
        </div>
      </div>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" v-loading="saveLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "开通",

  name: "openUp",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number],
    config: Object
  },

  data() {
    return {
      saveLoading: false,
      form: {
        startTime: "",
        passWord: "",
        orderId: ""
      }
    };
  },

  computed: {},

  watch: {},

  created() {
    this.form.orderId = this.checkId;
  },

  mounted() {},

  destroyed() {},

  methods: {
    changeDate(e) {
      return true
      console.log(e);
      let state = this.tab(e + " 00:00:00", this.config.endTime);
      if (!state && this.config.endTime) {
        this.$message.error("选择日期有误");
        this.form.startTime = "";
      }
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      let config = [{ label: "开始时间", value: this.form.startTime }];
      this.getConfirmHtml(config).then(res => {
        this.saveLoading = true;
        Agment.Dredge(this.form).then(
          res => {
            this.$message.success("开通成功");
            this.saveLoading = false;
            this.handleClose();
            this.$emit("saveOk");
          },
          () => {
            this.saveLoading = false;
          }
        );
      });
    },
    tab(date1, date2) {
      console.log(date1, date2);
      var oDate1 = new Date(date1);
      var oDate2 = new Date(date2);
      return oDate1.getTime() > oDate2.getTime();
    }
  }
};
</script>
<style lang="scss" scoped>
.addOrder-mess {
  font-size: 12px;
  color: #ccc;
  margin: 10px 0;
  text-align: center;
}
.addMeal-addproduct {
  text-align: right;
  padding-bottom: 10px;
}
.addAgent-card {
  border-left: 8px solid #2a2a3f;
  background-color: #f8f8f9;
  height: 90px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
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
