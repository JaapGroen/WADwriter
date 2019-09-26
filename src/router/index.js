import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store.js'
import Login from '@/components/Login'
import Recipes from '@/components/Recipes'
import Recipe from '@/components/Recipe'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes,
    }
  ]
})

var checked=false;

router.beforeEach((to, from, next) => {
  if(to.path=='/'){
    if(store.getters.isLoggedIn){
      next('/recipes')
    }
    next()
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router

