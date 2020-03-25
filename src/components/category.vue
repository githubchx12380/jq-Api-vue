<template>
    <el-main>
      <el-table :data="model">
        <el-table-column prop="_id" label="ID" width="400">
        </el-table-column>
        <el-table-column prop="title" label="分类名称" width="600">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
                <el-button @click="deleteClick(scope.row)" type="danger" size="small">删除</el-button>    
            </template>
        </el-table-column>
      </el-table>
     
    </el-main>
</template>

<script>
export default {
    data() {
      return {
        model:[]
      }
    },
    methods:{
     async list() {
        const res = await this.$http.get('/category')
        this.model = res.data
        
      }, //获取分类列表数据
      handleClick(scope){
          this.$router.push(`/addcategory/` + scope._id)
      },
    deleteClick(scope){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$http.delete('rest/category/' + scope._id)  //根据id删除
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           await this.list()   //删除以后重新渲染一下页面数据
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    created() {
      this.list()
    }
}
</script>

<style>

</style>