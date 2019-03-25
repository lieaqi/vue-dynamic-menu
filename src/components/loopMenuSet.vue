
<template  >
  <div>
    <div :index="route.path" v-for="(route,i) in routes" :key="i" :is="getType(route.children)">
      <div v-if="getType(route.children)=='el-menu-item'">
        <div class="c-flex">
          <span class="flex-1" @click.stop="checkMenu(route)">
            <i class="el-icon-location"></i>
            <span slot="title">{{route.title}}</span>
          </span>
          <span class="menu-btn m-right-20">
            <i class="el-icon-plus" @click.stop="addMenu(route)"></i>
            <i class="el-icon-delete" @click.stop="deleteMenu(route,i)"></i>
          </span>
        </div>
      </div>
      <template slot="title" v-else>
        <div class="c-flex">
          <span class="flex-1" @click.stop="checkMenu(route)">
            <i class="el-icon-location"></i>
            <span slot="title">{{route.title}}</span>
          </span>
          <span class="menu-btn m-right-20">
            <i class="el-icon-plus" @click.stop="addMenu(route)"></i>
            <i class="el-icon-delete" @click.stop="deleteMenu(route,i)"></i>
          </span>
        </div>
      </template>
      <loopMenuSet v-if="route.children" :routes="route.children"></loopMenuSet>
    </div>
  </div>
</template>

<script>
import loopMenuSet from './loopMenuSet'
export default {
  label: '',

  name: 'loopMenuSet',

  mixins: [],

  components: {
    loopMenuSet
  },

  props: {
    routes: Array
  },

  data() {
    return {}
  },
  created() {},

  mounted() {},

  methods: {
    checkMenu(menu) {
      this.$store.dispatch('setMenuType', 'UPDATEMENU')
      this.$store.dispatch('setMenu', menu)
    },
    addMenu(menu) {
      this.$store.dispatch('setMenuType', 'ADDMENU')
      this.$store.dispatch('setMenu', menu)
    },
    deleteMenu(menu, i) {
      this.$confirm(`是否删除菜单：${menu.title}`).then(_ => {
        this.routes.splice(i, 1)
        this.$message.success('删除成功')
      })
    },
    getType(children) {
      if (children && children.length) {
        return 'el-submenu'
      } else {
        return 'el-menu-item'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-icon-delete {
  color: #ff9800 !important;
}
.el-icon-plus {
  color: #2196f3 !important;
}
</style>
