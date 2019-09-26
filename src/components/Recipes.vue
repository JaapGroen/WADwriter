<template>
  <div class="grid" v-if="isLoggedIn">
    <RecipeTile v-for="(recipe,index) in recipes" v-bind:recipe="recipe" :key="index">
    </RecipeTile>
  </div>
</template>

<script>
import RecipeTile from '@/components/RecipeTile'

export default{
  props:['recipes'],
  data(){
    return{
    }
  },
  components:{
    RecipeTile,
  },
  computed:{
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
  },
}

</script>

<style>

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
