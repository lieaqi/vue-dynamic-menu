
<template>
  <section class="c-flex-c">

    <div class="dividing-line m-bottom-20"></div>
    <div class="c-flex flex-1" style="flex-wrap: wrap;">
      <el-menu class="el-menu-vertical-demo" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
        <loopMenuSet :routes="routes"></loopMenuSet>
      </el-menu>
      <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
      <el-card class="box-card right-menu-config" :disabled="true">
        <div slot="header" class="clearfix">
          <span>{{menuSetTitle}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addFirstMenu">新增初级菜单</el-button>
        </div>
        <el-form :model="routeForm" :rules="routeRules" ref="routeForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="父级菜单" v-if="$store.state.menuType!='UPDATEMENU'">
            <span>{{fatherTitle||'---'}}</span>
          </el-form-item>
          <el-form-item label="父级路径" v-if="$store.state.menuType!='UPDATEMENU'">
            <span>{{fatherPath||'---'}}</span>
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
            <el-button type="primary" @click="save">保存</el-button>
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
import loopMenuSet from '@/components/loopMenuSet.vue'

export default {
  label: '',

  name: '',

  mixins: [],

  components: {
    loopMenuSet
  },

  props: {},

  data() {
    return {
      routes: [],
      routeForm: {
        title: '',
        name: '',
        path: '',
        icon: '',
        show: ''
      },
      routeRules: {},
      allRoutes: [],
      props: {
        label: 'title',
        value: 'path'
      },
      fatherTitle: '',
      fatherPath: '',
      menuSetTitle: '新增菜单'
    }
  },
  watch: {
    '$store.state.menu': function(menu) {
      let type = this.$store.state.menuType
      this.menuConfig(type, menu)
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
        title: '菜单2',
        path: '/menu',
        show: false,
        name: 'menu',
        icon: 'icon-yiwurenyuan'
      }
    ]
    this.routes = this.getRoute(routes)
    this.addFirstMenu()
  },

  mounted() {},

  methods: {
    addFirstMenu() {
      this.$store.dispatch('setMenuType', 'FIRSTMENU')
      this.$store.dispatch('setMenu', this.routes)
    },
    menuConfig(type, menu) {
      this.menuSetTitle = type == 'UPDATEMENU' ? '修改菜单' : '新增菜单'
      if (type == 'UPDATEMENU') {
        Object.keys(this.routeForm).map(r => {
          this.routeForm[r] = menu[r]
        })
      } else {
        this.fatherTitle = type == 'ADDMENU' ? menu.title : '---'
        this.fatherPath = type == 'ADDMENU' ? menu.path : '/'
      }
    },
    save() {
      this.$message.success('操作成功')
      this.$store.dispatch('saveMenu', this.routeForm)
    },
    checkMenu(menu) {
      let newMenu = JSON.parse(JSON.stringify(menu))
      let config = this.getRouteConfig(newMenu, this.allRoutes)
      let route = JSON.parse(JSON.stringify(config.route))
      this.routeForm = route
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
      return children.length ? 'el-submenu' : 'el-menu-item'
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
