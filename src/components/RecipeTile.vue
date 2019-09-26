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

<style>

.block{
  height:250px;
  min-height:250px;
  width:250px;
  min-width:250px;
  margin: 20px;
  padding: 0px;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
}

.item_title{
  height:40px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.item_content{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  height:190px;
  background:#2F2F2F;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.item_footer{
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
}


</style>
