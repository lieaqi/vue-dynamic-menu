import subject from '@/views/subject'
export default {
    path: '/order',
    name: 'order',
    component: subject,
    meta: {
        title: '订单',
        icon: 'icon-yiwurenyuan',
    },
    redirect: {
        path: '/order/orderList'
    },
    children: [{
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/demoMenu'),
        meta: {
            title: '订单列表',
        },
    }, {
        path: 'orderUpdate/:id?',
        name: 'orderUpdate',
        component: () => import('@/views/demoMenu'),
        meta: {
            title: '订单修改',
        },
    }, {
        path: 'orderAdd',
        name: 'orderAdd',
        component: () => import('@/views/demoMenu'),
        meta: {
            title: '订单新增',
        },
    }]
}