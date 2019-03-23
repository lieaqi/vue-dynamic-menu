import subject from '@/views/subject'
export default {
    path: '/testMenu1',
    name: 'testMenu1',
    component: subject,
    title: '测试菜单1号',
    icon: 'icon-yiwurenyuan',
    redirect: {
        path: '/testMenu1/testMenu1-1'
    },
    children: [{
        path: 'testMenu1-1',
        name: 'testMenu1-1',
        component: () => import('@/views/testMenu'),
        title: '测试菜单1-1号',
    }, {
        path: 'testMenu1-2/:id?',
        name: 'testMenu1-2',
        component: () => import('@/views/testMenu'),
        title: '测试菜单1-2号',
    }, {
        path: 'testMenu1-3',
        name: 'testMenu1-3',
        component: () => import('@/views/testMenu'),
        title: '测试菜单1-3号',
    }, {
        path: 'testMenu1-4',
        name: 'testMenu1-4',
        component: () => import('@/views/testMenu'),
        title: '测试菜单1-4号',
    }, {
        path: 'testMenu1-5',
        name: 'testMenu1-5',
        component: () => import('@/views/testMenu'),
        title: '测试菜单1-5号',
    }]
}