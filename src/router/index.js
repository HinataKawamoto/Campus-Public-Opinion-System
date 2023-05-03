import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Head from '../components/head.vue'
import Map from '../components/map.vue'
import Left from "../components/left.vue"
import Right from "../components/right.vue"
import Login from "../components/login.vue"
import Admin from "../menus/Admin.vue"
import Homepage from "../menus/Homepage.vue"
import Article from "../menus/Article.vue"
import Board from "../menus/Board.vue"
Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path:'/index',component:Index},
    { path: '/head', component: Head },
    { path: '/map', component: Map },
    { path: '/left', component: Left },
    { path: '/right', component: Right },
    { path: '/login', component: Login },
    {
      path: '/admin', component: Admin,
      redirect: '/admin/homepage',
      children:[
        { path: 'homepage', component: Homepage },
        { path: 'article', component: Article },
        { path: 'board', component: Board }
        
      ]
    }
    
    
  ]
})

router.beforeEach(function (to, from, next) {
  const pathArr =['/index','/admin/homepage']
  if (pathArr.indexOf(to.path)!=-1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next(
        alert('此功能需要登入后才能使用'),
        next('/login')
        
      )
    }
  } else {
    next()
  }
})
export default router
