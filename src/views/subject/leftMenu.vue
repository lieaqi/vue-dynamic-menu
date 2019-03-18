
<template>
  <section>
    <div class="top-title">
      <div>后台管理</div>
      <div class="f-title">CRM</div>
    </div>
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
      <div :index="route.path" v-for="route in routes" :key="route.path" :is="getType(route.children)">
        <div v-if="getType(route.children)=='el-menu-item'">
          <i class="el-icon-setting"></i>
          <span slot="title">{{route.meta.title}}</span>
        </div>
        <div v-else>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{route.meta.title}}</span>
            </template>
            <el-menu-item index="1-4-1" v-for="routeChild in route.children" :key="routeChild.path">{{routeChild.meta.title}}</el-menu-item>
          </el-submenu>
        </div>
      </div>
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
      isCollapse: false,
      routes: []
    }
  },
  created() {
    this.routes = this.getRoute(this.$router.options.routes)
    console.log(this.routes)
  },

  mounted() {},

  methods: {
    getRoute(routes) {
      return routes
        .filter(r => !r.hidden)
        .map(r => {
          r.children = r.children ? this.getRoute(r.children) : null
          return r
        })
    },
    getType(children) {
      if (children.length > 1) {
        return 'el-submenu'
      } else {
        return 'el-menu-item'
      }
    }
  },
  computed: {
    defaultActive() {
      return this.$route.path
    }
  }
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
