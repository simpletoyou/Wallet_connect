import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'


Vue.use(Router)
// 路由重复报错问题
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
let route = new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
  ]
})

route.beforeEach((to,from,next)=>{
  next();
})

export default route
