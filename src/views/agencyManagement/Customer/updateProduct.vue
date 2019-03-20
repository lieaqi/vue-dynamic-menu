<template>
  <el-dialog title="客户下单" :visible.sync="dialogVisible" width="550px" :before-close="handleClose" class="addAgent" :append-to-body="true">
    <section>
      <div class="addAgent-card">
        <div class="addAgent-card-type">时间区间</div>
        <div class="addAgent-card-content">
          <el-date-picker v-model="startTime" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
          </el-date-picker>
          <span style="margin:0 5px">至</span>
          <el-date-picker v-model="endTime" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </div>
      <div class="addAgent-card">
        <div class="addAgent-card-type">产品数量</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入数量" v-model="productNum" type="number"></el-input>
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
  label: "管理员修改客户产品",

  name: "updateProduct",

  mixins: [],

  components: {
    
  },

  props: {
    dialogVisible: Boolean,
    customerId: [String, Number],
    productId: [String, Number]
  },

  data() {
    return {
      saveLoading: false,
      startTime:"",
      endTime:"",
      productNum:"",
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      this.saveLoading = true;
      let data = {
        customerId: this.customerId,
        productId: this.productId,
        startTime: this.startTime,
        endTime: this.endTime,
        productNum: this.productNum
      };
      Agment.UpdateCompanyAndProduct(data).then(
        res => {
          this.$message.success("修改成功");
          this.handleClose();
          this.$emit("saveOk");
          this.saveLoading = false;
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
.addOrder-mess {
  font-size: 12px;
  color: #ccc;
  margin: 10px 0;
  text-align: center;
}
</style>
