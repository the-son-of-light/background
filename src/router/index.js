import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

const router =  new Router({
  routes: [
        {
            path: '/',
            redirect: 'user'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/moneyList',
                    component: resolve => require(['../components/page/moneyList.vue'], resolve),
                    meta: { title: '财务学堂展示列表',requireAuth: true, }
                },
                {
                    path: '/confrimList',
                    component: resolve => require(['../components/page/confrimList.vue'], resolve),
                    meta: { title: '来款认领展示列表',requireAuth: true, }
                },
                {
                    path: '/policyList',
                    component: resolve => require(['../components/page/policyList.vue'], resolve),
                    meta: { title: '公务卡办理展示列表',requireAuth: true, }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/show.vue'], resolve),
                    meta: { title: '通知公告展示列表',requireAuth: true, }
                },   
                {
                    path: '/userManegement',
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
                    component: resolve => require(['../components/page/money.vue'], resolve),
                    meta: { title: '财政学堂', requireAuth: true,}
                },{
                    path: '/confirm',
                    component: resolve => require(['../components/page/confirm.vue'], resolve),
                    meta: { title: '来款认领',requireAuth: true, }
                }, {
                    path: '/pass',
                    component: resolve => require(['../components/page/pass.vue'], resolve),
                    meta: { title: '修改密码',requireAuth: true, }
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