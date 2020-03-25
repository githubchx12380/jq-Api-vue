const axios = require('axios')
import vue from 'vue'
import router from './src/router/index'
const http = axios.create({
    baseURL:'http://127.0.0.1:3000/admin/api'
})

http.interceptors.request.use(function (config) {
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
   
    return config;
  }, function (error) {
   
    return Promise.reject(error);
  });
function fn() {
    console.log('haha')
}
function gongju() {
    console.log('工具函数')
}
http.interceptors.response.use(function (response) {
        return response;
    },  (error) => {
        try{
            alertttt('')
        }
        catch(err){
            throw '喵的,账号密码输错了'
        }
        if(error.response.data.code === 301){
            vue.prototype.$message({
                message:'用户名错误'
            })
            
        }
        if(error.response.data.code === 302){
            vue.prototype.$message({
                message:'密码错误'
            })
        }
        if(error.response.status === 401){
            vue.prototype.$message({
                message:error.response.data.message
            })
            router.push('/login')
        }   
            return Promise.reject(error)
        } 
);




export default http