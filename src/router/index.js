import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/views/Main';
import Login from '@/views/Login';

import UserList from '@/views/user/List';
import UserMsg from '@/views/user/UserMsg';
import Register from '@/views/Register';
import SchoolList from '@/views/school/SchoolList';
import SchoolApplyList from '@/views/school/SchoolApplyList';
import SchoolCollect from '@/views/school/SchoolCollect';

import NotFound from '@/views/404';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'Index',
      path: '/',
      redirect: '/login'
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Main',
      path: '/main',
      component: Main,
      children: [
        {name: 'UserList', path: '/user/list', component: UserList},
        {name: 'SchoolList', path: '/school/schoolList', component: SchoolList},
        {name: 'SchoolApplyList', path: '/school/schoolApplyList', component: SchoolApplyList},
        {name: 'SchoolCollect', path: '/school/schoolCollect', component: SchoolCollect},
        {name: 'UserMsg', path: '/user/userMsg', component: UserMsg}
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

/*挂载路由导航守卫*/
router.beforeEach((to,from,next) => {
  //to:  将要访问的路径
  // from:  从哪个路径跳转而来
  // next:  是一个函数，表示放行  next()放行;  next("/login"): 强制跳转
  if(to.path === '/login' || to.path === '/register'){
    return next();
  }
  const token = window.sessionStorage.getItem("token");
  if(!token){
    return next('/login');
  } else {
    return next();
  }
})



export default router
