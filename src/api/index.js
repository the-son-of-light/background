import axios from 'axios';
import qs from 'qs';
import store from '../store/index'

axios.defaults.timeout = 150000;
axios.defaults.baseURL = 'http://101.200.36.164:8080';
axios.interceptors.request.use(
    config => {
        if(config.method === 'post'){
            config.data = qs.stringify(config.data)
        }
        if (sessionStorage.getItem('token')) {
            config.headers.common['token'] = sessionStorage.getItem('token')    ;//携带token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
      });
    
    
    // http response 拦截器
    axios.interceptors.response.use(
      response => {
        console.log(response.data.code)
        if(response.data.code==115){
          this.$message({
            showClose: true,
            message: "未登录",
            type: 'success'
          });
          router.push('Login');
        }else {
          return response.data  
        }
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              store.commit(types.logout);
              router.currentRoute.path !== 'Login' &&
              router.replace({
                path: 'Login',
                query: { redirect: router.currentRoute.path },
              })
          }
        }
        return Promise.reject(error.response)
      },
)

export default {
    // 登录页面  /openapi/admin/AdminLogin "username", "password"
    getUser(user){
        return axios.post('/openapi/admin/AdminLogin',user).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err)
        })
    },
    // 用户增删 /api/usermanage/controller/QueryUser page rows
    getUserInfo(page){
        return axios.post('/api/usermanage/controller/QueryUser',page).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err)
        })
    },
    // 增加用户 /api/usermanage/controller/AddUser "username", "password","name","tel","sex"
    addUser(addUserInfo){
        return axios.post('/api/usermanage/controller/AddUser',addUserInfo).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 删除用户 /api/usermanage/controller/DeleteUser  userid
    deleteUser(id){
        return axios.post('/api/usermanage/controller/DeleteUser',id).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 基本信息管理  /api/informationmanage/controller/QueryInfo
    baseUser(){
        return axios.post('/api/informationmanage/controller/QueryInfo').then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 添加权限 "/api/usermanage/controller/AssignPermissions"  "userid","role"
    addAuthority(authority){
        return axios.post('/api/usermanage/controller/AssignPermissions',authority).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 删除权限 "/api/usermanage/controller/DeleteUser"  "userid"
    delAuthority(delContent){
        return axios.post('/api/usermanage/controller/DeleteUser',delContent).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 修改基本信息 /api/informationmanage/controller/UpdateInfo name tel sex
    editorUser(user){
        return axios.post('/api/informationmanage/controller/UpdateInfo',user).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 修改密码 /api/informationmanage/controller/UpdatePassword   "password","newPwd","confirmPwd"
    editorPass(password){
        return axios.post('/api/informationmanage/controller/UpdatePassword',password).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 通知公告发布内容 /api/release/controller/AddNotice "pic","title","content"
    publicContent(publicPage){
        return axios.post('/api/release/controller/AddNotice',publicPage).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 政策法规 "/api/release/controller/AddPolicy" "pic","title","content"
    publicPolicy(publicPage){
        return axios.post('/api/release/controller/AddNotice',publicPage).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    },
    // 财政学堂 /api/release/controller/AddFinance  "pic","title","content"
    money(publicPage){
        return axios.post('/api/release/controller/AddNotice',publicPage).then(res=>{
            return res;
        }).catch(err=>{
            console.error(err);
        })
    }
 

}