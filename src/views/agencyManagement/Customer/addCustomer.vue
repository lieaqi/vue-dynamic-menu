<template>
    <el-dialog title="添加客户/修改" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" class="addAgent" :append-to-body="true">
        <section v-loading="loading">
            <div class="addAgent-card" v-if="!Boolean(tenant)">
                <div class="addAgent-card-type">选择代理商</div>
                <div class="addAgent-card-content">
                    <el-select v-model="form.tenantId" filterable remote reserve-keyword placeholder="请输入代理商" :remote-method="GetTenantList" :loading="tenantLoading" :disabled="Boolean(this.customerId) ">
                        <el-option v-for="item in tenantList" :key="item.id" :label="item.tenancyName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="c-flex">
                <div class="addAgent-card" style="margin-right: 20px;flex: 0 0 243px;">
                    <div class="addAgent-card-type">公司名称</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入公司名称" v-model="form.companyName"></el-input>
                    </div>
                </div>
                <div class="addAgent-card" style="flex:2">
                    <div class="addAgent-card-type">行业分类</div>
                    <el-select v-model="form.tradeId" placeholder="请选择行业分类" style="margin-left: 15px;width: 400px;">
                        <el-option v-for="item in dictionary" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="c-flex">
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">联系人</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入联系人" v-model="form.contactName"></el-input>
                    </div>
                </div>
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">联系电话</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入联系电话" v-model="form.phoneNumber"></el-input>
                    </div>
                </div>
                <div class="addAgent-card flex-1">
                    <div class="addAgent-card-type">邮箱</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入邮箱" v-model="form.email" type="email"></el-input>
                    </div>
                </div>
            </div>
            <div class="c-flex">
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">法人</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入法人" v-model="form.legalPerson"></el-input>
                    </div>
                </div>
                <div class="addAgent-card flex-1" style="margin-right:20px">
                    <div class="addAgent-card-type">法人电话</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入法人电话" v-model="form.legalPersonNumber"></el-input>
                    </div>
                </div>
                <div class="addAgent-card flex-1">
                    <div class="addAgent-card-type">对公账户</div>
                    <div class="addAgent-card-content">
                        <el-input placeholder="请输入对公账户" v-model="form.corporateAccount"></el-input>
                    </div>
                </div>
            </div>
            <div class="c-flex">
                <div class="addAgent-card flex-1 addCustomer-card-size" style="margin-right:20px">
                    <div class="addAgent-card-type">营业执照</div>
                    <div class="addAgent-card-content">
                        <div class="crm-upload">
                            <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="setBusinessLicense0">
                                <img v-if="form.businessLicense[0]" :src="form.businessLicense[0]" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="setBusinessLicense1">
                                <img v-if="form.businessLicense[1]" :src="form.businessLicense[1]" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="crm-upload" style="margin-top:-10px">
                            <el-button type="text" @click="setBusinessLicense0({result:''})">删除</el-button>
                            <el-button type="text" @click="setBusinessLicense1({result:''})">删除</el-button>
                        </div>
                    </div>
                </div>
                <div class="addAgent-card flex-1 addCustomer-card-size" style="height:378px">
                    <div class="addAgent-card-type">法人身份证</div>
                    <div class="crm-upload">
                        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="setcorporatIdentityCard0">
                            <img v-if="form.corporatIdentityCard[0]" :src="form.corporatIdentityCard[0]" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="setcorporatIdentityCard1">
                            <img v-if="form.corporatIdentityCard[1]" :src="form.corporatIdentityCard[1]" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div class="crm-upload" style="margin-top:45px">
                        <el-button type="text" @click="setcorporatIdentityCard0({result:''})">删除</el-button>
                        <el-button type="text" @click="setcorporatIdentityCard1({result:''})">删除</el-button>
                    </div>
                </div>
            </div>
            <el-table :data="form.productList" border style="width: 100%" highlight-current-row max-height="400px" v-if="Boolean(this.customerId)">
                <el-table-column prop="productName" label="产品名称">
                </el-table-column>
                <el-table-column prop="productPrice" label="产品价格">
                </el-table-column>
                <el-table-column prop="productNum" label="数量">
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column width="150" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="Upgrade(scope.row.productId)">升级</el-button>
                        <el-button type="text" size="mini" @click="Renew(scope.row.productId)">续费</el-button>
                        <el-button type="text" size="mini" @click="updateProduct(scope.row.productId)" v-if="!tenant">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save" v-loading="saveLoading">确 定</el-button>
        </span>
        <updateProduct :dialogVisible.sync="updateProductDialog" v-if="updateProductDialog" :productId="productId" :customerId="customerId" @saveOk="GetCusotmerDetail"></updateProduct>
    </el-dialog>
