
<template>
  <section>
    <el-container>
      <el-aside width="220px">
        <leftMenu></leftMenu>
      </el-aside>
      <el-container>
        <el-header style="display: flex;align-items: center;">
          <span class="flex-1">
          </span>
          <div class="subject-user">
            <el-dropdown trigger="click" @command="handleCommand">
              <div class="subject-user">
                <span class="subject-userName">落逸</span>
                <img src="https://lieaqi.oss-cn-beijing.aliyuncs.com/score/%E6%99%93.jpg" alt="" class="subject-userImg">
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="menu" v-for="(menu,i) in menus" :key="i">
                  <i :class="`iconfont ${menu.icon} m-right-5`"></i>{{menu.text}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <div>

            <router-view></router-view>

          </div>
        </el-main>
      </el-container>
    </el-container>
  </section>

</template>
<script>
import leftMenu from './leftMenu.vue'
import { mapActions } from 'vuex'
export default {
  label: '框架体',

  name: 'subject',

  mixins: [],

  components: {
    leftMenu
  },

  props: {},

  data() {
    return {
      menus: []
    }
  },
  created() {
    this.menus = [{ type: 'fc', value: 'loginOut', text: '退出', icon: 'icon-tuichu' }]
  },

  mounted() {},

  methods: {
    doSomething(e) {
      console.log(e, 1)
    },
    ...mapActions(['loginOut']),
    handleCommand(command) {
      command.type == 'url' ? this.goUrl(command.value) : this[command.value]()
    },
    goUrl(url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: white;
  color: #333;
  height: 40px !important;
  box-shadow: 0px 2px 0px #ccc;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: whitesmoke;
  margin-top: 2px;
  padding: 10px !important;
  > div {
    min-height: 100%;
    background-color: white;
    border-radius: 5px;
    display: flex;
    > section {
      padding: 10px;
      flex: 1;
    }
  }
}
.subject-user {
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    .subject-userImg {
      width: 35px;
      height: 35px;
    }
    .subject-userName {
      font-size: 14px;
    }
  }
}
.subject-userImg {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
  transition: 0.3s;
}
.subject-userName {
  font-size: 12px;
  transition: 0.3s;
}
</style>
