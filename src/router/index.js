import Vue from 'vue'
import Router from 'vue-router'
import V404 from '@/views/404.vue'
import login from '@/views/login.vue'

import menu from './menu'
import role from './role'
import agent from './agent'

// import store from '@/store'
// import {
//     getToken,
// } from '@/utils/cookie'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: { path: '/menu/menuConfig' }, hidden: true },
        { path: '/404', component: V404, hidden: true, },
        { path: '/login', component: login, name: "login", hidden: true },
        menu, //菜单
        role, //角色
        agent, //代理商
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