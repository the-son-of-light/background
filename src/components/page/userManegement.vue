<template>
    <div>
        <div class="addUserBtn">
            <el-button style="width:80px" type="primary" @click="add()">增加</el-button>
        </div>
        <div class="table">
            <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
                <el-table-column prop="username" label="用户名"></el-table-column>  
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="sex" label="性别" > </el-table-column>
                <el-table-column prop="tel"  label="手机号" > </el-table-column>
                <el-table-column prop="addDelete" label="删除">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="del(scope.row)">删除</el-button>             
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="addUser">
            <el-dialog
            title="增加用户"
            :visible.sync="dialogVisible"
            width="30%"
           >
                <div class="addUserInfo">
                    <p><span class="align">姓名：</span><span><el-input style="width:200px;" v-model="inputName" placeholder="请输入内容"></el-input></span></p>
                    <p><span class="align">性别：</span><el-input style="width:200px;" v-model="inputSex" placeholder="请输入内容"></el-input></p>
                    <p><span class="align">手机号：</span><el-input style="width:200px;" v-model="inputTel" placeholder="请输入内容"></el-input></p>
                    <p><span class="align">账号：</span><el-input style="width:200px;" v-model="inputlogin" placeholder="请输入内容"></el-input></p>
                    <p><span class="align">密码：</span><el-input style="width:200px;" v-model="inputPass" placeholder="请输入内容"></el-input></p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import api from '../../api/index'
export default {
    name:'userManegement',
    data(){
        return{
            inputName:'',
            inputSex:'',
            inputTel:'',
            inputlogin:'',
            inputPass:'',
            dialogVisible:false,
            tableData: [],
            currentPage:1,
            pagesize:10,
            total:0,
        }
    },
    created(){
        this.getUser();
    },
    methods:{
        // 获取用户信息
        getUser(){
            this.tableData = [];
            let page = {
                page:this.currentPage,
                rows:this.pagesize
            }
            api.getUserInfo(page).then(res=>{
                console.log(res.obj.list)
                for(let i of res.obj.list){
                    if(i.sex == 1){
                        i.sex = "男"
                    }else if(i.sex == 0){
                        i.sex = "女"
                    }
                    this.tableData.push(i)
                }
                this.total = res.obj.total;
            })
        },
        // 删除用户信息
        del(id){
            let _this = this;
            let userId = {
                userid:id.id
            }
            console.log()
            api.deleteUser(userId).then(res=>{
                console.log(res)
                if(res.msg == "禁用成功！"){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                }
                
                _this.getUser();
            }).catch(err=>{
                console.error(err);
            })
        },
        // 打开二级窗口
        add(){
            this.dialogVisible = true;
        },
        // 增加用户信息
        addUser(){
            let that = this;
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
            if(this.inputSex == '女'){
                this.inputSex = 0
            }else if(this.inputSex == '男'){
                this.inputSex = 1
            }
            console.log(this.inputSex)
            let addUserInfo = {
                username:this.inputlogin,
                password:this.inputPass,
                name:this.inputName,
                tel:this.inputTel,
                sex:this.inputSex
            }
            api.addUser(addUserInfo).then(res=>{   
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                })
                that.getUser();
            })
            this.dialogVisible = false;
            this.inputName = '';
            this.inputSex = '';
            this.inputTel = '';
            this.inputlogin = '';
            this.inputPass = '';
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.getUser();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
             this.getUser();
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        }
    }
}
</script>

<style scoped>
.addUserBtn{
    width: 100%;
    display:flex;
    justify-content:flex-end;
    flex-direction: row;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
}

.table{
    margin-top: 10px;
}

.table >>> .el-table--fit {
    border-radius: 10px;
}

.align{
    display: inline-block;
    width: 100px;
    text-align: right;
}

.addUserInfo {
    display:flex;
    justify-content: center;
    flex-direction: column;
}

.addUserInfo p {
    margin-top: 10px;
    flex-direction: row;
    justify-items: right;
}

.pagination{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    float: right;
}

.pagination >>> .el-pagination{
    font-weight: 700;
    text-align: center;
    border-radius: 10px;
}
</style>
