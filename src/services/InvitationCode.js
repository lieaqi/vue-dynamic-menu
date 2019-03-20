import config from '../common/config';
import AjaxHelper from '../common/js/AjaxHelper';
class InvitationCode {
    //获取邀请码
    async GetInvitationCode(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/GetInvitationCode`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加邀请码
    async AddInvitationCode(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/AddInvitationCode`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //删除邀请码
    async DeleteInvitationCode(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/DeleteInvitationCode`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取用户
    async GetUser(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/GetUser`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //批量更新邀请码所属人
    async UpdateInvitationCodeList(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/UpdateInvitationCodeList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //根据二维码获取绑定的公司
    async GetCustomerByInvitationCodeId(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/GetCustomerByInvitationCodeId`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取绑定邀请码的公司信息
    async GetInvitationCodeInformationList(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/GetInvitationCodeInformationList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取短连接
    async GetShortUrl(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/GetShortUrl`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新邀请码和客户是否无效
    async UpdateinvitationCodeIsEffective(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/UpdateinvitationCodeIsEffective`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //删除无效的客户邀请码关联
    async DeleteinvitationCodeIsEffective(input) {
        let url = `${config.remoteUrl}/api/services/app/InvitationCode/DeleteinvitationCodeIsEffective`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new InvitationCode();