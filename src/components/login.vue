<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
        <el-form @submit.native.prevent="userlogin">
            <el-form-item label="用户名" >
                <el-input type="text" v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input type="password" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model:{}
        }
    },
    methods:{
        async userlogin() {
            const res = await this.$http.post('login',this.model)
            localStorage.token = res.data.token
            console.log(res)
            this.$message({
                type:'success',
                message:`登录成功,${res.data.name},欢迎您!`
            })
            this.$router.push('/category')
        }
    }
}

</script>
<style scoped>
.login-card{
    width: 30rem;
    margin: 8rem auto
}
</style>