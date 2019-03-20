import subject from '@/views/subject'
export default {
    path: '/agency',
    name: 'agency',
    component: subject,
    meta: {
        title: '代理商',
        icon: 'icon-yiwurenyuan'
    },
    redirect: {
        path: '/agent/menuConfig'
    },
    children: [{
        path: 'agencyManagement',
        name: 'agencyManagement',
        component: () => import('@/views/agencyManagement/Agent'),
        meta: {
            title: '代理商管理',
        },
    }, {
        path: 'agencyProduct',
        name: 'agencyProduct',
        component: () => import('@/views/agencyManagement/Product'),
        meta: {
            title: '产品管理',
        },
    }, {
        path: 'agencyCustomer',
        name: 'agencyCustomer',
        component: () => import('@/views/agencyManagement/Customer'),
        meta: {
            title: '客户管理',
        },
    }, {
        path: 'agencyFinance',
        name: 'agencyFinance',
        component: () => import('@/views/agencyManagement/Finance'),
        meta: {
            title: '财务管理',
        },
    }, {
        path: 'agencyOrder',
        name: 'agencyOrder',
        component: () => import('@/views/agencyManagement/Order'),
        meta: {
            title: '订单管理',
        },
    }, ]
}