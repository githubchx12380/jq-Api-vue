<template>
    <div class="selectbox">
        分类:
       <el-select v-model="selectId._id" @change="categoryData" placeholder="请选择" :clearable="true">
        <el-option
          
          v-for="(item,index) in select"
          :key="index"
          :label="item.title"
          :value="item._id"
          >
        </el-option>
      </el-select>
    </div>
     
 
</template>

<script>
export default {
    data() {
        return{
            select:[],
            selectId:{}
        }
    },
    methods:{
        
        categoryData() {
            this.$emit('selectIdfilter',this.selectId._id)
        },
        //发送选择的内容的id过去
        async selectData() {
            const res = await this.$http.get('/category')
            this.select = res.data
        }
    },
    created(){
         this.selectData()
    }
}
</script>

<style>
.selectbox{
    display: inline-block
}
</style>