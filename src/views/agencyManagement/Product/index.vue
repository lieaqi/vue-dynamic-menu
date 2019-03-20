<template>
  <section class="crm-section">
    <!-- <section class="product-topMenu">
            <div class="title">产品/套餐管理</div>
            <div class="menus">
                <span :class="{ 'type-checked': checkType=='productList' }" @click="checkType='productList'">产品管理</span>
                <span :class="{ 'type-checked': checkType=='mealList' }" @click="checkType='mealList'">套餐管理</span>
            </div>
        </section>
        <section :is="checkType"></section> -->
    <el-tabs v-model="checkType">
      <el-tab-pane label="产品管理" name="productList"></el-tab-pane>
      <el-tab-pane label="套餐管理" name="mealList"></el-tab-pane>
    </el-tabs>
    <section :is="checkType"></section>
  </section>
</template>

<script>
import productList from "./productList";
import mealList from "./mealList";

export default {
  label: "产品",

  name: "Product",

  mixins: [],

  components: {
    productList,
    mealList
  },

  props: {},

  data() {
    return {
      checkType: "productList"
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.product-topMenu {
  background: #23223d;
  width: 100%;
  height: 120px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 40px;
  .title {
    font-size: 22px;
  }
  .menus {
    span {
      font-size: 16px;
      cursor: pointer;
      padding: 10px;
      border-radius: 2px;
    }
    span + span {
      margin-left: 10px;
    }
  }
}
.type-checked {
  background: #0f0f2a;
}
</style>
