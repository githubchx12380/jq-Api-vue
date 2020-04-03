<template>
    <el-main>
      <el-table :data="model">
        <el-table-column prop="id" label="ID" >
        </el-table-column>
        <el-table-column prop="article_title" label="话题名称" >
        </el-table-column>
        <el-table-column prop="name" label="用户姓名" >
        </el-table-column>
        <el-table-column prop="date" label="发表时间" >
        </el-table-column>
       <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="successClick(scope.row)" type="success" size="small" v-if="scope.row.state == '待审核'">通过</el-button>
                <el-button @click="dangerClick(scope.row)" type="warning" size="small" v-if="scope.row.state == '待审核'">拒绝</el-button>    
                <el-button @click="deleteClick(scope.row)" type="danger" size="small" v-if="scope.row.state == '已通过' || scope.row.state == '已拒绝'">删除</el-button>    
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
        const res = await this.$http.get('/v1/contribute')
        this.model = res.data
      }, 
    //通过
    async successClick(scope){
        let obj = {}
        obj.id = scope.id
        obj.state = '已通过'
        const res = await this.$http.put(`rest/userdetail/${scope.id}`,obj)
        this.list()
    },
    //拒绝
    async dangerClick(scope){
        let obj = {}
        obj.id = scope.id
        obj.state = '已拒绝'
        const res = await this.$http.put(`rest/userdetail/${scope.id}`,obj)
        this.list()
    },
    //删除
    deleteClick(scope){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$http.delete('rest/userdetail/' + scope._id)  //根据id删除
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
    //通过
    
    created() {
      this.list()
    }
}
</script>

<style>

</style>