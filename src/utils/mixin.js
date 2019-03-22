export let mixinPage = {
  data() {
    return {
      PageIndex:1,
      PageSize:10,
      TotalNum:0,
    }
  },
  methods:{
    // 刷新
    freshPage(){
      this.PageIndex=1
      this.goSearch()
    },
    // 页长
    handleSizeChange(val) {
      this.PageSize = val
      this.goSearch();
    },
    // 当前页
    handleCurrentChange(val) {
      this.PageIndex = val
      this.goSearch();
    },
  }
}