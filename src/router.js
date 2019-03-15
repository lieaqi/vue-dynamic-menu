import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        redirect: '/subject',
    },
    {
        path: '/subject',
        name: 'subject',
        component: () => import('./views/subject')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/login')
    }]
})