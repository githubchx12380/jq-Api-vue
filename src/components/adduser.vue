<template>
  <div style="width:98%">
    <h2 style="text-align:center">{{id ? '编辑' : '添加'}}分类</h2>
    <el-form @submit.native.prevent="save" label-width="100px">
        <el-form-item label="管理员姓名">
            <el-input  v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号">
            <el-input @blur="username" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
            <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" native-type="submit">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    props:{
      id:{type:String}
    },
    data() {
      return {
        model:{},
        obj:{username:false}
      }
    },
     methods:{
       async save() {  
         if(this.obj.username && this.model.name != ''){
            if(this.id) {  //有id则发送put
            const res = await this.$http.put('rest/user/' + this.id,this.model)
            this.$message({
                type:'success',
                message:'修改成功'
            })
          }else{        //没有则发送post提交
            const res = await this.$http.post('rest/user',this.model)
            this.$message({
                type:'success',
                message:'添加成功'
            })
          }
          this.$router.push('/user')
         }else{
           this.$message({message:'账号密码格式不正确,请重新填写'})
         }
      },
      async selectData () {
            const res = await this.$http.get('rest/user/' + this.id)
            this.model = res.data[0]
      },
      username() {
        let uPattern = /^[a-zA-Z0-9_-]{6,16}$/;
        let username = this.model.username
        if(!uPattern.test(username)){
          this.$message({message:'请输入6到16位（字母，数字，下划线，减号）'})
          this.obj.username = false
        }else{
          this.obj.username = true
        }
      },
    },
    created(){
       if(this.id){   //点击编辑元素数据,无id不发送
        this.selectData() 
       }  
       this.username()
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

</style>