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
        <div class="tablerow" v-for="field in recipe.fields">
          <div class="tablecellkey">
            <input class="textbox" type="text" v-model="field.name">
          </div>
          <div class="tablecellvalue" v-if="field.type=='string'">
            <input class="textbox" type="text" v-model="field.value" :placeholder="field.format">
          </div>
          <div class="tablecellvalue" v-if="field.type=='select'">
            <select v-model="field.value">
              <option v-for="option in field.options">{{option}}</option>
            </select>
          </div>
          <div class="tablecellvalue" v-if="field.type=='file'">
            <input class="textbox" type="file" multiple ref="file" v-on:change="handleFileUpload()">
          </div>
          <div class="tablecellbutton">
            <button class="smbutton" @click="removeField(field.name)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="tablerow">
          <div class="tablecellkey">
            <button class="button" @click="sendForm">
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
          <button class="smbutton" @click="addField">
            <i class="fas fa-plus-square"></i>
            Add field
          </button>
          <button class="smbutton" @click="addFile">
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
      apiURL:'http://'+this.$store.getters.api.ip+':'+this.$store.getters.api.port+'/api',
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
      this.recipe.fields.push({name:"",format:"string",value:"",type:"string"})  
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

.overlaybox{
  display:flex;
  flex-direction:column;
  height:70%;
  width:70%;
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
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

.tablerow{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-around;
}

.tablerow:nth-child(even){
    background-color: #0C0C0C;
}
.tablerow:nth-child(odd){
    background:#2F2F2F;
}

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

.pointer{
  cursor:pointer;
}

.button{
  border-radius: 5px;
  border: none;
  font-size: 15px;  
  height:30px;
  cursor:pointer;
}

.smbutton{
  border-radius: 5px;
  border: none;
  font-size: 10px;  
  height:20px;
  cursor:pointer;
}

.textbox{
  border:none;
  background-color:#444444;
  width:100%;
  height:30px;
  border-bottom:3px solid #0FAAEA;
  color:white;
  font-family: 'Roboto', sans-serif;
  border-radius:5px;
  padding-left:5px;
  box-sizing:border-box;
}

</style>
