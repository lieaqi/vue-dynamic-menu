
<template>
  <section class="c-flex-c">

    <div class="top-search m-top-10">
      <el-button type="primary" @click="addFirstMenu">新增初级菜单</el-button>
      <el-button type="success" @click="synchronization">同步菜单</el-button>
    </div>
    <div class="dividing-line m-bottom-20"></div>
    <div class="c-flex-c flex-1">
      <div class="c-flex flex-1" style="flex-wrap: wrap;">
        <el-menu class="el-menu-vertical-demo" active-text-color="#ffffff" background-color="#162850" text-color="#c0c4cc">
          <loopMenuSet :routes="routes"></loopMenuSet>
        </el-menu>
        <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
        <el-card class="box-card right-menu-config" :disabled="true">
          <div slot="header" class="clearfix">
            <span>{{menuSetTitle}}</span>
          </div>
          <div class="quickRoute" v-if="$store.state.menuType!='UPDATEMENU'">
            <span class="title">快速选择:</span>
            <el-cascader :options="allRoutes" change-on-select :props="props" @change="checkMenu" v-model="quickRoute">
            </el-cascader>
          </div>

          <el-form :model="routeForm" :rules="routeRules" ref="routeForm" label-width="100px" class="demo-ruleForm" :key="new Date().getTime()">
            <el-form-item label="父级菜单" v-if="$store.state.menuType!='UPDATEMENU'">
              <span>{{fatherTitle||'---'}}</span>
            </el-form-item>
            <el-form-item label="父级路径" v-if="$store.state.menuType!='UPDATEMENU'">
              <span>{{fatherPath||'---'}}</span>
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
              <el-button type="primary" @click="save">保存并继续</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <div class="margin-0-20" style=" width: 1px;background-color: whitesmoke;"></div>
        <pre>
        {{routes}}
      </pre>
      </div>
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
      routeRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        name: [{ required: true, message: '请选择英文名称', trigger: 'blur' }],
        path: [{ required: true, message: '请选择路径', trigger: 'blur' }]
      },
      allRoutes: [],
      props: {
        label: 'title',
        value: 'path'
      },
      fatherTitle: '',
      fatherPath: '',
      menuSetTitle: '新增菜单',
      quickRoute: []
    }
  },
  watch: {
    '$store.state.menu': function(menu) {
      this.initRouteForm()
      let type = this.$store.state.menuType
      this.menuConfig(type, menu)
    }
  },
  created() {
    this.allRoutes = this.$router.options.routes.filter(r => !r.initial)
    this.routes = this.getRoute(this._.cloneDeep(this.$store.state.routes))
    this.allRoutes = this.getRoute(this.allRoutes)
    this.addFirstMenu()
  },

  mounted() {},

  methods: {
    synchronization() {
      this.$store.dispatch('synchronization', this.routes).then(res => {
        this.$message.success('同步成功')
      })
    },
    initRouteForm() {
      this.quickRoute = []
      this.routeForm = {
        title: '',
        name: '',
        path: '',
        icon: '',
        show: true
      }
    },
    addFirstMenu() {
      this.$store.dispatch('setMenuType', 'FIRSTMENU')
      this.$store.dispatch('setMenu', this.routes)
      this.initRouteForm()
    },
    menuConfig(type, menu) {
      this.menuSetTitle = type == 'UPDATEMENU' ? '修改菜单' : '新增菜单'
      if (type == 'UPDATEMENU') {
        Object.keys(this.routeForm).map(r => {
          this.routeForm[r] = menu[r] || this.routeForm[r]
        })
      } else {
        this.fatherTitle = type == 'ADDMENU' ? menu.title : '---'
        this.fatherPath = type == 'ADDMENU' ? menu.path : '/'
      }
    },
    save() {
      this.$refs.routeForm.validate(state => {
        if (state) {
          this.$message.success('操作成功')
          this.$store.dispatch('saveMenu', this.routeForm)
        } else {
          return false
        }
      })
    },
    checkMenu(menu) {
      let newMenu = this._.cloneDeep(menu)
      let config = this.getRouteConfig(newMenu, this.allRoutes)
      let route = this._.cloneDeep(config.route)
      Object.keys(this.routeForm).map(r => (this.routeForm[r] = route[r]))
      this.routeForm.path = config.fatherPath + this.routeForm.path
      this.$set(this.routeForm, 'show', true)
    },
    getRouteConfig(menu, routes, fatherPath = '') {
      let path = menu.splice(0, 1)[0]
      let route = this._.find(routes, { path })
      menu.length && (fatherPath += `${path}/`)
      return menu.length
        ? this.getRouteConfig(menu, route.children, fatherPath)
        : { route, fatherPath }
    },
    getRoute(routes) {
      return routes
        .filter(r => !r.hidden)
        .map(r => {
          r.meta && Object.keys(r.meta).forEach(key => this.$set(r, key, r.meta[key]))
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
.demo-ruleForm {
  position: relative;
}
.quickRoute {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > .title {
    flex: 0 0 90px;
    text-align: right;
    font-size: 14px;
  }
  .el-cascader {
    margin-left: 10px;
  }
}
</style>
