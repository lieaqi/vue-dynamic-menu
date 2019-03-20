<template>
  <el-dialog title="添加产品/修改" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent">
    <section v-loading="loading">
      <div class="addAgent-card">
        <div class="addAgent-card-type">产品名称</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入产品名称" v-model="form.productName"></el-input>
        </div>
      </div>
      <div class="addAgent-card">
        <div class="addAgent-card-type">产品介绍</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入产品介绍" v-model="form.productDetail" type="textarea" :rows="2" resize="none"></el-input>
        </div>
      </div>
      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">单价( 元 )</div>
          <div class="addAgent-card-content">
            <el-input placeholder="请输入单价" v-model="form.productPrice"></el-input>
          </div>
        </div>
        <div class="addAgent-card flex-1">
          <div class="addAgent-card-type">产品状态</div>
          <div class="addAgent-card-content">
            <el-switch v-model="form.status" active-text="上架" inactive-text="下架">
            </el-switch>
          </div>
        </div>
      </div>
      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">产品英文名</div>
          <div class="addAgent-card-content">
            <el-select v-model="form.productEName " placeholder="请选择">
              <el-option label="Card" value="Card"></el-option>
              <el-option label="YiDingHuo" value="YiDingHuo"></el-option>
            </el-select>
          </div>
        </div>
        <div class="addAgent-card flex-1">
          <div class="addAgent-card-type">时间类型</div>
          <div class="addAgent-card-content">
            <el-select v-model="form.timeType" placeholder="请选择">
              <el-option label="年" value="Year"></el-option>
              <el-option label="日" value="Day"></el-option>
            </el-select>
          </div>
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
  label: "添加产品",

  name: "addProduct",

  mixins: [],

  components: {},

  props: {
    dialogVisible: Boolean,
    productId: [String, Number]
  },

  data() {
    return {
      form: {
        id: "",
        productName: "",
        productPrice: "",
        productDetail: "",
        status: true,
        timeType: "",
        productEName: ""
      },
      saveLoading: false,
      loading: false
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.productId && this.GetProductDetail(this.productId);
  },

  destroyed() {},

  methods: {
    GetProductDetail(productId) {
      this.loading = true;
      Agment.GetProductDetail({ id: productId }).then(res => {
        Object.keys(this.form).map(
          f => {
            this.form[f] = res.result[f];
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      });
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      let config = [
        { label: "产品名称", value: this.form.productName },
        { label: "产品介绍", value: this.form.productDetail },
        { label: "单价(元)", value: this.form.productPrice },
        { label: "产品状态", value: this.form.status ? "上架" : "下架" }
      ];
      this.getConfirmHtml(config).then(res => {
        this.saveLoading = true;
        let url = this.form.id ? "UpdateProduct" : "AddProduct";
        let message = this.form.id ? "修改成功" : "添加成功";
        Agment[url](this.form).then(
          res => {
            this.$message.success(message);
            this.saveLoading = false;
            this.handleClose();
            this.$emit("saveOk");
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
