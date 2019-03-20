export let mixinHeight = {
  data() {
    return {
      fullHeight: document.documentElement.clientHeight - 230,
      reduceHeight:230,
    }
  },
  mounted() {
    const that = this;
    window.onresize = function temp() {
      that.fullHeight = document.documentElement.clientHeight - that.reduceHeight;
    };
  },
  created:function() {
    this.fullHeight = document.documentElement.clientHeight - this.reduceHeight;
  },
  destroyed() {
    this.fullHeight = null;
  }
}
export let mixinPage = {
  data() {
    return {
      currentPage:1,
      pageSize:25,
      totalNum:0,
      SortField:'',
      IsAsc:'',
      defaultSort:'CommodityName'
    }
  },
  methods:{
    // 计算filter
    getFilter(Field,Method,Value){
      return {"CalculatedField":Field,"CalculatedMethod":Method,"CalculatedValue":Value}
    },
    // 计算数字
    getNum(num,type){
        let n = type ? num+1 : num
        return n < 10 ? `0${n}`:n
    },
    getValue(list,id){
      let name = '';
      list.map(e=>{
        if(e.Id == id) name = e.Name
      })
      return name
    },
    // 计算日期
    getDateVal(date){
        let mon = this.getNum(date.getMonth(),1)      
        let d = this.getNum(date.getDate()) 
        let h = this.getNum(date.getHours()) 
        let m = this.getNum(date.getMinutes()) 
        let t1 = `${date.getFullYear()}-${mon}-${d} ${h}:${m}`
        return t1
    },
    // 页长
    handleSizeChange(val) {
      this.pageSize = val
      this.goSearch();
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.goSearch();
    },
    // 排序改变
    handleSortChange(val) {
      console.log(val)
      if (val.prop) {
        this.SortField = val.prop;
        this.IsAsc = val.order == "descending" ? false : true;
      } else {
        this.SortField = this.defaultSort;
        this.IsAsc = false
      }
      this.goSearch();
    },
  }
}