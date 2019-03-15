
<template>
  <section>
    <el-container>
      <el-aside width="180px">
        <leftMenu></leftMenu>
      </el-aside>
      <el-container>
        <el-header style="display: flex;align-items: center;">
          <span class="flex-1">
          </span>
          <div class="subject-user">
            <img src="https://lieaqi.oss-cn-beijing.aliyuncs.com/score/%E6%99%93.jpg" alt="" class="subject-userImg">
            <span class="subject-userName">落逸</span>
          </div>
        </el-header>
        <el-main>
          <div>
            <section>233</section>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </section>

</template>
<script>
import leftMenu from './leftMenu.vue'

export default {
  label: '框架体',

  name: 'subject',

  mixins: [],

  components: {
    leftMenu
  },

  props: {},

  data() {
    return {}
  },
  created() {},

  mounted() {},

  methods: {}
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
    > section {
      padding: 10px;
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
