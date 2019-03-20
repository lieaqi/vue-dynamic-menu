import config from '../../common/config';
import AjaxHelper from '../../common/js/AjaxHelper';
class EditionService {
    async getEditions() {
        let url = `${config.remoteUrl}/api/services/app/Version/GetVersionlist`;
        var rs = await AjaxHelper.get(url);
        return rs;
    }
    async GetMenuTreeByVersion(input) {
        let url = `${config.remoteUrl}/api/services/app/Menu/GetMenuTreeByVersion`;
        var rs = await AjaxHelper.get(url, input);
        return rs;
    }
    async getEditionComboboxItems(params) {
        let url = `${config.remoteUrl}/api/services/app/Edition/GetEditionComboboxItems`;
        var rs = await AjaxHelper.get(url, params);
        return rs;
    }
    //菜单版本关联
    async AddVersionMenus(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/AddVersionMenus`;
        var rs = await AjaxHelper.post(url, input);
        return rs.result;
    }
    //取消菜单版本关联
    async DeleteVersionMenus(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/DeleteVersionMenus`;
        var rs = await AjaxHelper.delete(url, input);
        return rs;
    }
    //方法版本关联
    async AddVersionMethod(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/AddVersionMethod`;
        var rs = await AjaxHelper.post(url, input);
        return rs.result;
    }
    //取消方法版本关联
    async DeleteVersionMethod(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/DeleteVersionMethod`;
        var rs = await AjaxHelper.delete(url, input);
        return rs;
    }
    async AddVersion(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/AddVersion`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    async UpdateVersion(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/UpdateVersion`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    async GetVersionDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/GetVersionDetail`;
        var rs = await AjaxHelper.get(url, input);
        return rs;
    }
    //获取版本下的角色
    async GetVersionByParentId(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/GetVersionByParentId`;
        var rs = await AjaxHelper.get(url, input);
        return rs;
    }
    //更新角色权限
    async ReSetVersionByRoleId(input) {
        let url = `${config.remoteUrl}/api/services/app/Company/ReSetVersionByRole`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加版本功能
    async AddVersionFunction(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/AddVersionFunction`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //删除版本功能
    async DeleteRoleFunction(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/DeleteRoleFunction`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new EditionService();
