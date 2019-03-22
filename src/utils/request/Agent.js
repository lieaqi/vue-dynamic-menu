import { service } from "./service"
class Agent {
    //获取代理商列表
    GetAgent(data) {
        return service({ url: "/Agent/GetAgent", method: 'post', data })
    }
    //获取地区
    GetArea(data) {
        return service({ url: "/Agent/GetArea", method: 'post', data })
    }
    //添加代理商
    AddAgent(data) {
        return service({ url: "/Agent/AddAgent", method: 'post', data })
    }
    //更新代理商
    UpdateAgment(data) {
        return service({ url: "/Agent/UpdateAgment", method: 'post', data })
    }
    //更新代理商Own
    UpdateOwnAgment(data) {
        return service({ url: "/Agent/UpdateOwnAgment", method: 'post', data })
    }
    //获取代理商详情
    GetAgentDetail(data) {
        return service({ url: "/Agent/GetAgentDetail", method: 'post', data })
    }
    //获取自己的代理商详情
    GetOwnAgentDetail(data) {
        return service({ url: "/Agent/GetOwnAgentDetail", method: 'post', data })
    }
}
export default new Agent()