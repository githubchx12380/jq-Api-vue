<template>
  <div style="width:98%">
    <h2 style="text-align:center">{{id ? '编辑' : '添加'}}分类</h2>

    <el-form @submit.native.prevent="save" label-width="70px">
        <el-form-item label="所属分类">
           <el-select v-model="model._id" placeholder="请选择">
              <el-option
                v-for="(item,index) in list"
                :key="index"
                :label="item.title"
                :value="item._id">
              </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="文章标题">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="富文本">
           <vue-editor  useCustomImageHandler @image-added="handleImageAdded" v-model="model.content"> </vue-editor>
        </el-form-item>
        <el-form-item label="封面内容">
            <el-input type="textarea" v-model="model.cont"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
            <el-input v-model="model.date"></el-input>
        </el-form-item>
        <el-form-item label="下载地址">
            <el-input v-model="model.url"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            >
            <img v-if="model.img" :src="model.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        
        <el-form-item>
           <el-button native-type="submit">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components:{
      VueEditor
    },
    props:{
      id:{type:String}
    },
    data() {
      return {
        model:{},
        list:{}
      }
    },
     methods:{
       async handleAvatarSuccess(res) {
         this.$set(this.model,'img',res.url)
       },
       async handleImageAdded(file,Editor,cursorLocation,resetUploader) {
         var formData = new FormData()
         formData.append('file',file)
         const res = await this.$http.post('upload',formData)
         Editor.insertEmbed(cursorLocation,'image',res.data.url)
         resetUploader()
       },
       async save() {  
          if(this.id) {  //有id则发送put
            const res = await this.$http.put('rest/detail/' + this.id,this.model)
            this.$message({
                type:'success',
                message:'修改成功'
            })
          }else{        //没有则发送post提交
            const res = await this.$http.post('rest/detail',this.model)
            this.$message({
                type:'success',
                message:'添加成功'
            })
          }
          this.$router.push('/detail')
      },
      async selectData () {
            const res = await this.$http.get('rest/detail/' + this.id)
            this.model = res.data[0]
      },
      async categoryData() {
            const res = await this.$http.get('/category')
            this.list = res.data
      }
    },
    created(){
       if(this.id){   
        this.selectData() //有id获取数据渲染原始数据到页面
       }  
       this.categoryData()  //进入页面获取分类信息,
       
    },
    watch: {
      $route() {
        if (!this.id) {
          this.model = {}
         }
        }
      }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>