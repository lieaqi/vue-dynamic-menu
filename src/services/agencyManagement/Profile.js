const AjaxHelper = new Promise((r, l) => { r() })
const config = { remoteUrl: "" }
class Profile {
    //获取代理商详情
    async ResetPasswords(input) {
        let url = `${config.remoteUrl}/api/services/app/Profile/ResetPasswords`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new Profile();