<template>
    <el-dialog title="跟进记录" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <section>
            <header>
                <el-button type="primary" size="small" style="margin-bottom: 10px;" v-loading="addLoading" @click="add" :disabled="textarea==''">添加跟进</el-button>
                <el-input type="textarea" :rows="4" placeholder="请输入跟进" v-model="textarea" resize="none">
                </el-input>
            </header>
            <section style="max-height: 300px; overflow: auto;margin-top: 20px;" @scroll="followScroll($event)" v-loading="loading">
                <timeline>
                    <timeline-item bg-color="#9dd8e0" v-for="(r,i) in remark" :key="i">
                        <div class="customerFollowUp-time">{{r.creationTime}}</div>
                        <div class="customerFollowUp-text">
                            {{r.detail}}
                        </div>
                    </timeline-item>
                </timeline>
            </section>
        </section>
    </el-dialog>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
import Agment from "@/services/agencyManagement/Agment";

export default {
  label: "添加跟进",

  name: "customerFollowUp",

  mixins: [],

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },

  props: {
    dialogVisible: Boolean,
    customerId: [String, Number]
  },

  data() {
    return {
      form: {
        level: 1
      },
      textarea: "",
      searchInfo: {
        customerId: "",
        pageCount: 1,
        pageSize: 5
      },
      totalCount: 0,
      remark: [],
      loading: false,
      addLoading: false
    };
  },

  computed: {},

  watch: {},

  created() {
    this.searchInfo.customerId = this.customerId;
    this.GetRemark();
  },

  mounted() {},

  destroyed() {},

  methods: {
    add() {
      let data = {
        customerId: this.customerId,
        detail: this.textarea
      };
      this.addLoading = true;
      Agment.AddRemark(data).then(
        res => {
          this.addLoading = false;
          this.$message.success("添加成功");
          this.textarea = "";
          this.GetRemark();
        },
        () => {
          this.addLoading = false;
        }
      );
    },
    followScroll(e) {
      let target = e.target;
      let state = target.clientHeight == target.scrollHeight - target.scrollTop;
      if (state) {
        if (!this.loading && this.searchInfo.pageSize <= this.totalCount) {
          this.searchInfo.pageSize += 5;
          this.GetRemark();
        }
      }
    },
    GetRemark() {
      this.loading = true;
      Agment.GetRemark(this.searchInfo).then(
        res => {
          this.remark = res.result.items;
          this.totalCount = res.result.totalCount;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    save() {}
  }
};
</script>
<style lang="scss" scoped>
.customerFollowUp-time {
  font-size: 12px;
  color: #ccc;
}
.customerFollowUp-text {
  margin-top: 10px;
}
</style>
