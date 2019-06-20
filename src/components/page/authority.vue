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
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="100"
                align="center"
                >
                </el-table-column>
                 <el-table-column
                prop="role"
                label="权限"
                width=500
                header-align="center"
                >
                <template slot-scope="scope" >
                    <!-- <el-checkbox v-model="scope.row.list.role" v-for='scope.row.list'>{{scope.row.list.role}}</el-checkbox> -->

                    <el-checkbox v-model="item.stast" v-for="item in scope.row.objList" :key="item.role">{{item.name}}</el-checkbox>
                    <!-- <el-checkbox v-model="scope.row.list.role" >{{scope.row.list.role}}</el-checkbox>
                    <el-checkbox v-model="scope.row.list.role" >{{scope.row.list.role}}</el-checkbox>
                    <el-checkbox v-model="scope.row.list.role" >{{scope.row.list.role}}</el-checkbox>
                    <el-checkbox v-model="scope.row.list.role" >{{scope.row.list.role}}</el-checkbox>
                    <el-checkbox v-model="scope.row.list.role" >{{scope.row.list.role}}</el-checkbox> -->
                </template>
                </el-table-column>
                <el-table-column
                prop="addDelete"
                label="修改/删除权限"
                align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="add(scope.row)">保存</el-button>
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
                for(let i of res.obj.list){
                    let objList = [
                        {
                            role:'141',
                            name:'超级管理员',
                            stast:false
                        },
                        {
                            role:'142',
                            name:'通知公告',
                            stast:false
                        },
                        {
                            role:'143',
                            name:'财务学堂',
                            stast:false
                        },
                        {
                            role:'144',
                            name:'来款认领',
                            stast:false
                        },
                        {
                            role:'145',
                            name:'公务卡办理',
                            stast:false
                        },
                        {
                            role:'146',
                            name:'预算指南',
                            stast:false
                        },
                        {
                            role:'147',
                            name:'科研指南',
                            stast:false
                        }
                    ];
                    for(let k of objList){
                        for(let j of i.list){                            
                            if(k.role===j.role){
                                k.stast = true;
                            }
                        }
                    }
                    i.objList = objList;
                    _this.tableData.push(i)
                }
                this.total = res.obj.total;
            })
        },
        // 保存权限
        add(list){
            let arr = []
            for(let i of list.objList){
                if (i.stast){ //为真值的时候  这样就可以了，，除了fales  0  还有对象和数组 好的咧
                    arr.push(i.role)
                }
            }
            let authority = {
                userid:list.id,
                role:arr.join(',')
            }
            api.addAuthority(authority).then(res=>{
                if(res.msg == "添加成功！"){
                    this.$message({
                        showClose: true,
                        message: '保存成功',
                        type: 'success'
                    })
                } 
                this.getUser();
            })
        },
        del(id){
            let delContent = {
                userid:id.id
            }
            api.delAuthority(delContent).then(res=>{
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
