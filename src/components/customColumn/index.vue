<template>
    <el-dialog title="自定义列" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-row :gutter="20">
            <el-col :span="6" v-for="column in newTable" :key="column.prop">
                <el-checkbox v-model="column.checked">{{column.label}}</el-checkbox>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="allorNull">全选/清空</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  label: "自定义列",
  name: "customColumn",
  props: {
    table: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dialogVisible: {
      type: Boolean
    }
  },
  watch: {
    dialogVisible: function(val) {
      val && (this.newTable = JSON.parse(JSON.stringify(this.table)));
    }
  },
  data() {
    return {
      newTable: [],
      state: true
    };
  },
  methods: {
    allorNull() {
      this.newTable.map(t => (t.checked = this.state));
      this.state = !this.state;
    },
    ok() {
      this.$emit("update:table", this.newTable);
      this.$emit("update:dialogVisible", false);
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
<style>
</style>
