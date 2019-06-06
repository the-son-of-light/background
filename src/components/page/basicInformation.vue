<template>
    <div class="baseUserInfo">

        <div class="addUserInfo">
            <p><span>姓名：</span><el-input style="width:200px;" v-model="inputName" placeholder="请输入内容"></el-input></p>
            <p><span>性别：</span><el-input style="width:200px;" v-model="inputSex" placeholder="请输入内容"></el-input></p>
            <p><span>手机号：</span><el-input style="width:200px;" v-model="inputTel" placeholder="请输入内容"></el-input></p>
            <p><el-button type="primary" @click="editorbase">确定</el-button></p>
        </div>
    </div>
</template>
<script>
import api from '../../api/index'
export default {
    name:'basicInformation',
    data(){
        return{
            inputName:'',
            inputSex:'',
            inputTel:'',
            inputlogin:'',
            inputPass:'',
            confirmPwd:''
        }
    },
    created(){
        this.getBaseUser()
    },
    methods:{
        // 加载初始数据
        getBaseUser(){
            api.baseUser().then(res=>{
                console.log(res)
                if(res.obj.sex == 0){
                    res.obj.sex = '男'
                }
                if(res.obj.sex == 1){
                    res.obj.sex = '女'
                }
                this.inputName = res.obj.name;
                this.inputSex = res.obj.sex;
                this.inputTel = res.obj.tel
            })
        },
        // 修改个人信息
        editorbase(){
            if(this.inputSex != '男' && this.inputSex != '女'){
                this.$message({
                    showClose: true,
                    message: '请输入男或女',
                    type: 'warning'
                })
                return;
            }
            console.log(this.inputSex)
            if(!(/^1[34578]\d{9}$/.test(this.inputTel))){
                this.$message({
                    showClose:true,
                    message:'请输入正确的手机号',
                    type: 'warning'
                })
                return;
            }
            if(this.inputSex == '男'){
                this.inputSex = 0
            }
            if(this.inputSex == '女'){
                this.inputSex = 1
            }
            let user = {
                name:this.inputName,
                sex: this.inputSex,
                tel:this.inputTel
            }
            api.editorUser(user).then(res=>{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                })
            })
            this.getBaseUser();
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
