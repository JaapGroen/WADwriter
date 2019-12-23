<template>
        <div class="header" v-if="isLoggedIn">
            <router-link to="/recipes" tag="h1" class="pointer">WADwriter</router-link>
            <div class="menu" @mouseover="MenuVisible=true" @mouseleave="MenuVisible=false">
                <button class="btn btn-large menuitem"  v-if="MenuVisible" @click="reloadRecipes">
                    <i class="fas fa-sync"></i>
                    Reload
                </button>
                <button class="btn btn-large menuitem" @click="logout"  v-if="MenuVisible">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
                <button class="btn btn-large menuitem">
                    <i class="fas fa-caret-left" v-if="!MenuVisible"></i>
                    <i class="fas fa-caret-right" v-if="MenuVisible"></i>
                    <i class="fas fa-user"></i>
                    {{user.name}} ({{user.role.name}})
                </button>
            </div>
        </div>
</template>

<script>

export default {
    data(){
      return {
        FilterBoxVisible:false,
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
      toggleFilter(){
        this.FilterBoxVisible=!this.FilterBoxVisible
      },
      toggleMenu(){
        this.MenuVisible=!this.MenuVisible;
      },
      changeselectorFilter: function(){
        this.$store.commit('changeselectorFilter',this.selectorFilter)
        if(this.selectorFilter.length>0){
            this.FilterBoxVisible=true;
        } else {
            this.FilterBoxVisible=false;
        }
      },
      clearFilter(){
        this.selectorFilter='';
        this.$store.commit('changeselectorFilter',this.selectorFilter)
        this.FilterBoxVisible=false;
      },
      reloadRecipes(){
        window.history.go()
      },
    }
  }
</script>

<style>

</style>
