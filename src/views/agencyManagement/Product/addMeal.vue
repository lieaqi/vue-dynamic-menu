<template>
  <el-dialog title="添加套餐/修改" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent">
    <section v-loading="loading">
      <div class="addAgent-card">
        <div class="addAgent-card-type">套餐名称</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入套餐名称" v-model="form.productName"></el-input>
        </div>
      </div>
      <div class="addAgent-card">
        <div class="addAgent-card-type">套餐简介</div>
        <div class="addAgent-card-content">
          <el-input placeholder="请输入套餐简介" type="textarea" :rows="2" resize="none" v-model="form.productDetail"></el-input>
        </div>
      </div>

      <div class="c-flex">
        <div class="addAgent-card flex-1" style="margin-right:20px;padding-right:16px">
          <div class="addAgent-card-type">组合价格( 元 )</div>
          <div class="addAgent-card-content">
            <el-input placeholder="请输入组合价" v-model="form.productPrice"></el-input>
          </div>
        </div>
        <!-- <div class="addAgent-card flex-1" style="margin-right:20px">
          <div class="addAgent-card-type">单位</div>
          <div class="addAgent-card-content">
            <el-radio-group v-model="form.level">
              <el-radio :label="1">年</el-radio>
              <el-radio :label="2">天限制</el-radio>
            </el-radio-group>
          </div>
        </div> -->
        <div class="addAgent-card flex-1">
          <div class="addAgent-card-type">状态</div>
          <div class="addAgent-card-content">
            <el-switch v-model="form.status" active-text="上架" inactive-text="下架">
            </el-switch>
          </div>
        </div>
      </div>

    </section>
    <section>
      <div class="addMeal-addproduct">
        <el-button round type="primary" icon="el-icon-plus" size="mini" @click="addProductToMealDialog=true">添加产品</el-button>
      </div>
      <el-table :data="form.productList" border style="width: 100%" highlight-current-row class="normalTable">
        <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in mealProductTable" :key="data.prop" v-if="data.checked">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row[data.prop]" :min="1" v-if="data.prop=='productNum'" controls-position="right" style="width:100px"></el-input-number>
            <el-input-number v-model="scope.row[data.prop]" :min="1" v-else-if="data.prop=='productTimeNum'" controls-position="right" style="width:100px"></el-input-number>
            <span v-else> {{scope.row[data.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" v-loading="saveLoading">确 定</el-button>
    </span>
    <addProductToMeal :dialogVisible.sync="addProductToMealDialog" v-if="addProductToMealDialog" @checked="checked" :productList="form.productList" :lists="['productList']"></addProductToMeal>
  </el-dialog>
</template>

<script>
import { mealProductTable } from "@/utils/StaticData";
import addProductToMeal from "@/components/addProductToMeal.vue";

import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "添加套餐",

  name: "addMeal",

  mixins: [],

  components: { addProductToMeal },

  props: {
    dialogVisible: Boolean,
    productId: [String, Number]
  },

  data() {
    return {
      addProductToMealDialog: false,
      loading: false,
      form: {
        id: "",
        productName: "",
        productPrice: "",
        productDetail: "",
        status: true,
        productList: []
      },
      saveLoading: false,
      mealProductTable
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.productId && this.GetSetMealDetail(this.productId);
  },

  destroyed() {},

  methods: {
    GetSetMealDetail(productId) {
      this.loading = true;
      Agment.GetSetMealDetail({ id: productId }).then(
        res => {
          Object.keys(this.form).map(f => {
            this.form[f] = res.result[f];
          });
          this.form.id = productId;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {
      let config = [
        { label: "套餐名称", value: this.form.productName },
        { label: "套餐简介", value: this.form.productDetail },
        { label: "组合价格(元)", value: this.form.productPrice },
        { label: "状态", value: this.form.status ? "上架" : "下架" },
        { label: "产品", value: this.form.productList.map(p=>p.productName).join(' | ')}
      ];
      this.getConfirmHtml(config).then(res => {
        this.saveLoading = true;
        let url = this.form.id ? "UpdateSetMeal" : "AddSetMeal";
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
    },
    checked(row) {
      this.form.productList.push({
        productId: row.productId,
        productNum: 1,
        productTimeNum: 1,
        productPrice: row.productPrice,
        productName: row.productName
      });
      this.addProductToMealDialog = false;
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
