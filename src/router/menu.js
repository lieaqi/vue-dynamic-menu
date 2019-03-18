import subject from '@/views/subject'
export default {
    path: '/menu',
    name: 'menu',
    component: subject,
    meta: {
        title: '菜单配置',
        icon: 'icon-yiwurenyuan'
    },
    redirect: {
        path: '/menu/menuConfig'
    },
    children: [{
        path: 'menuConfig',
        name: 'menuConfig',
        component: () => import('@/views/menu/menuConfig'),
        meta: {
            title: '菜单配置',
            white: true
        },
    }, ]
}