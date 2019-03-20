<template>
    <section class="crm-section">
        <header class="customer-header">
            <div class="c-flex">
                <div class="flex-1">
                    <span>公司名称</span>
                    <el-input style="width:200px" size="mini" @keyup.enter="GetCustomer(1)" v-model="searchInfo.companyName"></el-input>
                    <el-button @click="GetCustomer(1)" size="mini" type="primary">搜索</el-button>
                </div>
                <el-button size="mini" type="primary" @click="openDialog('','addCustomerDialog')">新增客户</el-button>
            </div>
        </header>
        <el-table :data="customerData" border style="width: 100%" v-loading="loading" highlight-current-row>
            <el-table-column :label="data.label" :width="data.width" :min-width="data.minWidth" v-for="data in customerTable" :key="data.prop" v-if="data.checked&&data.prop!=(tenant?'agmentName':'userName')">
                <template slot-scope="scope">
                    <span> {{scope.row[data.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :width="270+!Boolean(tenant)*60" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="openDialog(scope.row.customerId,'addCustomerDialog',scope.row.tenantId)">修改</el-button>
                    <!-- <el-button type="text" size="mini" @click="deleteCustomer(scope.row)">删除</el-button> -->
                    <el-button type="text" size="mini" @click="openDialog(scope.row.customerId,'addOrderDialog')">下单</el-button>
                    <el-button type="text" size="mini" @click="openDialog(scope.row.customerId,'customerFollowUpDialog')">跟进</el-button>
                    <el-button type="text" size="mini" @click="openDialog(scope.row.customerId,'lookOrderDialog')">查看订单</el-button>
                    <el-button type="text" size="mini" @click="openDialog(scope.row.customerId,'agentFlowingDialog',scope.row.tenantId)">查看流水</el-button>
                    <el-button v-if="!Boolean(tenant)" type="text" size="mini" @click="openDialog(scope.row.customerId,'transferDialog','',scope.row.companyName)">转移客户</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchInfo.pageCount" :page-sizes="[25,50,75]" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount" style="float:right;">
        </el-pagination>
        <addCustomer :dialogVisible.sync="addCustomerDialog" v-if="addCustomerDialog" @saveOk="GetCustomer(1)" :customerId="customerId" :checkId="tenantId"></addCustomer>
        <lookOrder :dialogVisible.sync="lookOrderDialog" v-if="lookOrderDialog" :customerId="customerId"></lookOrder>
        <transfer :dialogVisible.sync="transferDialog" v-if="transferDialog" :customerId="customerId" :customerName="customerName"></transfer>
        <customerFollowUp :dialogVisible.sync="customerFollowUpDialog" v-if="customerFollowUpDialog" :customerId="customerId"></customerFollowUp>
        <addOrder :dialogVisible.sync="addOrderDialog" v-if="addOrderDialog" @saveOk="GetCustomer(1)" :customerId="customerId"></addOrder>
        <agentFlowing :dialogVisible.sync="agentFlowingDialog" v-if="agentFlowingDialog" :checkId="tenantId" :customerId="customerId"></agentFlowing>

    </section>
</template>

<script>
    import { customerTable } from "@/utils/StaticData";
    import addCustomer from "./addCustomer.vue";
    import lookOrder from "./lookOrder.vue";
    import customerFollowUp from "./customerFollowUp.vue";
    import Agment from "@/services/agencyManagement/Agment";
    import addOrder from "./addOrder.vue";
    import agentFlowing from "../Agent/agentFlowing.vue";
    import transfer from "./transfer.vue";

    export default {
        label: "客户管理",

        name: "Customer",

        mixins: [],

        components: {
            addCustomer,
            lookOrder,
            customerFollowUp,
            addOrder,
            agentFlowing,
            transfer
        },

        props: {},

        data() {
            return {
                customerId: "",
                customerName: "",
                tenantId: "",
                loading: false,
                addCustomerDialog: false,
                lookOrderDialog: false,
                customerFollowUpDialog: false,
                addOrderDialog: false,
                agentFlowingDialog: false,
                transferDialog: false,
                customerTable,
                customerData: [],
                totalCount: 0,
                tenant: null,
                searchInfo: {
                    pageCount: 1,
                    pageSize: 25,
                    companyName: ""
                }
            };
        },

        computed: {},

        watch: {},

        created() {
            this.tenant = this.$store.state.session.tenant;
        },

        mounted() {
            this.GetCustomer();
        },

        destroyed() {},

        methods: {
            openDialog(customerId, type, tenantId, customerName = "") {
                this.customerId = customerId || "";
                this.tenantId = tenantId || "";
                this[type] = true;
                console.log(customerName)
                this.customerName = customerName;
            },
            GetCustomer(pageCount) {
                this.loading = true;
                this.searchInfo.pageCount = pageCount || this.searchInfo.pageCount;
                Agment.GetCustomer(this.searchInfo).then(
                    res => {
                        this.customerData = res.result.items;
                        this.totalCount = res.result.totalCount;
                        this.loading = false;
                    },
                    () => {
                        this.loading = false;
                    }
                );
            },
            deleteCustomer() {
                this.$confirm("是否删除此客户?", "提示", {}).then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                });
            },
            upProduct() {
                this.$message({
                    type: "success",
                    message: "上架成功!"
                });
            },
            downProduct() {
                this.$message({
                    type: "success",
                    message: "下架成功!"
                });
            },
            handleCurrentChange(val) {
                this.searchInfo.pageCount = val;
                this.GetCustomer();
            },
            handleSizeChange(val) {
                this.searchInfo.pageSize = val;
                this.GetCustomer();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .customer-header {
        padding: 10px;

        .el-input {
            width: 250px;
            margin-left: 10px;
        }
    }
</style>