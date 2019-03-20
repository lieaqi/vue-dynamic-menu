const requestUrls = {
    zhanghui: { development: 'http://192.168.1.84:81', production: 'http://crm.dinghuo.top/php', describe: '张辉' },
    chonghu: { Test: 'https://ydh.0577site.com/core', production: 'http://business.dinghuo.top/core', describe: '崇湖' },
    xiaowu: { development: 'http://localhost:22742', production: 'http://core.crm.dinghuo.top', describe: '小武' },
}
//产品请求\
let Company = {
    CompanyGetList: { url: '/index.php/Company/GetList', text: '获取客户列表' },
    CompanyGetAloneById: { url: '/index.php/Company/GetAloneById', text: '获取单个Id的商家信息' },
    SetVersionUser: { url: '/index.php/VersionCompany/SetVersionCompany', text: '为商家设置版本' },
}
let zhanghui = Object.assign({}, Company);
zhanghui = setPrefix(zhanghui, 'zhanghui');

//产品请求\
let Version = {
    VersionAddVersion: { url: '/api/services/app/Version/AddVersion', text: '添加版本' },
}
// let Function = {
//     AddFunction: { url: '/api/services/app/Function/AddFunction', text: '添加角色功能' },
//     DeleteFunction: { url: '/api/services/app/Function/DeleteFunction', text: '删除角色功能' },
// }
let xiaowu = Object.assign({}, Version);
xiaowu = setPrefix(xiaowu, 'xiaowu');

let Competence = {
    GetRoleList: { url: '/api/Competence/GetRoleList', text: '获取角色列表' },
    CreateRole: { url: '/api/Competence/CreateRole', text: '新增角色' },
    UpdateRole: { url: '/api/Competence/UpdateRole', text: '修改角色' },
    RelatedRole_User: { url: '/api/Competence/RelatedRole_User', text: '设置员工与角色的关联' },
    UnLinkRole_User: { url: '/api/Competence/UnLinkRole_User', text: '取消员工与角色的关联' },
    DeleteRole: { url: '/api/Competence/DeleteRole', text: '删除角色' },
    SetRoleCompetence: { url: '/api/Competence/SetRoleCompetence', text: '设置角色缓存' },
    GetMenuTreeByRole: { url: '/api/Competence/GetMenuTreeByRole', text: '获取角色所属的菜单' },
    RelatedRole_Menu: { url: '/api/Competence/RelatedRole_Menu', text: '设置角色与菜单的关联' },
    UnLinkRole_Menu: { url: '/api/Competence/UnLinkRole_Menu', text: '取消角色与菜单的关联' },
    RelatedRole_Method: { url: '/api/Competence/RelatedRole_Method', text: '设置角色与方法的关联' },
    UnLinkRole_Method: { url: '/api/Competence/UnLinkRole_Method', text: '设置角色与方法的关联' },
    RelatedRole_Function: { url: '/api/Competence/RelatedRole_Function', text: '设置角色与功能权限的关联' },
    CompetenceGetMenuTree: { url: '/api/Competence/GetMenuTree', text: '获取菜单-方法-功能树' },
    CompetenceCreateMenu: { url: '/api/Competence/CreateMenu', text: '新增菜单' },
    CompetenceUpdateMenu: { url: '/api/Competence/UpdateMenu', text: '修改菜单' },
    CompetenceDeleteMenu: { url: '/api/Competence/DeleteMenu', text: '删除菜单' },
    CompetenceGetMenuDetail: { url: '/api/Competence/GetMenuDetail', text: '获取菜单详情' },
    CompetenceGetMethodDetail: { url: '/api/Competence/GetMethodDetail', text: '获取方法详情' },
    CompetenceCreateMethod: { url: '/api/Competence/CreateMethod', text: '新增方法' },
    CompetenceUpdateMethod: { url: '/api/Competence/UpdateMethod', text: '修改方法' },
    CompetenceDeleteMethod: { url: '/api/Competence/DeleteMethod', text: '删除方法' },
    CompetenceGetFunctionDetail: { url: '/api/Competence/GetFunctionDetail', text: '获取功能详情' },
    CompetenceCreateFunction: { url: '/api/Competence/CreateFunction', text: '新增功能' },
    CompetenceUpdateFunction: { url: '/api/Competence/UpdateFunction', text: '修改功能' },
    CompetenceDeleteFunction: { url: '/api/Competence/DeleteFunction', text: '删除功能' },
    CompetenceGetUserMenu: { url: '/api/Competence/GetUserMenu', text: '获取用户菜单' },
    CompanyCreateCompany: { url: '/api/Company/CreateCompany', text: '新增商户' },

}
let chonghu = Object.assign({}, Competence);
chonghu = setPrefix(chonghu, 'chonghu');

//设置前缀
function setPrefix(requests, type) {
    for (let key in requests) requests[key].prefix = type;
    return requests
}
const allHttpRequest = Object.assign({}, chonghu, zhanghui, xiaowu);
export default {
    requestUrls,
    allHttpRequest
}