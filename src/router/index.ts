import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import layout from '../components/layout.vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'name',
                component: () => import(/*webpackChunkName: 'home' */ '../views/home.vue'),
                meta: {
                    key: '/home',
                    title: '系统首页',
                    routerTitle: '系统首页',
                },
            },
        ],
        meta: {
            show: true,
        },
    },
    {
        path: '/partManage',
        component: layout,
        children: [
            {
                path: '/partManage/unfinishOrder',
                name: 'unfinishOrder',
                component: () =>
                    import(/*webpackChunkName: 'unfinishOrder' */ '../views/unfinishOrder.vue'),
                meta: {
                    key: '/partManage/unfinishOrder',
                    title: '未完成',
                    routerTitle: '订单管理/未完成',
                },
            },
            {
                path: '/partManage/finishOrder',
                name: 'finishOrder',
                component: () =>
                    import(/*webpackChunkName: 'finishOrder' */ '../views/finishOrder.vue'),
                meta: {
                    key: '/partManage/finishOrder',
                    title: '已完成',
                    routerTitle: '订单管理/已完成',
                },
            },
        ],
        meta: {
            title: '订单管理',
            key: '2',
            show: true,
        },
    },
    {
        path: '/goodsManage',
        component: layout,
        children: [
            {
                path: '/goodsManage/goodsList',
                name: 'goodsList',
                component: () =>
                    import(/*webpackChunkName: 'goodsList' */ '../views/goodsList.vue'),
                meta: {
                    key: '/goodsManage/goodsList',
                    title: '商品列表',
                    routerTitle: '商品管理/商品列表',
                },
            },
            {
                path: '/goodsManage/orderList',
                name: 'orderList',
                component: () =>
                    import(/*webpackChunkName: 'orderList' */ '../views/orderList.vue'),
                meta: {
                    key: '/goodsManage/orderList',
                    title: '订单列表',
                    routerTitle: '商品管理/订单列表',
                },
            },
        ],
        meta: {
            title: '商品管理',
            key: '3',
            show: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/*webpackChunkName: 'login' */ '../views/login.vue'),
        meta: {
            title: '登陆页',
            show: false,
        },
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: () => import(/*webpackChunkName: '404' */ '../views/404.vue'),
        meta: {
            title: '404页面',
            show: false,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
