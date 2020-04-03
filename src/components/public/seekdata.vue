<template>
    <div class="seekbox">
        <div class="seek">搜索:</div>
        <el-input v-model="value" placeholder="如需通过id搜索,格式为in:id" width="30px"></el-input>
        <el-button type="success" @click="seekClick" style="margin-left:10px">搜索</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value:''
        }
    },
    methods:{
        async seekClick() {
            const res = await this.$http.get('/v1/seekDetail?str=' + this.value)
            this.$emit('seekDetailData',res.data)
        }
    }
}
</script>

<style>

.seekbox{
    display: flex;
}
.seekbox .seek{
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 30px;
}
</style>