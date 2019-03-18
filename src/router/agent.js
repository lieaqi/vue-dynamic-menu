import subject from '@/views/subject'
export default {
    path: '/agent',
    name: 'agent',
    component: subject,

    meta: {
        title: '代理商配置',
        icon: 'icon-yiwurenyuan'
    },
    redirect: {
        path: '/agent/menuConfig'
    },
    children: [{
        path: 'agentConfig',
        name: 'agentConfig',
        component: () => import('@/views/agent/agentConfig'),
        meta: {
            title: '代理商配置',
            white: true
        },
    }, ]
}