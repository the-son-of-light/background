<template>
    <div class="showListBox">

        <div class="table">
            <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
                <el-table-column prop="title" label="标题"></el-table-column>  
                <el-table-column prop="name" label="发布人" ></el-table-column>
                <el-table-column prop="createat" label="发布时间" > </el-table-column>
                <el-table-column prop="addDelete" label="编辑">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="del(scope.row)">编辑</el-button>             
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
    name:'show',
    data(){
        return{
            currentPage:1,
            pagesize:10,
            total:0,
            tableData:[]
        }
    },
    created(){
        this.showPublic();
    },
    methods:{
        showPublic(){
            let showPolicyContent = {
                page:this.currentPage,
                rows:this.pagesize,
                type:1
            }
            api.getPublicContent(showPolicyContent).then(res=>{
                this.tableData = res.obj.rows
                console.log(this.tableData)
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

