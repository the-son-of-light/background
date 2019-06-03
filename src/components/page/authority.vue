<template>
    <div>
        <div class="authority">
            <el-table
            :data="tableData"
            style="width: 100%"
            >
                <el-table-column
                prop="username"
                label="用户名"
                
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                
                align="center"
                >
                </el-table-column>
                 <el-table-column
                prop="rolevalue"
                label="权限"
                align="center"
                >
                <!-- <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.rolevalue[0]">通知公告</el-checkbox>
                    <el-checkbox v-model="scope.row.rolevalue[1]">政策法规</el-checkbox>
                    <el-checkbox v-model="scope.row.rolevalue[2]">财务学堂</el-checkbox>
                    <el-checkbox v-model="scope.row.rolevalue[3]">超级管理员</el-checkbox>
                </template> -->
                </el-table-column>
                <el-table-column
                prop="addDelete"
                label="修改/删除权限"
                align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="add(scope.row)">修改</el-button>
                        <el-button type="primary" @click="del(scope.row)">删除</el-button>             
                    </template>
                </el-table-column>
            </el-table>
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
    name:'authority',
    data(){
        return{
            publicInfo:true,
            policy:"",
            money:"",
            superMan:"",
            tableData: [],
            value:'',
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
            let _this = this;
            this.tableData = [];
            let page = {
                page:this.currentPage,
                rows:this.pagesize
            }
            api.getUserInfo(page).then(res=>{
                console.log(res)
                for(let i of res.obj.rows){
                    if(i.sex == 1){
                        i.sex = "男"
                    }else if(i.sex == 0){
                        i.sex = "女"
                    }
                    // for(let k of _this.options){
                    //     if(k.value==i.role){
                    //         i.rolevalue=k.label;
                    //     }
                    // }
                    _this.tableData.push(i)
                }
                let abc = _this.tableData[0].role;
                abc.split("")
                console.log( abc.split(""))
                this.total = res.obj.total;
            })
        },
        // 获取下拉列表中更改的value值
        changeF(e){
            console.log(e)
            this.value = e;
        },
        // 增加权限
        add(id){
            console.log(id.id)
            let authority = {
                userid:id.id,
                role:this.value
            }
            api.addAuthority(authority).then(res=>{
                if(res.msg == "添加成功！"){
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                } 
            })
            this.getUser();
        },
        del(id){
            let delContent = {
                userid:id.id
            }
            api.delAuthority(delContent).then(res=>{
                console.log(res.msg)
                console.log(res.msg == "禁言成功")
                if(res.msg == "禁用成功！"){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                }
                this.getUser();
            })
            
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
        }
    }
}
</script>

<style scoped>
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
