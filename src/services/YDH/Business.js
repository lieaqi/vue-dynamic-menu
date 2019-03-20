import config from '../../common/config';
import AjaxHelper from '../../common/js/AjaxHelper';
class Business {
    //获取客户列表
    async GetList(input) {
        let url = `${config.remoteUrl_H}/Company/GetList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取客户列表
    async GetCardList(input) {
        let url = `${config.remoteUrl_H}/Company/GetCardList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取单个Id的商家信息
    async GetAloneById(input) {
        let url = `${config.remoteUrl_H}/Company/GetAloneById`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取客户列表
    async SetVersionCompany(input) {
        let url = `${config.remoteUrl_H}/VersionCompany/SetVersionCompany`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //应用权限
    async ReSetVersionByCompany(input) {
        let url = `${config.remoteUrl}/api/services/app/Company/ReSetVersionByCompany`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //设置名片与商户的关联
    async SetCompanyCard(input) {
        let url = `${config.remoteUrl_H}/CompanyCard/SetCompanyCard`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取单个Id的商家信息
    async GetAloneById(input) {
        let url = `${config.remoteUrl_H}/Company/GetAloneById`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //升级
    async ReleaseAppletsByAppId(input) {
        let url = `${config.remoteUrl}/api/services/app/Template/ReleaseAppletsByAppId`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //升级指定版本
    async ReleaseTemplateIdApplets(input) {
        let url = `${config.remoteUrl}/api/services/app/Template/ReleaseTemplateIdApplets`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //升级指定版本
    async UpdateAuthorSubMchId(input) {
        let url = `${config.remoteUrl}/api/services/app/UserAuthorization/UpdateAuthorSubMchId`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new Business();
