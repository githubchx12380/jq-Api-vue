<template>
    
    <el-main>
      <select-data @selectIdfilter="filterId" v-if="hackReset"></select-data>
      <date :arrayData="models" @dataDate="dateEvent" v-if="hackReset"></date>
      <el-button @click="recover">恢复原始排序</el-button>
      <el-table :data="model" >
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="title" label="上级分类">
        </el-table-column>
        <el-table-column prop="name" label="文章标题">
        </el-table-column>
        <el-table-column  label="封面图片">
            <template slot-scope="scope">
              <img :src="scope.row.img" style="border-radius:5%; height:70px; width:70px;" alt="">
            </template>
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
import date from './public/date'
import selectData from './public/select'
export default {
    data() {
      return {
        model:[],
        models:[],
        hackReset:true
      }
    },
    components:{
      date,
      selectData
    },
    methods:{
        filterId(id){
          this.model = this.models
          this.model = this.model.filter(item => {
            return item._id == id
          })
        },
        //使用nextTick 和 v-if无刷新重新渲染组件,并且重新排序
        recover(){  
            this.model = this.models
            this.hackReset = false
            this.$nextTick(() => {
              this.hackReset = true
          })
        },
        //date日期传过来的数据,渲染页面
        dateEvent(data){
          this.model = data
        },
        //进入详情列表获取关联数据
        async list() {
          const res = await this.$http.get('rest/detailparent')
          this.model = res.data
          this.models = res.data
        }, 
        //点击编辑,带着id跳转过去
        handleClick(scope){     
            this.$router.push(`/adddetail/` + scope.id)
        },
        //点击删除,提示是否确认,确认带着id请求服务器
        deleteClick(scope){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              this.$http.delete('rest/detail/' + scope.id)  //根据id删除
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
        //跳到详情页请求数据
        created() {
          this.list()
        },
}
</script>

<style>

</style>