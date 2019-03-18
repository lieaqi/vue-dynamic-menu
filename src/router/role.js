import subject from '@/views/subject'
export default {
    path: '/role',
    name: 'role',
    component: subject,
    meta: {
        title: '角色配置',
        icon: 'icon-yiwurenyuan'
    },
    redirect: {
        path: '/role/menuConfig'
    },
    children: [{
        path: 'roleConfig',
        name: 'roleConfig',
        component: () => import('@/views/role/roleConfig'),
        meta: {
            title: '角色配置',
            white: true
        },
    }, ]
}