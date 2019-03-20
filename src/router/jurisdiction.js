import subject from '@/views/subject'
export default {
    path: '/jurisdiction',
    name: 'jurisdiction',
    component: subject,

    meta: {
        title: '权限',
        icon: 'icon-yiwurenyuan'
    },
    redirect: {
        path: '/jurisdiction/jurisdictionMenu'
    },
    children: [{
        path: 'jurisdictionMenu',
        name: 'jurisdictionMenu',
        component: () => import('@/views/jurisdiction/menu'),
        meta: {
            title: '菜单配置',
            white: true
        },
    }, {
        path: 'jurisdictionRole',
        name: 'jurisdictionRole',
        component: () => import('@/views/jurisdiction/role'),
        meta: {
            title: '角色配置',
            white: true
        },
    }, {
        path: 'agentConfig',
        name: 'agentConfig',
        component: () => import('@/views/jurisdiction/agentConfig'),
        meta: {
            title: '代理商配置',
            white: true
        },
    }, ]
}