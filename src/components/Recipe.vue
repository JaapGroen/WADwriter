<template>
  <div class="pageoverlay">
    <div class="overlaybox">
      <div class="overlaytop">
        <div>
          {{recipe.name}}
        </div>
        <i class="fas fa-times pointer" @click="closeRecipe"></i>
      </div>
      <div class="overlaycontent">
        <div class="tablerow" v-for="field in recipe.fields" v-bind:key="field.name">
          <div class="tablecellkey" v-if="!field.new">
            {{field.name}}
          </div>
          <div class="tablecellkey" v-if="field.new">
            <input class="textbox" type="text" v-model="field.name">
          </div>
          <div class="tablecellvalue" v-if="field.type=='string' && field.fixed">
            {{field.value}}
          </div>
          <div class="tablecellvalue" v-if="field.type=='string' && !field.fixed">
            <input class="textbox" type="text" v-model="field.value" :placeholder="field.format">
          </div>
          <div class="tablecellvalue" v-if="field.type=='select'">
            <select v-model="field.value">
              <option v-for="option in field.options" v-bind:key="option">{{option}}</option>
            </select>
          </div>
          <div class="tablecellvalue" v-if="field.type=='file'">
            <input class="textbox" type="file" multiple ref="file" v-on:change="handleFileUpload()">
          </div>
          <div class="tablecellbutton">
            <button class="btn btn-small" @click="removeField(field.name)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="tablerow">
          <div class="tablecellkey">
            <button class="btn btn-large" @click="sendForm">
              <i class="fas fa-paper-plane"></i>
              Submit data to WADQC
            </button>
          </div>
          <div class="tablecellvalue">
          </div>
        </div>
      </div>
      <div class="overlayfooter">
        <div>
          <button class="btn btn-small" @click="addField">
            <i class="fas fa-plus-square"></i>
            Add field
          </button>
          <button class="btn btn-small" @click="addFile">
            <i class="fas fa-plus-square"></i>
            Add file(s)
          </button>
        </div>
        <div v-if="msg.length>0">
          {{msg}}
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/main'

export default{
  props:['recipe'],
  data(){
    return{
      files:[],
      msg:'',
    }
  },
  computed:{
        apiURL(){
            return 'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api'
        }
    },
  methods:{
    closeRecipe(){
      this.$emit('closeRecipe','thanks')
    },
    sendForm(){
      let formData = new FormData();
      let confirmationstring = "Do you want to send the following data?\n\n"
      for (let i=0;i<this.recipe.fields.length;i++){
        if (this.recipe.fields[i].type!='file'){
          formData.append(this.recipe.fields[i].name,this.recipe.fields[i].value)
          confirmationstring = confirmationstring+this.recipe.fields[i].name+": "+this.recipe.fields[i].value+"\n"
        }
      };
      if(this.files.length>0){
        confirmationstring = confirmationstring + "files:\n"
        for (let j=0;j<this.files.length;j++){
          formData.append("file"+j,this.files[j])
          confirmationstring = confirmationstring + " * " + this.files[j].name + "\n"
        }
      }
      if(confirm(confirmationstring)){
        HTTP.post(this.apiURL+'/wadwriter',formData,{
          headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {
          if(res.data.success){
            this.closeRecipe()
          } else {
            this.msg=res.data.msg
          }
        })
      }
    },
    addField(){
      this.recipe.fields.push({name:"",format:"string",value:"",type:"string",new:"true"})  
    },
    addFile(){
      this.recipe.fields.push({name:"Bijlagen",format:"file",value:"",type:"file"})
    },
    removeField(name){
      for (let i=0;i<this.recipe.fields.length;i++){
        if(name==this.recipe.fields[i].name){
          this.recipe.fields.splice(i,1)
          return;
        }
      }
    },
    handleFileUpload(){
      for (let i=0;i<this.$refs.file[0].files.length;i++){
        this.files.push(this.$refs.file[0].files[i])
      }
    },
  }  
}


</script>

<style>
.tablecellkey{
  width:33%;
  padding:5px;
}

.tablecellvalue{
  width:61%;
  padding:5px;
}

.tablecellbutton{
  width:5%;
  padding:5px;
}
</style>
