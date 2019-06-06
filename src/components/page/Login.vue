<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary"  @click="submitForm('ruleForm')" >登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import api from '../../api/index'
import store from '../../store'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                fullscreenLoading:false
            }
        },
        methods: {
            submitForm(ruleForm) {
                let getUser = {
                    username:this.ruleForm.username,
                    password:this.ruleForm.password
                }
                this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                api.getUser(getUser).then(res=>{
                    console.log(res)
                    if(res.code==100){
                        // self.$message({
                        // message: res.msg,
                        // type: 'success'
                        // });
                        sessionStorage.setItem("token",res.obj.token);
                        // self.$store.commit('USERNAME',res.obj.userName);
                        sessionStorage.setItem("name",res.obj.userName);
                        this.$router.push({
                            path:'/user'
                        })
                      } else if(res.code==-1){
                        this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'warning'
                    })
                }
                    }) 
                    // .catch(function () {
                    // self.$message.error('网络异常，请重试！');
                    // })
                }
                  else{
                    alert("请确认用户名密码")
                  }
                })
            },
            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                  this.fullscreenLoading = false;
                }, 2000);
             },
             openFullScreen2() {
                const loading = this.$loading({
                  lock: true,
                  text: 'loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                  loading.close();
                }, 2000);
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
<!-- <style lang="less">@yellow: #FFD300;//loading内容
@blue: #5B7492;
@gray: #acb9c8;
.loading {
    width: 25%;
    height: 0.4rem;
    margin: 25% auto 0;
    position: relative;
    span {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        position: absolute;
        background: @blue;
        transform: translate(-50%,0);
    }
    .left {
        background: @yellow;
        animation: lMove 2.5s ease infinite;
    }
    .middle {
        left: 50%;
        animation: mMove 2.5s ease infinite;
    }
    .right {
        left: 100%;
        background: @gray;
        animation: rMove 2.5s ease infinite;
    }
}
</style> -->