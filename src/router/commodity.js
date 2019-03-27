import subject from '@/views/subject'
export default {
    path: '/commodity',
    name: 'commodity',
    component: subject,
    meta: {
        title: '商品',
        icon: 'icon-yiwurenyuan',
    },
    redirect: {
        path: '/commodity/commodityList'
    },
    children: [{
        path: 'commodityList',
        name: 'commodityList',
        component: () => import('@/views/demoMenu'),
        meta: {
            title: '商品列表',
        },
    }, {
        path: 'commodityUpdate/:id?',
        name: 'commodityUpdate',
        component: () => import('@/views/demoMenu'),
        meta: {
            title: '商品修改',
        },
    }, {
        path: 'commodityAdd',
        name: 'commodityAdd',
        component: () => import('@/views/demoMenu'),
        meta: {
            title: '商品新增',
        },
    }]
}