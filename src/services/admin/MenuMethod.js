import config from '../../common/config';
import AjaxHelper from '../../common/js/AjaxHelper';
class MenuMethod {
    //获取结构树
    async GetMenuTree() {
        let url = `${config.remoteUrl}/api/services/app/Menu/GetMenuTree`;
        var rs = await AjaxHelper.get(url);
        return rs;
    }
    //获取菜单详情
    async GetMenuDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Menu/GetMenuDetail`;
        var rs = await AjaxHelper.get(url, input);
        return rs;
    }
    //添加菜单
    async AddMenu(input) {
        let url = `${config.remoteUrl}/api/services/app/Menu/AddMenu`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //修改菜单
    async UpdateMenu(input) {
        let url = `${config.remoteUrl}/api/services/app/Menu/UpdateMenu`;
        var rs = await AjaxHelper.put(url, input);
        return rs;
    }
    //删除菜单
    async DeleteMenu(input) {
        let url = `${config.remoteUrl}/api/services/app/Menu/DeleteMenu`;
        var rs = await AjaxHelper.delete(url, input);
        return rs;
    }

    //获取方法详情
    async GetMethodDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/Method/GetMethodDetail`;
        var rs = await AjaxHelper.get(url, input);
        return rs;
    }
    //添加方法
    async AddMethod(input) {
        let url = `${config.remoteUrl}/api/services/app/Method/AddMethod`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //修改方法
    async UpdateMethod(input) {
        let url = `${config.remoteUrl}/api/services/app/Method/UpdateMethod`;
        var rs = await AjaxHelper.put(url, input);
        return rs;
    }
    //删除方法
    async DeleteMethod(input) {
        let url = `${config.remoteUrl}/api/services/app/Method/DeleteMethod`;
        var rs = await AjaxHelper.delete(url, input);
        return rs;
    }
}

export default new MenuMethod();
