import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store.js'
import {HTTP} from '@/main'

import Login from '@/components/Login'
import Recipes from '@/components/Recipes'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/recipes',
            name: 'recipes',
            component: Recipes,
            meta: {
                requiresAuth: true,
            },
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)){
        if (localStorage.getItem('WADtoken') == null || localStorage.getItem('WADuser') == null) {
            next('/login')
        } else if (store.getters.isLoggedIn){
            next()
        }
    } else {
        var token = localStorage.getItem('WADtoken')
        var user = JSON.parse(localStorage.getItem('WADuser'))
        store.commit('auth_success',{token:token,user:user})
        HTTP.defaults.headers['Authorization'] = 'JWT '+token
        next()
    }
})

export default router

