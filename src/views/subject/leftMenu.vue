
<template>
  <section>
    <div class="top-title">
      <div>后台管理</div>
      <div class="f-title">CRM</div>
    </div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script>
export default {
  label: '左侧菜单',

  name: 'leftMenu',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      isCollapse: false
    }
  },
  created() {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu {
  border-right: 0px;
  padding-top: 10px;
}
.top-title {
  background-color: #162850;
  color: white;
  padding: 10px;
  border-bottom: 1px solid #233969;
  font-size: 16px;
  letter-spacing: 3px;
  text-align: center;
  font-weight: bold;
  .f-title {
    margin-top: 10px;
    font-size: 12px;
  }
}
section {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-menu {
    flex: 1;
  }
}
</style>
