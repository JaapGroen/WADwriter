<template>
  <div>
    <div class="block" @click="showRecipe()">
      <div class="item_title" :style="randomcolor">{{recipe.name}}</div>
      <div class="item_content">
        {{recipe.description}}
      </div>
      <div class="item_footer">
        Number of fields: {{recipe.fields.length}}
      </div>
    </div>
    <Recipe v-if="RecipeVisible" v-on:closeRecipe="closeRecipe" v-bind:recipe="recipe"></Recipe>
  </div>


</template>


<script>
import Recipe from '@/components/Recipe'


export default{
  props:['recipe'],
  data(){
    return{
      randomcolor:{
        background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)
      },
      RecipeVisible:false,
    }
  },
  components:{
    Recipe
  },
  methods:{
    showRecipe(){
      this.RecipeVisible=true;
    },
    closeRecipe(){
      this.RecipeVisible=false;
    }
  }
}

</script>

<style scoped>




</style>
