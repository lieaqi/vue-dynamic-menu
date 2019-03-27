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
    let params = Object.keys(to.params);
    let pathArr = to.path.split('/');
    for (let i = 0; i < params.length; i++) {
        pathArr[pathArr.length - params.length + i] = `:${params[i]}?`
    }
    let path = pathArr.join('/');
    paths.includes(path) ? next() : next({ path: '/404' })
}

export default router