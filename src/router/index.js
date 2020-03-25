import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import category from '../components/category.vue'
import addcategory from '../components/addcategory.vue'
import detail from '../components/detail.vue'
import adddetail from '../components/adddetail.vue'
import user from '../components/user.vue'
import adduser from '../components/adduser.vue'
import login from '../components/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/',
    component:home,
    children:[
      {path:'/category',component:category},
      {path:'/addcategory',component:addcategory},
      {path:'/addcategory/:id',component:addcategory,props:true},

      {path:'/detail',component:detail},
      {path:'/adddetail',component:adddetail},
      {path:'/adddetail/:id',component:adddetail,props:true},

      {path:'/user',component:user},
      {path:'/adduser',component:adduser},
      {path:'/adduser/:id',component:adduser,props:true}
    ]
  },
  {
    path:'/login',
    component:login,
    meta:{ispublic:true}
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
  if(!to.meta.ispublic && !localStorage.token){
    router.push('/login')
    Vue.prototype.$message({
      message:'请先登录'
    })
  }
  next()
})
export default router


