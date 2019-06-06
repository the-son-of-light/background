<template>
    <div class="baseUserInfo">
       <div class="addUserInfo">
            <p><span>旧密码：</span><el-input style="width:200px;" v-model="inputlogin" placeholder="请输入内容"></el-input></p>
            <p><span>密码：</span><el-input style="width:200px;" type="passWord" v-model="inputPass" placeholder="请输入密码"></el-input></p>
            <p><span>确认密码：</span><el-input style="width:200px;"  type="passWord"  v-model="confirmPwd" placeholder="请确认密码"></el-input></p>
            <p><el-button type="primary" @click="confirmPass">确定</el-button></p>
        </div>
    </div>
</template>
<script>
import api from '../../api/index'
export default {
    name:'pass',
    data(){
        return{
            inputlogin:'',
            inputPass:'',
            confirmPwd:''
        }
    },
    methods:{
        // 确认密码
        confirmPass(){
            let password = {
                password:this.inputlogin,
                newPwd:this.inputPass,
                confirmPwd:this.confirmPwd
            }
            api.editorPass(password).then(res=>{
                if(res.code == 0){
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'warning'
                    })
                }
                
            })
        }
    }
}
</script>

<style scoped>
.baseUserInfo{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.addUserInfo {
    text-align: center;
    display:flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 20px;
}
.addUserInfo p {
    margin-top: 10px;
}

.addUserInfo span{
    display: inline-block;
    width: 80px;
    text-align: right;
}
</style>

