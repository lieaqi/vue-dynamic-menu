import subject from '@/views/subject'
export default {
    path: '/menu',
    name: 'menu',
    component: subject,
    hidden: true,
    redirect: {
        path: '/menu/dynamicMenu'
    },
    meta: {
        initial: true,
        title: '菜单',
        icon: 'icon-yiwurenyuan',
    },
    children: [{
        path: 'dynamicMenu',
        name: 'dynamicMenu',
        component: () => import('@/views/dynamicMenu'),
        meta: {
            initial: true,
            title: '动态菜单',
        },
    }]
}