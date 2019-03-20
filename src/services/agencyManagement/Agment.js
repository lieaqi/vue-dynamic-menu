const AjaxHelper = new Promise((r, l) => { r() })
const config = { remoteUrl: "" }
class Agment {
    //升级指定版本
    async GetProductOrSetMeal(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetProductOrSetMeal`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //修改上下架状态
    async UpdateStatus(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateStatus`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加产品
    async AddProduct(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/AddProduct`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加套餐
    async AddSetMeal(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/AddSetMeal`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取产品详情
    async GetProductDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetProductDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取套餐详情
    async GetSetMealDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetSetMealDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新套餐
    async UpdateSetMeal(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateSetMeal`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新产品
    async UpdateProduct(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateProduct`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取客户列表
    async GetCustomer(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetCustomer`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //新增客户
    async AddCustomer(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/AddCustomer`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取行业类型字典
    async Getdictionary(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/Getdictionary`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新客户
    async UpdateCustomer(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateCustomer`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取客户详情
    async GetCusotmerDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetCusotmerDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加订单
    async AddOrder(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/AddOrder`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取订单列表
    async GetOrder(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetOrder`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取账户金额
    async GetCompanAmount(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetCompanAmount`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取订单详情
    async GetOrderDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetOrderDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取代理商详情
    async GetTenantDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetTenantDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取全国地址
    async GetArea(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetArea`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取流水账单
    async GetCapitalaccount(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetCapitalaccount`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取跟进列表
    async GetRemark(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetRemark`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加跟进
    async AddRemark(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/AddRemark`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //已经代理的产品列表
    async GetProductOrSetMealById(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetProductOrSetMealById`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新代理列表
    async UpdateAndAgment(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateAndAgment`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //生成登录key
    async Oauth(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/Oauth`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取交易字典
    async GetTradeType(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetTradeType`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //扣款
    async DeductMoney(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/DeductMoney`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //开通
    async Dredge(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/Dredge`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //升级
    async Upgrade(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/Upgrade`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //升级消耗
    async UpgradePrice(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpgradePrice`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //续费
    async Renew(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/Renew`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //续费
    async RenewPrice(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/RenewPrice`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //转接客户
    async TransferCustomer(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/TransferCustomer`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //管理员修改客户产品
    async UpdateCompanyAndProduct(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateCompanyAndProduct`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取底部版权信息
    async GetTenantVersionInformation(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/GetTenantVersionInformation`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新代理商默认版本信息
    async UpdateTenantVersionInformation(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/UpdateTenantVersionInformation`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new Agment();