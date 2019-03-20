<template>
  <el-dialog title="充值" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="agentRecharge">
    <section>
      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">收款时间</div>
          <div class="addAgent-card-content">
            <el-date-picker v-model="form.topUpTime" type="date" placeholder="选择充值时间" style="margin-left: -15px;" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </div>
        <div class="addAgent-card flex-1">
          <div class="addAgent-card-type">充值金额</div>
          <div class="addAgent-card-content">
            <el-input placeholder="请输入充值金额" v-model="form.addAmount" type="number"></el-input>
          </div>
        </div>
      </div>
      <div class="addAgent-card " style="height:110px">
        <div class="addAgent-card-type" style="margin:10px 15px">充值方式</div>
        <div class="addAgent-card-content">
          <el-radio-group v-model="form.topUpMethod">
            <el-radio :label="m.id" v-for="m in ToUpDetailList.topUpMethodList" :key="m.id">{{m.name}}</el-radio>
          </el-radio-group>
          <el-input style="width:200px;margin-left: 20px;" v-model="form.topUpMethodOrder" v-if="form.topUpMethod==1026" placeholder="请输入其他内容"></el-input>
        </div>
        <div style="margin-left:15px">备注:
          <el-input style="width:400px;margin-left: 20px;" v-model="form.topUpDetai" placeholder="请输入备注"></el-input>
        </div>
      </div>
      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">充值类型</div>
          <div class="addAgent-card-content">
            <el-radio-group v-model="form.topUpType">
              <el-radio :label="m.id" v-for="m in ToUpDetailList.topUpTypeList" :key="m.id">{{m.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- <div class="addAgent-card flex-1">
                    <div class="addAgent-card-type">充值渠道</div>
                    <div class="addAgent-card-content">
                        <el-radio-group v-model="form.topUpWay">
                            <el-radio :label="m.id" v-for="m in ToUpDetailList.topUpWayList" :key="m.id">{{m.name}}</el-radio>
                        </el-radio-group>
                    </div>
                </div> -->
      </div>
      <div class="addAgent-card ">
        <div class="addAgent-card-type">目前剩余</div>
        <div class="addAgent-card-content">
          {{amount}}元
        </div>
      </div>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tenant from "@/services/agencyManagement/Tenant";

export default {
  label: "代理商充值",

  name: "agentRecharge",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number]
  },

  data() {
    return {
      form: {
        addAmount: 0,
        topUpType: "",
        topUpMethod: "",
        topUpMethodOrder: "",
        topUpWay: "",
        topUpTime: "",
        id: "",
        topUpDetai: ""
      },
      ToUpDetailList: {
        topUpMethodList: [],
        topUpTypeList: [],
        topUpWayList: []
      },
      amount: 0
    };
  },

  computed: {},

  watch: {},

  created() {
    this.GetToUpDetailList();
    this.GetAmount();
    this.form.id = this.checkId;
  },

  mounted() {},

  destroyed() {},

  methods: {
    GetAmount() {
      Tenant.GetAmount({ Id: this.checkId }).then(res => {
        this.amount = res.result;
      });
    },
    GetToUpDetailList() {
      Tenant.GetToUpDetailList({}).then(res => {
        this.ToUpDetailList = res.result;
      });
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      this.form.addAmount =
        this.form.addAmount && parseFloat(this.form.addAmount).toFixed(2);
      let topUpMethod = this._.find(this.ToUpDetailList.topUpMethodList, {
        id: this.form.topUpMethod
      });
      let topUpType = this._.find(this.ToUpDetailList.topUpTypeList, {
        id: this.form.topUpType
      });
      let topUpMethodName = topUpMethod ? topUpMethod.name : "";
      let topUpTypeName = topUpType ? topUpType.name : "";
      let config = [
        { label: "充值金额", value: this.form.addAmount },
        { label: "充值方式", value: topUpMethodName },
        { label: "其他", value: this.form.topUpMethodOrder },
        { label: "备注", value: this.form.topUpDetai },
        { label: "充值类型", value: topUpTypeName }
      ];
      this.form.topUpMethod != 1026 && config.splice(2, 1);
      this.getConfirmHtml(config).then(res => {
        this.saveLoading = true;
        this.form.addAmount = parseInt(this.form.addAmount);
        Tenant.TopUp(this.form).then(
          res => {
            this.saveLoading = false;
            this.$emit("saveOk");
            this.handleClose();
            this.$message.success("充值成功");
          },
          () => {
            this.saveLoading = false;
          }
        );
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
