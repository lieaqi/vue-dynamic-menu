import { service } from "./service"
class Site {
    //添加菜单
    AddMenu(data) {
        return service({ url: "/Site/AddMenu", method: 'post', data })
    }
    //更新菜单
    UpdateMenu(data) {
        return service({ url: "/Site/UpdateMenu", method: 'post', data })
    }
    //删除菜单
    DeleteMenu(data) {
        return service({ url: "/Site/DeleteMenu", method: 'post', data })
    }
    //获取所有菜单和树
    GetMenuTree(data) {
        return service({ url: "/Site/GetMenuTree", method: 'post', data })
    }
    //获取菜单
    GetMenu(data) {
        return service({ url: "/Site/GetMenu", method: 'post', data })
    }
    //获取所有菜单
    GetMenuTreeByUserId(data) {
        return service({ url: "/Site/GetMenuTreeByUserId", method: 'post', data })
    }
    //获取菜单详情
    GetMenuDetail(data) {
        return service({ url: "/Site/GetMenuDetail", method: 'post', data })
    }
    //添加用户菜单关联
    AddUserAndMenu(data) {
        return service({ url: "/Site/AddUserAndMenu", method: 'post', data })
    }
    //删除用户菜单关联
    DeleteUserAndMenu(data) {
        return service({ url: "/Site/DeleteUserAndMenu", method: 'post', data })
    }
    //登陆接口
    Login(data) {
        return service({ url: "/Site/Login", method: 'post', data })
    }
    //获取用户列表
    GetUser(data) {
        return service({ url: "/Site/GetUser", method: 'post', data })
    }
    //管理员更新用户
    UpdateUser(data) {
        return service({ url: "/Site/UpdateUser", method: 'post', data })
    }
    //更新用户密码
    UpdateUserPassWord(data) {
        return service({ url: "/Site/UpdateUserPassWord", method: 'post', data })
    }
    //添加用户
    AddUser(data) {
        return service({ url: "/Site/AddUser", method: 'post', data })
    }
    //获取用户详情
    GetUserDetail(data) {
        return service({ url: "/Site/GetUserDetail", method: 'post', data })
    }
}
export default new Site()