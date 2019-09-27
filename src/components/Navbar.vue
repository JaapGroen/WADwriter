<template>
  <div class="header" v-if="isLoggedIn">
    <h1>WADwriter</h1>
    <div class="menu" @mouseover="MenuVisible=true" @mouseleave="MenuVisible=false">
      <button class="button menuitem"  v-if="MenuVisible" @click="reloadRecipes">
        <i class="fas fa-sync"></i>
        Reload
      </button>
      <button class="button menuitem" @click="logout"  v-if="MenuVisible">
        <i class="fas fa-sign-out-alt"></i>
        Logout
      </button>
      <button class="button menuitem">
        <i class="fas fa-caret-left" v-if="!MenuVisible"></i>
        <i class="fas fa-caret-right" v-if="MenuVisible"></i>
        <i class="fas fa-user"></i>
         {{user}}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        FilterBoxVisible:false,
        selectorFilter:'',
        MenuVisible:false,
      }
    },
    computed : {
      user : function(){ return this.$store.getters.user},
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      },
      toggleMenu(){
        this.MenuVisible=!this.MenuVisible
      },
      reloadRecipes(){
        window.history.go()
      }
    },
  }
</script>

<style>
.header{
  display:flex;
  flex-direction:row;
  height:100px;
  align-items:center;
  box-sizing: border-box;
  padding:20px;
  justify-content:space-between;
  border-bottom:2px solid #FFFFFF;
  position:fixed;
  width:100%;
}
</style>

