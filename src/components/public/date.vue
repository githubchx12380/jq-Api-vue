<template>
  <div class="block">
    <span class="demonstration">日期选择:</span>
    <el-date-picker
      @change="dateChange"
      v-model="value1"
      value-format="timestamp"
      type="datetimerange"
      :clearable="false"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    props:{
        arrayData:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
      return {
        arrayData1:[],
        value1: [],
      };
    },
    methods:{
        dateChange(){
            this.arrayData1 = this.arrayData
            try{
                 const Data =  this.arrayData1.filter(item => {
                let time = Date.parse(item.date)
                return time > this.value1[0] && time < this.value1[1] 
                })
                this.$emit('dataDate',Data)
            }
            catch(err){
                console.log('')
            }
        }
    },
  };
</script>
<style>
.block{
    margin: 0 30px;
    display: inline-block
}
</style>