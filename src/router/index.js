import Vue from 'vue'
import Router from 'vue-router'
import V404 from '@/views/404.vue'
import login from '@/views/login.vue'
import agencyManagement from './agencyManagement'
import jurisdiction from './jurisdiction'

// import store from '@/store'
// import {
//     getToken,
// } from '@/utils/cookie'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: { path: '/jurisdiction/jurisdictionMenu' }, hidden: true },
        { path: '/404', component: V404, hidden: true, },
        { path: '/login', component: login, name: "login", hidden: true },
        jurisdiction, //权限配置
        agencyManagement, //代理商管理  
        { path: '**', redirect: { path: '/404' }, hidden: true },
    ]
})

// const whiteList = ["login"] // 不验证token白名单

// router.beforeEach((to, from, next) => {
//     getToken() ? tokenToUrl(to, next) : noTokenToUrl(to, next);
// })
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