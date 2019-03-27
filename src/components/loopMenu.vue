
<template  >
  <div>
    <div :index="route.path" v-for="(route,i) in routes" :key="i" :is="getType(route.children)">
      <div v-if="getType(route.children)=='el-menu-item'">
        <i class="el-icon-location"></i>
        <span slot="title">{{route.title}}</span>
      </div>
      <template slot="title" v-else>
        <i class="el-icon-location"></i>
        <span slot="title">{{route.title}} </span>
      </template>
      <loopMenu v-if="route.children" :routes="route.children"></loopMenu>
    </div>
  </div>
</template>

<script>
import loopMenu from './loopMenu'
export default {
  label: '',

  name: 'loopMenu',

  mixins: [],

  components: {
    loopMenu
  },

  props: {
    routes: Array
  },

  data() {
    return {}
  },
  created() {
    console.log(this.routes)
  },

  mounted() {},

  methods: {
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
</style>
