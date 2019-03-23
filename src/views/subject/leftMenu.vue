
<template>
  <section>
    <div class="top-title">
      <div>后台管理</div>
      <div class="f-title">CRM</div>
    </div>
    <!-- <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
      <div :index="`${route.path}/${route.children[0].path}`" v-for="route in routes" :key="route.path" :is="getType(route.children)">
        <div v-if="getType(route.children)=='el-menu-item'">
          <i :class="`iconfont ${route.meta.icon}`"></i>
          <span slot="title">{{route.meta.title}}</span>
        </div>
        <template slot="title" v-else>
          <i class="el-icon-location"></i>
          <span slot="title">{{route.meta.title}}</span>
        </template>
        <el-menu-item :index="`${route.path}/${routeChild.path}`" v-for="(routeChild,i) in route.children" v-if="i>1||(route.children.length!=1)" :key="routeChild.path">{{routeChild.meta.title}}</el-menu-item>
      </div>
    </el-menu> -->
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
