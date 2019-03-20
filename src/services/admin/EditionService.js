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
    async createOrUpdateEdition(input) {
        let url = `${config.remoteUrl}/api/services/app/Version/AddVersion`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }


}

export default new EditionService();
