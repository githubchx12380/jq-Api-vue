<template>
    <el-main>
      <el-table :data="model">
        <el-table-column prop="id" label="ID" width="400">
        </el-table-column>
        <el-table-column prop="name" label="用户姓名" width="600">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="success" size="small">查看资料</el-button>
                <el-button @click="deleteClick(scope.row)" type="info" size="small" v-if="scope.row.webuser_state == '正常'">拉黑用户</el-button>    
                <el-button @click="successClick(scope.row)" type="primary" size="small" v-else>恢复正常</el-button>    
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
        const res = await this.$http.get('rest/webuser')
        this.model = res.data
        
      }, //获取分类列表数据
    //查看资料
    handleClick(scope) {

    },
    //拉黑用户
    deleteClick(scope){
        let obj = {}
        obj.id = scope.id
        obj.webuser_state = '已拉黑'
        this.$http.put(`rest/webuser/${obj.id}`,obj)    
        this.list()
    },
    //恢复正常
    successClick(scope){
        let obj = {}
        obj.id = scope.id
        obj.webuser_state = '正常'
        this.$http.put(`rest/webuser/${obj.id}`,obj)    
        this.list()
    },
    },
   
    created() {
      this.list()
    }
}
</script>

<style>

</style>