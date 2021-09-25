import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import( '../views/About.vue')
    },
    {
        path: '/listview',
        name: 'listview',
        component: () => import('../views/ListView.vue')
    },
    {
        path: '/Search',
        name: 'Search',
        component: () => import( '../views/Search.vue')
    },
    {
        path: '/Me',
        name: 'Me',
        beforeEnter: (to, from, next) => {
            store.state.user.isLogin ? next() : next("/login")

        },
        component: () => import( '../views/Me.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/login.vue')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
