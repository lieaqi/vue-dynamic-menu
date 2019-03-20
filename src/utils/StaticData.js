//静态数据
//商品 表格配置
export const businessTable = [
    { label: "CompanyId", width: "80", prop: "CompanyId", checked: false },
    { label: "公司名称", minWidth: "150", prop: "CompanyName", checked: true },
    { label: "电话号码", width: "120", prop: "PhoneNumber", checked: true },
    {
        label: "订货系统",
        prop: 'dinghuo',
        width: "",
        checked: true,
        children: [
            { label: "版本", width: "110", prop: "VersionName", checked: true },
            { label: "开始时间", width: "140", prop: "StartTime", checked: true, type: 'date' },
            { label: "结束时间", width: "140", prop: "EndTime", checked: true, type: 'date' },
            { label: "微信", width: "140", prop: "WX", checked: true, type: 'object' },
            { label: "操作", width: "", width: "155", prop: "operation", checked: true },
        ]
    },
    {
        label: "名片系统",
        prop: 'card',
        width: "",
        checked: true,
        children: [
            { label: "名片数量", width: "80", prop: "CardStartSize", checked: true },
            { label: "开始时间", width: "140", prop: "CardStartTime", checked: true, type: 'date' },
            { label: "结束时间", width: "140", prop: "CardEndTime", checked: true, type: 'date' },
            { label: "小程序", width: "140", prop: "XCX", checked: true, type: 'object' },
            { label: "操作", width: "", width: "155", prop: "operation", checked: true },
        ]
    },
]
//壹企推表格配置
export const oneEnterprisePushTable = [
    { label: "CompanyId", width: "80", prop: "companyId", checked: false },
    { label: "公司名称", minWidth: "150", prop: "companyName", checked: true },
    { label: "电话号码", width: "120", prop: "contactTelPhone", checked: true },
    { label: "名片数量", width: "80", prop: "productNum", checked: true },
    { label: "开始时间", width: "140", prop: "startTime", checked: true, type: 'date' },
    { label: "结束时间", width: "140", prop: "endTime", checked: true, type: 'date' },
    { label: "小程序", width: "140", prop: "cardAuthorizationInfo", checked: true, type: 'object' },
    { label: "商户号", width: "140", prop: "subMchId", checked: true },
    { label: "审核版本", width: "140", prop: "userverSion", checked: true },
    { label: "发布版本", width: "140", prop: "currentVerSion", checked: true },
    { label: "归属代理商", prop: "tenancyName", checked: true },
    { label: "版权", prop: "isCanUpdateVersion", checked: true },
    { label: "操作", width: "", width: "220", prop: "operation", checked: true },
]
//壹订货 表格配置
export const oneOrderTable = [
    { label: "CompanyId", width: "80", prop: "companyId", checked: false },
    { label: "公司名称", minWidth: "150", prop: "companyName", checked: true },
    { label: "电话号码", width: "120", prop: "contactTelPhone", checked: true },
    { label: "版本", width: "110", prop: "versionName", checked: true },
    { label: "开始时间", width: "140", prop: "startTime", checked: true, type: 'date' },
    { label: "结束时间", width: "140", prop: "endTime", checked: true, type: 'date' },
    { label: "公众号", width: "140", prop: "yiDinghuoAuthorizationInfo", checked: true, type: 'object' },
    { label: "小程序", width: "140", prop: "cardAuthorizationInfo", checked: true, type: 'object' },
    { label: "商户号", width: "140", prop: "subMchId", checked: true },
    { label: "归属代理商", prop: "tenancyName", checked: true },
    { label: "操作", width: "", width: "155", prop: "operation", checked: true },
]
//模板库 表格配置
export const templateTable = [
    { label: "模板版本", width: "120", prop: "userVersion", checked: true },
    { label: "模板描述", width: "", prop: "userDesc", checked: true },
    { label: "模板上传时间", width: "", width: "150", prop: "createTime", checked: true },
    { label: "是否默认", width: "", width: "150", prop: "isDeFault", checked: true },
]
//代理商列表
export const agentTable = [
    { label: "代理商名称", width: "", prop: "tenancyName", checked: true },
    { label: "区域", width: "", prop: "address", checked: true },
    { label: "负责人", width: "", width: "", prop: "contactPerson", checked: true },
    { label: "负责人联系方式", width: "", width: "", prop: "contactTelPhone", checked: true },
    { label: "余额", width: "", width: "", prop: "amount", checked: true },
]
//代理商流水
export const agentFlowingTable = [
    { label: "时间", width: "100px", prop: "creationTime", checked: true },
    { label: "操作人", width: "120px", prop: "userName", checked: true },
    { label: "类型", width: "80px", prop: "tradeCName", checked: true },
    { label: "产品", width: "", prop: "productList", checked: true },
    { label: "客户", width: "", prop: "companyName", checked: true },
    { label: "金额", width: "100px", prop: "amount", checked: true },
    { label: "结余", width: "100px", prop: "balance", checked: true },
    { label: "订单", width: "210px", prop: "number", checked: true },
    { label: "备注", width: "", prop: "remark", checked: true },
]
//财务流水
export const FinanceTable = [
    { label: "时间", width: "100px", prop: "creationTime", checked: true },
    { label: "操作人", width: "120px", prop: "userName", checked: true },
    { label: "类型", width: "80px", prop: "tradeCName", checked: true },
    { label: "代理商", width: "", prop: "tenancyName", checked: true },
    { label: "产品", width: "", prop: "productList", checked: true },
    { label: "客户", width: "", prop: "companyName", checked: true },
    { label: "金额", width: "100px", prop: "amount", checked: true },
    { label: "结余", width: "100px", prop: "balance", checked: true },
    { label: "订单", width: "210px", prop: "number", checked: true },
    { label: "备注", width: "", prop: "remark", checked: true },
]
//产品管理
export const productTable = [
    { label: "产品名称", width: "", prop: "productName", checked: true },
    { label: "简介", width: "", prop: "productDetail", checked: true },
    { label: "价格", width: "", width: "", prop: "productPrice", checked: true },
    { label: "状态", width: "", width: "", prop: "status", checked: true },
]
//产品管理
export const mealProductTable = [
    { label: "产品名称", width: "", prop: "productName", checked: true },
    { label: "单价", width: "", prop: "productPrice", checked: true },
    { label: "数量", width: "", width: "120", prop: "productNum", checked: true },
    { label: "年长", width: "", width: "120", prop: "productTimeNum", checked: true },
]
//产品管理
export const orderTable = [
    { label: "代理商", width: "", prop: "agmentName", checked: true },
    { label: "公司名称", width: "", minWidth: '100px', prop: "companyName", checked: true },
    { label: "订单编号", width: "210px", prop: "number", checked: true },
    { label: "产品/套餐", minWidth: '150px', width: "", prop: "productList", checked: true },
    { label: "金额", width: "70px", prop: "totalPrice", checked: true },
    { label: "下单时间", width: "", width: "", prop: "creationTime", checked: true },
]
//客户管理
export const customerTable = [
    { label: "公司名称", minWidth: '100px', width: "", prop: "companyName", checked: true },
    { label: "联系人", width: "", prop: "contactName", checked: true },
    { label: "联系电话", width: "", width: "", prop: "phoneNumber", checked: true },
    { label: "所属代理", width: "", prop: "agmentName", checked: true },
    { label: "服务人员", width: "", prop: "userName", checked: true }, //新
    { label: "版本", width: "", prop: "versionName", checked: true }, //新
    { label: "注册时间", width: "150px", prop: "creationTime", checked: true },
    { label: "客户来源", width: "", prop: "sourceType", checked: true }, //新
    { label: "最后跟进", width: "150px", prop: "lastRemarkTime", checked: true },
]
//推广表格 
export const InvitationCodeTable = [
    { label: "邀请码", minWidth: '', width: "89px", prop: "invitationCode", checked: true },
    { label: "邀请数量", width: "89px", prop: "dredgeNum", checked: true },
    { label: "员工姓名", width: "", prop: "userName", checked: true },
    { label: "所属部门", width: "", prop: "displayName", checked: true }, //新
    { label: "所属公司", width: "", prop: "tenancyName", checked: true }, //新
    // { label: "注册商户", width: "", prop: "t3", checked: true },
]
//推广表格 
export const CodeInformationListTable = [
    { label: "邀请码", width: "", prop: "invitationCode", checked: true },
    { label: "注册时间", width: "", prop: "creationTime", checked: true },
    { label: "公司名称", minWidth: '', width: "", prop: "companyName", checked: true },
    { label: "联系人", width: "", prop: "contactPerson", checked: true },
    { label: "联系电话", width: "", prop: "contactTelPhone", checked: true },
    { label: "所属代理", width: "", prop: "tenancyName", checked: true },
    { label: "所属部门", width: "", prop: "displayName", checked: true },

    //{ label: "用户名", minWidth: '', width: "", prop: "userName", checked: true },
    // { label: "注册商户", width: "", prop: "t3", checked: true },
]
//时间区间配置
export const pickerOptions = {
    shortcuts: [
    {
        text: "最近一周",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
        }
    },
    {
        text: "最近一个月",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
        }
    },
    {
        text: "最近三个月",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
        }
    }]
}