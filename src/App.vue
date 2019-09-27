<template>
  <div id="app">
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<script>
import store from '@/store/store'
import router from '@/router'
import {HTTP} from './main'
import RecipesJSON from '../public/recipes.json'

export default {
  name: 'app',
  data(){
    return{
    }
  },
  created: function(){
    this.$store.commit('setRecipes',RecipesJSON)
    HTTP.interceptors.response.use(undefined, err => {
      return new Promise(function () {
        if ((err.response.status === 401 || err.response.status === 422) && err.config && !err.config.__isRetryRequest) {
          store.dispatch('logout')
          .then(() => {
            router.push('/')
          })
        }
        throw err;
      });
    });
  }
}
</script>

<style>
html, body{
  margin: 0;
  height: 100%;
  min-height: 100%;
  font-family: 'Roboto', sans-serif;
  color:#FFFFFF;
  background-color: #0C0C0C;
}

body{
  display: flex;
  flex-direction: column;
}

.pageoverlay{
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  background-color:rgba(0, 0, 0, 0.5);
  height:100%;
  width:100%;
  z-index:75;
  position:fixed;
  top:0px;
  left:0px;
}
.overlaytop{
  height:50px;
  width:100%;
  background:#444444;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 15px;
  display:flex;
  flex-direction:row;
  box-sizing: border-box;
  justify-content:space-between;
  align-items:center;
}
.overlaycontent{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:center;
  max-height:calc(100% - 80px);
  background:#2F2F2F;
  box-sizing: border-box;
  position: relative;
  overflow-y:auto;
  flex-wrap:wrap;
}
.overlayfooter{
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-sizing: border-box;
  padding-left:20px;
  padding-right:20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background:#444444;
  height:30px;
  font-size:12px;
  width:100%;
}

</style>
