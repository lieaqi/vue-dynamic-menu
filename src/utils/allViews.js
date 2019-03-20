import router from '../router';
import store from '../store';
import vue from '.././main';
import Layout from '@/views/layout/Layout'

let routes = [];
function getComponents(view) {
    let Cp;
    switch (view) {
        default:
            break;
    }
    return Cp
}
function getPath(list, num, p) {
    for (let i = 0; i < list.length; i++) {
        num == 1 && (p = list[i]);
        if (list[i].Component) {
            list[i].ParentPath
                ? setC_route(list[i], p)
                : setP_route(list[i], false, p);
        }
        list[i].ChildList && getPath(list[i].ChildList, num + 1, p);
    }
}
//设置子级路由
function setC_route(route, p) {
    let p_route =
        vue._.find(routes, { path: `/${route.ParentPath}` }) ||
        setP_route(route, true, p); //获取父路由
    p_route.children.push({
        path: `${route.Path}`,
        component: getComponents(route.Component),
        name: route.EnName,
        meta: { title: route.Name },
    });
}
//设置父级路由
function setP_route(route, state, p) {
    routes.push({
        path: `/${state ? route.ParentPath : route.Path}`,
        component: state ? Layout : getComponents(route.Component),
        name: p && p.EnName,
        meta: { title: p.Name },
        children: []
    });
    return vue._.last(routes);
}
export function setRoute(data) {
    console.log("添加路由")
    getPath(data, 0)
    store.dispatch('SETROUTE', routes)
    console.log(routes)
    router.addRoutes(routes);
}
