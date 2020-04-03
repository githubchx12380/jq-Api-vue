import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import category from '../components/adminMsg/category.vue'
import addcategory from '../components/adminMsg/addcategory.vue'
const detail = () => import('../components/adminMsg/detail.vue')
import adddetail from '../components/adminMsg/adddetail.vue'
import user from '../components/adminMsg/user.vue'
import adduser from '../components/adminMsg/adduser.vue'
import login from '../components/adminMsg/login.vue'
const contribute = () => import('../components/web/contribute')
import webuser from '../components/web/webuser.vue'
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
      {path:'/contribute',component:contribute},

      {path:'/user',component:user},
      {path:'/adduser',component:adduser},
      {path:'/adduser/:id',component:adduser,props:true},
      {path:'/webuser',component:webuser},
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


