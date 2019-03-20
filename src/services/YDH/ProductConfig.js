import config from '../../common/config';
import AjaxHelper from '../../common/js/AjaxHelper';
class ProductConfig {
    //产品配置壹企推列表
    async GetCardAndCustomerList(input) {
        let url = `${config.remoteUrl}/api/services/app/ProductConfig/GetCardAndCustomerList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //产品配置易订货列表
    async GetYiDinghuoAndCustomerList(input) {
        let url = `${config.remoteUrl}/api/services/app/ProductConfig/GetYiDinghuoAndCustomerList`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新版权状态
    async UpdateVersion(input) {
        let url = `${config.remoteUrl}/api/services/app/ProductConfig/UpdateVersion`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取是否展示版本信息
    async GetTenantCanUpdateVersion(input) {
        let url = `${config.remoteUrl}/api/services/app/ProductConfig/GetTenantCanUpdateVersion`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new ProductConfig();