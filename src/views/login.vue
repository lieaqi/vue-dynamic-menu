
<template>
  <section>
    <div class="login">
      <div class="top-login">
        <div class="title">
          后台管理
        </div>
        <div class="m-top-10">
          crm
        </div>
      </div>
      <div class="bottom-login">
        <div class="margin-15-10">
          <i class="el-icon-edit m-right-10"></i>
          <el-input placeholder="请输入账号"></el-input>
        </div>
        <div class="margin-15-10">
          <i class="el-icon-edit m-right-10"></i>
          <el-input placeholder="请输入密码"></el-input>
        </div>
        <div class="btn-login">
          <el-button type="primary">后台登陆</el-button>
        </div>
      </div>
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
    return {}
  },
  created() {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
section {
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  width: 370px;
  margin-bottom: 20vh;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 5px 5px 2px #ebeef5;
  .top-login {
    color: white;
    text-align: center;
    padding: 30px 0;

    background: linear-gradient(#2ba0ff, #2e71b7, #2b80c5);
    .title {
      font-size: 24px;
      letter-spacing: 3px;
    }
    .f-title {
      margin-top: 10px;
    }
  }
  .bottom-login {
    padding: 10px 40px;
    background-color: white;
    .el-input {
      width: 248px;
    }
    .btn-login {
      text-align: center;
      padding: 10px 0 20px 0;
      > button {
        border-radius: 20px;
        padding: 10px 60px;
      }
    }
  }
}
</style>
