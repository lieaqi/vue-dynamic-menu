const AjaxHelper = new Promise((r, l) => { r() })
const config = { remoteUrl: "" }
class Tenant {
    //获取代理商详情
    async GetTenantDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/GetTenantDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取代理商列表
    async GetTenantList(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/GetTenantList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取等级列表
    async GetGrade(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/GetGrade`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //创建代理商
    async CreateTenant(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/CreateTenant`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }

    //更新租户
    async UpdateTenant(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/UpdateTenant`;
        var rs = await AjaxHelper.put(url, input);
        return rs;
    }
    //充值详情字典
    async GetToUpDetailList(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/GetToUpDetailList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //充值
    async TopUp(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/TopUp`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取金额
    async GetAmount(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/GetAmount`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新代理商的是否可以配置底部版本的权限
    async UpdateTenantIsCanUpdateVersion(input) {
        let url = `${config.remoteUrl}/api/services/app/Tenant/UpdateTenantIsCanUpdateVersion`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new Tenant();