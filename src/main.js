import Vue from 'vue'
import App from './App'
import router from '@/router'
import axios from 'axios'
import store from '@/store/store'

const token = localStorage.getItem('WADtoken')

export const HTTP = axios.create({
    headers:{
        'Authorization': 'JWT '+token
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

