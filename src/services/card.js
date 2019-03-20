const AjaxHelper = new Promise((r, l) => { r() })
const config = { remoteUrl: "" }

class card {
    //添加海报分类
    async AddPosterSort(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/AddPosterSort`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //更新海报分类
    async UpdatePosterSort(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/UpdatePosterSort`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //删除海报分类
    async DeletePosterSort(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/DeletePosterSort`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //添加系统海报
    async AddPoster(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/AddPoster`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //修改海报
    async UpdatePoster(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/UpdatePoster`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //海报分类列表
    async GetPosterSort(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/GetPosterSort`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取海报列表
    async GetPoster(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/GetPoster`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //删除海报
    async DeletePoster(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/DeletePoster`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //获取海报详情
    async GetPosterDetail(input) {
        let url = `${config.remoteUrl}/api/services/app/CardConfig/GetPosterDetail`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
    //base64图片
    async StoragePhoto(input) {
        let url = `${config.remoteUrl}/api/services/app/Agment/StoragePhoto`;
        var rs = await AjaxHelper.post(url, input);
        return rs;
    }
}

export default new card();