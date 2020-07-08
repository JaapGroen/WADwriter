<template>
  <div class="fullpage">
    <Navbar></Navbar>
    <div class="grid" v-if="isLoggedIn">
      <RecipeTile v-for="(recipe,index) in recipes" v-bind:recipe="recipe" :key="index">
      </RecipeTile>
    </div>
  </div>
</template>

<script>
import RecipeTile from '@/components/RecipeTile'
import Navbar from '@/components/Navbar'

export default{
  data(){
    return{
      recipes:this.$store.getters.recipes
    }
  },
  components:{
    RecipeTile,
    Navbar
  },
  computed:{
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
  },
}

</script>

<style scoped>
.fullpage{
  width:100%;
  height:100%
}

.grid{
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  top:100px;
  height:calc(100% - 100px);
  overflow: auto;
  position:fixed;
  width:100%;
}
</style>
