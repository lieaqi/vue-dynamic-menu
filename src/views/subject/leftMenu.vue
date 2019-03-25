
<template>
  <section>
    <div class="top-title">
      <div>后台管理</div>
      <div class="f-title">CRM</div>
    </div>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
      <loopMenu :routes="routes"></loopMenu>
    </el-menu>
  </section>
</template>

<script>
import loopMenu from '@/components/loopMenu.vue'
export default {
  label: '左侧菜单',

  name: 'leftMenu',

  mixins: [],

  components: {
    loopMenu
  },

  props: {},

  data() {
    return {
      isCollapse: false,
      routes: []
    }
  },
  created() {
    this.routes = [
      {
        children: [
          {
            title: '子菜单',
            path: '/menu/childMenu',
            show: true,
            name: 'menu',
            icon: '',
            children: [
              {
                title: '子子菜单',
                path: '/menu/childMenu',
                show: true,
                name: 'menu',
                icon: ''
              }
            ]
          }
        ],
        title: '菜单1',
        path: '/menu',
        show: false,
        name: 'menu',
        icon: 'icon-yiwurenyuan'
      }
    ]
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
