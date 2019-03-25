import subject from '@/views/subject'
export default {
    path: '/testMenu2',
    name: 'testMenu2',
    component: subject,
    title: '测试菜单2号',
    icon: 'icon-yiwurenyuan',
    meta: {
        title: '测试菜单2号',
        icon: 'icon-yiwurenyuan',
    },
    redirect: {
        path: '/testMenu2/testMenu2-1'
    },
    children: [{
        path: 'testMenu2-1',
        name: 'testMenu2-1',
        component: () => import('@/views/testMenu'),
        meta: {
            title: '测试菜单2-1号',
        },
    }, {
        path: 'testMenu2-2/:id?',
        name: 'testMenu2-2',
        component: () => import('@/views/testMenu'),
        meta: {
            title: '测试菜单2-2号',
        },
    }, {
        path: 'testMenu2-3',
        name: 'testMenu2-3',
        component: () => import('@/views/testMenu'),
        meta: {
            title: '测试菜单2-3号',
        },
    }]
}