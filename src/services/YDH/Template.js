import config from '../../common/config';
import AjaxHelper from '../../common/js/AjaxHelper';
class TemplateService {
  async GetTemplateList(input) {
    let url = `${config.remoteUrl}/api/services/app/Template/GetTemplateList`;
    var rs = await AjaxHelper.get(url, input);
    return rs;
  }
  async SetTemplate(input) {
    let url = `${config.remoteUrl}/api/services/app/Template/SetTemplate`;
    var rs = await AjaxHelper.post(url, input);
    return rs;
  }
  async SynchronizeTemplate(input) {
    let url = `${config.remoteUrl}/api/services/app/Template/SynchronizeTemplate`;
    var rs = await AjaxHelper.post(url, input);
    return rs;
  }
  async Undocodeaudit(input) {
    let url = `${config.remoteUrl}/api/services/app/Template/Undocodeaudit`;
    var rs = await AjaxHelper.post(url, input);
    return rs;
  }
}

export default new TemplateService();
