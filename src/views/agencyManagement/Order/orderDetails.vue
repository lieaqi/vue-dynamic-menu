<template>
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent">
        <section v-loading="loading">
            <div class="addAgent-card">
                <div class="addAgent-card-type">订单编号</div>
                <div class="addAgent-card-content">
                    {{orderDetail.number}}
                </div>
            </div>
            <div class="c-flex">
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">公司名称</div>
                    <div class="addAgent-card-content">
                        {{orderDetail.companyName}}
                    </div>
                </div>
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">联系人</div>
                    <div class="addAgent-card-content">
                        {{orderDetail.contactName}}
                    </div>
                </div>
            </div>
            <div class="c-flex">
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">所属代理</div>
                    <div class="addAgent-card-content">
                        {{orderDetail.agmentName}}
                    </div>
                </div>
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">联系电话</div>
                    <div class="addAgent-card-content">
                        {{orderDetail.phoneNumber}}
                    </div>
                </div>
            </div>
        </section>
        <section>
            <h3>购买产品/套餐</h3>
            <el-table :data="orderDetail.productList" border style="width: 100%"  highlight-current-row class="normalTable">
                <el-table-column prop="productName" label="产品名称">
                </el-table-column>
                <el-table-column prop="productNum" label="数量">
                </el-table-column>
                <el-table-column prop="productTimeNum" label="年数">
                </el-table-column>
            </el-table>
        </section>
        <div class="c-flex" style="margin-top:20px">
            <div class="addAgent-card flex-1" style="margin-right:20px">
                <div class="addAgent-card-type">下单时间</div>
                <div class="addAgent-card-content">
                    {{orderDetail.creationTime}}
                </div>
            </div>
            <div class="addAgent-card flex-1">
                <div class="addAgent-card-type">下单人</div>
                <div class="addAgent-card-content">
                    {{orderDetail.userName}}
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { mealProductTable } from "@/utils/StaticData";
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "订单详情",

  name: "orderDetails",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    checkId: [String, Number]
  },

  data() {
    return {
      loading: false,
      orderDetail: {
        productList: []
      },
      orderDetailsData: [
        {
          name: "壹起推",
          price: "365元/张",
          number: "366"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.checkId && this.GetOrderDetail(this.checkId);
  },

  destroyed() {},

  methods: {
    GetOrderDetail(checkId) {
      this.loading = true;
      Agment.GetOrderDetail({ id: checkId }).then(
        res => {
          this.orderDetail = res.result;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
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
</style>
