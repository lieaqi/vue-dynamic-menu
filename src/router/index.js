import Vue from 'vue'
import Router from 'vue-router'
import V404 from '@/views/404.vue'
import menu from './menu'
import testMenu1 from './testMenu1'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: { path: '/menu/dynamicMenu' }, hidden: true, initial: true },
        { path: '/404', component: V404, hidden: true, initial: true },
        menu, //权限配置
        testMenu1,
        { path: '**', redirect: { path: '/404' }, hidden: true, initial: true },
    ]
})

// const whiteList = ["login"] // 不验证token白名单

router.beforeEach((to, from, next) => {
    console.log(to)
    next()
    //  getToken() ? tokenToUrl(to, next) : noTokenToUrl(to, next);
})
// //有token 
// async function tokenToUrl(to, next) {
//     !store.state.user.userInfo && (await store.dispatch('getUserInfo'))
//     next()
// }
// //无token
// function noTokenToUrl(to, next) {
//     whiteList.includes(to.name) ? next() : next('/login')
// }

export default router