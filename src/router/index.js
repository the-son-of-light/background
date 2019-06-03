import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

const router =  new Router({
  routes: [
        {
            path: '/',
            redirect: '/user'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/user',
                    component: resolve => require(['../components/page/userManegement.vue'], resolve),
                    meta: { title: '用户管理',requireAuth: true, }
                },      
                {
                    path: '/authority',
                    component: resolve => require(['../components/page/authority.vue'], resolve),
                    meta: { title: '权限管理' ,requireAuth: true,}
                }, 
                {
                    path: '/basicInformation',
                    component: resolve => require(['../components/page/basicInformation.vue'], resolve),
                    meta: { title: '基本信息管理' ,requireAuth: true,}
                },
                {
                    path: '/public',
                    component: resolve => require(['../components/page/public.vue'], resolve),
                    meta: { title: '通知公告',requireAuth: true, }
                },{
                    path: '/policy',
                    component: resolve => require(['../components/page/policy.vue'], resolve),
                    meta: { title: '公务卡办理', requireAuth: true, }
                },{
                    path: '/money',
                    component: resolve => require(['../components/page/policy.vue'], resolve),
                    meta: { title: '财政学堂', requireAuth: true,}
                }
            ]
        },
        {
            path: '/Login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
       
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
    store.commit('Login', window.sessionStorage.getItem('token'))
    // 刷新页面时重新将sessionStorage的name存进store的USERNAME
    store.commit('USERNAME',sessionStorage.getItem("name"));
  }
  
  router.beforeEach((to, from, next) => {
    let token=sessionStorage.getItem('token');
    if (to.matched.some(r => r.meta.requireAuth)) {
      if (token) {
        next();
      }
      else {
        next({
          path: '/Login',
          query: {redirect: to.path}
        })
      }
    }
    else {
      next();
    }
  });
export default router;