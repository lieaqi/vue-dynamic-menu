import Vue from 'vue'
import Router from 'vue-router'
import V404 from '@/views/404.vue'
import menu from './menu'
import commodity from './commodity'
import order from './order'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: { path: '/menu/dynamicMenu' }, hidden: true, meta: { initial: true } },
        { path: '/404', component: V404, hidden: true, meta: { initial: true } },
        menu, //权限配置
        commodity,
        order,
        { path: '**', redirect: { path: '/404' }, hidden: true, meta: { initial: true } },
    ],
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    to.meta.initial ? next() : authenticationAuthority(to, next);
})
//权限验证
function authenticationAuthority(to, next) {
    let paths = store.state.allPath;
    let params = Object.keys(to.params).map(p => `/:${p}?`).join('');
    let existParamsLength = (Object.keys(to.params).filter(p => to.params[p])).length;
    let arrPath = to.path.split('/')
    let path = (arrPath.slice(0, arrPath.length - existParamsLength)).join('/') + params;
    paths.includes(path) ? next() : next({ path: '/404' })
}

export default router