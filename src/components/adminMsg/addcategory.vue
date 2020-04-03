<template>
  <div style="width:98%">
    <h2 style="text-align:center">{{id ? '编辑' : '添加'}}分类</h2>
    <el-form @submit.native.prevent="save" label-width="70px">
        <el-form-item label="分类">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button native-type="submit">提交</el-button>
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
        model:{}
      }
    },
     methods:{
       async save() {  
          if(this.id) {  //有id则发送put
            const res = await this.$http.put('rest/category/' + this.id,this.model)
            this.$message({
                type:'success',
                message:'修改成功'
            })
          }else{        //没有则发送post提交
            const res = await this.$http.post('rest/category',this.model)
            this.$message({
                type:'success',
                message:'添加成功'
            })
          }
          this.$router.push('/category')
      },
      async selectData () {
            const res = await this.$http.get('rest/category/' + this.id)
            this.model = res.data[0]
      },
    },
    created(){
       if(this.id){   //点击编辑元素数据,无id不发送
        this.selectData() 
       }  
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