</template>

<script>
    import Agment from "@/services/agencyManagement/Agment";
    import Tenant from "@/services/agencyManagement/Tenant";
    import updateProduct from "./updateProduct.vue";
    let config={}
    export default {
        label: "添加客户",

        name: "addCustomer",

        mixins: [],

        components: {
            updateProduct
        },

        props: {
            dialogVisible: Boolean,
            customerId: [String, Number],
            checkId: [String, Number]
        },

        data() {
            return {
                form: {
                    phoneNumber: "",
                    companyName: "",
                    email: "",
                    contactName: "",
                    tradeId: "",
                    id: "",
                    legalPerson: "",
                    legalPersonNumber: "",
                    corporateAccount: "",
                    businessLicense: ["", ""],
                    corporatIdentityCard: ["", ""],
                    productList: []
                },
                imageUrl: "",
                dictionary: [],
                saveLoading: false,
                loading: false,
                uploadUrl: "",
                tenant: null,
                tenantList: [],
                productId: "",
                updateProductDialog: false
            };
        },

        computed: {},

        watch: {},

        created() {
            this.tenant = this.$store.state.session.tenant;
            this.uploadUrl = `${config.remoteUrl}/api/services/app/Agment/UploadFile`;
            !this.tenant && this.GetTenantList();
        },

        mounted() {
            this.customerId && this.GetCusotmerDetail(this.customerId);
            this.Getdictionary();
        },

        destroyed() {},

        methods: {
            updateProduct(productId) {
                this.productId = productId;
                this.updateProductDialog = true;
            },
            Upgrade(productId) {
                this.$prompt("请输入升级数量", "提示", {}).then(({ value }) => {
                    let data = {
                        customerId: this.customerId,
                        productId,
                        productNum: value
                    };
                    Agment.UpgradePrice(data).then(res => {
                        this.$confirm(`升级费用为:${res.result}`, "提示", {}).then(() => {
                            Agment.Upgrade(data).then(res => {
                                this.$message.success("升级成功");
                            });
                        });
                    });
                });
            },
            Renew(productId) {
                this.$prompt("请输入续费年数", "提示", {}).then(({ value }) => {
                    value = Number(value);
                    if (typeof value != "number" || value < 1 || Number(value) == NaN) {
                        this.$message.error("请输入数字且大于0");
                        return;
                    }
                    let data = {
                        customerId: this.customerId,
                        productId,
                        productTimeNum: value
                    };
                    Agment.RenewPrice(data).then(res => {
                        this.$confirm(`续费费用为:${res.result}`, "费用提示", {}).then(() => {
                            Agment.Renew(data).then(res => {
                                this.$message.success("续费成功");
                            });
                        });
                    });
                });
            },
            GetTenantList(tenancyName, tenantId) {
                this.tenantLoading = true;
                let searchInfo = {
                    pageCount: 1,
                    pageSize: 10,
                    tenancyName,
                    tenantId: tenantId || ""
                };
                Tenant.GetTenantList(searchInfo).then(
                    res => {
                        this.tenantList = res.result.items;
                        this.tenantLoading = false;
                    },
                    () => {
                        this.tenantLoading = false;
                    }
                );
            },
            Getdictionary() {
                Agment.Getdictionary({}).then(res => {
                    this.dictionary = res.result;
                });
            },
            save() {
                let trade = this._.find(this.dictionary, { id: this.form.tradeId });
                let tradeName = trade ? trade.name : "";
                let config = [
                    { label: "公司名称", value: this.form.companyName },
                    { label: "行业分类", value: tradeName },
                    { label: "联系电话", value: this.form.phoneNumber },
                    { label: "联系人", value: this.form.contactName },
                    { label: "邮箱", value: this.form.email },
                    { label: "法人", value: this.form.legalPerson },
                    { label: "法人电话", value: this.form.legalPersonNumber },
                    { label: "对公账户", value: this.form.corporateAccount },
                    { label: "营业执照1", value: this.form.businessLicense[0] },
                    { label: "营业执照2", value: this.form.businessLicense[1] },
                    { label: "法人身份证1", value: this.form.corporatIdentityCard[0] },
                    { label: "法人身份证2", value: this.form.corporatIdentityCard[1] }
                ];
                this.getConfirmHtml(config).then(res => {
                    this.saveLoading = true;
                    let url = this.form.id ? "UpdateCustomer" : "AddCustomer";
                    let message = this.form.id ? "修改成功" : "添加成功";
                    Agment[url](this.form).then(
                        res => {
                            this.saveLoading = false;
                            this.$emit("saveOk");
                            this.handleClose();
                            this.$message.success(message);
                        },
                        () => {
                            this.saveLoading = false;
                        }
                    );
                });
            },
            handleClose() {
                this.$emit("update:dialogVisible", false);
            },
            setBusinessLicense0(file) {
                let businessLicense = [file.result, this.form.businessLicense[1]];
                this.$set(this.form, "businessLicense", businessLicense);
            },
            setBusinessLicense1(file) {
                console.log(file);
                let businessLicense = [this.form.businessLicense[0], file.result];
                this.$set(this.form, "businessLicense", businessLicense);
            },
            setcorporatIdentityCard0(file) {
                let corporatIdentityCard = [
                    file.result,
                    this.form.corporatIdentityCard[1]
                ];
                this.$set(this.form, "corporatIdentityCard", corporatIdentityCard);
            },
            setcorporatIdentityCard1(file) {
                let corporatIdentityCard = [
                    this.form.corporatIdentityCard[0],
                    file.result
                ];
                this.$set(this.form, "corporatIdentityCard", corporatIdentityCard);
            },
            handleAvatarSuccess(a, b, c) {
                console.log(a, b, c);
            },
            GetCusotmerDetail() {
                this.loading = true;
                Agment.GetCusotmerDetail({ id: this.customerId }).then(
                    res => {
                        Object.keys(this.form).map(f => {
                            this.form[f] = res.result[f];
                        });
                        this.loading = false;
                        !this.tenant && this.GetTenantList("", this.form.tenantId);
                    },
                    () => {
                        this.loading = false;
                    }
                );
            }
        }
    };
</script>
<style lang="scss" scoped>
    .crm-upload {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }

    .addCustomer-card-size {
        height: 230px !important;
        justify-content: flex-start !important;
        padding: 10px 0;
    }

    .addAgent-card {
        border-left: 8px solid #2a2a3f;
        background-color: #f8f8f9;
        height: 90px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .addAgent-card-type {
        color: #666666;
        letter-spacing: 0;
        margin-left: 15px;
    }

    .addAgent-card-content {
        margin: 0 15px;
    }

    .card-list-menu {
        margin: 10px 0;

        .el-button+.el-button {
            margin-left: 20px;
        }
    }

    .el-upload {
        img {
            width: 150px;
            height: 150px;
        }
    }
</style>