<template>
    
    <el-main>
      <div class="element-component">
         <el-pagination
        @current-change="changesize"
        :current-page="1"
        background
        layout="prev, pager, next"
        :total="model.countPage * 10">
        </el-pagination>
        <select-data @selectIdfilter="selectDatas"></select-data>
        <seek-data @seekDetailData="seekData" v-if="falg"></seek-data>
        <el-button @click="initDatas" style="margin:0 10px">初始化</el-button>
      </div>
      <el-table :data="model.data" >
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="title" label="上级分类">
        </el-table-column>
        <el-table-column prop="date" label="发布时间">
        </el-table-column>
        <el-table-column prop="name" label="文章标题">
        </el-table-column>
        <el-table-column  label="封面图片">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" style="border-radius:5%; height:70px; width:70px;" alt="">
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
import seekData from '../public/seekdata'
import selectData from '../public/select'
export default {
    data() {
      return {
        model:[],
        models:[],
        category:[],
        filters:{page:1,pagesize:50},
        falg:true
      }
    },
    components:{
      selectData,
      seekData
    },
    created() { 
       this.categoryData()   //获取分页数据
       this.create()
    },
    methods:{
        //初始化
        initDatas() {
           this.falg = false
           this.$nextTick(() => {
             this.falg = true
           })
           this.model.data = this.models
        },
        //模糊搜索
        seekData(res) {
          this.model.data = res
        },
        //页面刷新先调用一次
        async create(){
          this.initData()
        },
        //初始化
        async initData() {
            const res = await this.$http.post('/list/page',this.filters) 
            this.model = res.data
            this.models = res.data.data
        },
        //获取当前点击的页数  //筛选数据
        async changesize(pages){
          this.filters.page = pages
          const res = await this.$http.post('/list/page',this.filters)
          this.model = res.data
          this.models = res.data.data
        },
        //获取select数据
        async categoryData() {
          const res = await this.$http.get('/category')
          this.category = res.data
        },
        //获取当前的select对应的id
        selectDatas(data){
          this.model.data = this.models
          if(!data) return
          this.model.data = this.model.data.filter(item => {
            return item._id == data
          })
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
            this.initData()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          },
          //页数
         
        },
       
}
</script>

<style>
.element-component{
  display: flex;
}
</style>