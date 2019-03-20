import config from '../../common/config';
import AjaxHelper from '../../common/js/AjaxHelper';
class YDH {
    //获取结构树
    async GetSystemDictionList() {
        let url = `${config.remoteUrl}/api/services/app/Dictionary/GetSystemDictionList`;
        var rs = await AjaxHelper.get(url);
        return rs;
    }
}

export default new YDH();
