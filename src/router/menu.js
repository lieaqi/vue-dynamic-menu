import subject from '@/views/subject'
export default {
    path: '/menu',
    name: 'menu',
    component: subject,
    title: '菜单',
    icon: 'icon-yiwurenyuan',
    hidden: true,
    initial: true,
    redirect: {
        path: '/menu/dynamicMenu'
    },
    children: [{
        path: 'dynamicMenu',
        name: 'dynamicMenu',
        component: () => import('@/views/dynamicMenu'),
        title: '动态菜单',
        initial: true,
    }]
}