
<template>
  <section class="c-flex-c">

    <div class="dividing-line m-bottom-20"></div>
    <div class="c-flex flex-1" style="flex-wrap: wrap;">
      <el-menu class="el-menu-vertical-demo" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
        <div :index="route.path" v-for="route in routes" :key="route.path" :is="getType(route.children)">
          <div v-if="getType(route.children)=='el-menu-item'">
            <!-- <i :class="`iconfont ${route.icon}`"></i> -->
            <i class="el-icon-location"></i>
            <span slot="title">{{route.title}}</span>
          </div>
          <template slot="title" v-else>
            <i class="el-icon-location"></i>
            <span slot="title">{{route.title}}</span>
          </template>
          <el-menu-item :index="routeChild.path" v-for="(routeChild,i) in route.children" :key="routeChild.path">{{routeChild.title}}</el-menu-item>
        </div>
      </el-menu>
      <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>

      <el-card class="box-card right-menu-config" :disabled="true">
        <div slot="header" class="clearfix">
          <span>新增菜单</span>
          <el-button style="float: right; padding: 3px 0" type="text">新增菜单</el-button>
        </div>
        <el-form :model="routeForm" :rules="routeRules" ref="routeForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="父级菜单" prop="title">
            <span>菜单</span>
          </el-form-item>
          <el-form-item label="快速选择">
            <el-cascader :options="allRoutes" change-on-select :props="props" @change="checkMenu">
            </el-cascader>
          </el-form-item>
          <el-form-item label="名称" prop="title">
            <el-input v-model="routeForm.title"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="name">
            <el-input v-model="routeForm.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="路由地址" prop="path">
            <el-input v-model="routeForm.path" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="icon">
            <el-input v-model="routeForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="显示" prop="show">
            <el-switch v-model="routeForm.show" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">保存并继续</el-button>
            <el-button type="warning">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
      <pre>
        {{routes}}
      </pre>
    </div>

  </section>
</template>

<script>
export default {
  label: '',

  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      routes: [],
      routeForm: {},
      routeRules: {},
      allRoutes: [],
      props: {
        label: 'title',
        value: 'path'
      }
    }
  },
  created() {
    this.allRoutes = this.$router.options.routes.filter(r => !r.initial)
    let routes = [
      {
        children: [
          {
            title: '子菜单',
            path: '/menu/childMenu',
            show: true,
            name: 'menu',
            icon: ''
          }
        ],
        title: '菜单1',
        path: '/menu',
        show: false,
        name: 'menu',
        icon: 'icon-yiwurenyuan'
      }
    ]
    this.routes = this.getRoute(routes)
  },

  mounted() {},

  methods: {
    checkMenu(menu) {
      let newMenu = JSON.parse(JSON.stringify(menu))
      let config = this.getRouteConfig(newMenu, this.allRoutes)
      this.routeForm = JSON.parse(JSON.stringify(config.route))
      this.routeForm.path = config.fatherPath + this.routeForm.path
    },
    getRouteConfig(menu, routes, fatherPath = '') {
      let path = menu.splice(0, 1)[0]
      let route = this._.find(routes, { path })
      menu.length && (fatherPath += `${path.split('')[0] == '/' ? '' : '/'}${path}`)
      return menu.length
        ? this.getRouteConfig(menu, route.children, fatherPath)
        : { route, fatherPath }
    },
    getRoute(routes) {
      return routes
        .filter(r => !r.hidden)
        .map(r => {
          r.children = r.children ? this.getRoute(r.children) : null
          return r
        })
    },
    getType(children) {
      if (children.length) {
        return 'el-submenu'
      } else {
        return 'el-menu-item'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 400px;
  min-height: 400px;
}
.right-menu-config {
  width: 600px;
}
.el-cascader {
  width: 100%;
}
.el-card {
  flex: 0 0 600px;
}
</style>
