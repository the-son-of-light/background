<template>
    <div class="policyListBox">
        <div class="addUserBtn">
            <el-button style="width:80px" type="primary" @click="add()">增加</el-button>
        </div>
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
                        <el-button type="primary" @click="editorContent(scope.row)">编辑</el-button>       
                        <el-button type="primary" @click="deleteContent(scope.row)">删除</el-button>       
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
         <!-- 修改页面内容 -->
         <div class="editorContent">
            <el-dialog
                title="增加内容"
                :visible.sync="dialogVisible"
                width="60%"
            >
                <div class="editor">
                    <p>标题：<el-input style="width:95%;" v-model="titleInfo" placeholder="请输入内容"></el-input></p>
                    <p>缩略图:
                        <a href="javascript:;" class="file">选择图片
                            <input @change="uploadPhoto($event)" type="file" class="kyc-passin">
                        </a>
                    </p>
                    <p class="image">
                        <img class="editorImage" :src="image" alt="">
                    </p>
                    <editor-bar v-model="editor.info" :isClear="isClear" @change="change"></editor-bar>
                    <div class="upload">
                        <el-upload
                        ref="upload"
                        class="upload"
                        :action="uploadUrl"
                        :on-success="handleSuccess"
                        :limit=3
                        multiple
                        method:="post"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"
                        :file-list="fileList">
                        <el-button size="small" type="primary" plain>上传附件</el-button>
                        </el-upload>
                    </div> 
                </div>
                <div class="button">
                    <el-button type="primary" @click="saveHtml">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import api from '../../api/index'
import EditorBar from './wangeditor'
let p = document.createElement('p')
let a = document.createElement('a')
let div = document.createElement('div')
export default {
    name:'policyList',
    data(){
        return{
            uploadUrl:this.GLOBAL.BASE_URL+'/api/Administration/group/UploadFile',
            fileList:[],
            currentPage:1,
            pagesize:10,
            total:0,
            tableData:[],
            dialogVisible:false,//是不是因为value没在data中注册
            image:'',
            titleInfo:'',
            editor: {
                info: ''
            },
            isClear: false,
            value:''
        }
    },
    created(){
        this.showPublic();
    },
    methods: {
          // 上传文件
        handleSuccess(response,file, fileList){
            //上传成功要处理的事
            console.log(file.name)
                response.data[0] == ''?
                this.$message({
                    showClose: true,
                    message: '上传失败',
                    type: 'warning'
                }):
                this.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'success'
                })
            p.append(a)
            a.className = 'download'
            a.innerText = file.name;
            a.href = response.data[0];
            a.download = file.name;
            div.append(p)
            this.editor.info += div.innerHTML;
        },
        // 页面展示
        showPublic(){
            let showPolicyContent = {
                page:this.currentPage,
                rows:this.pagesize,
                type:4
            }
            api.QueryOfficial(showPolicyContent).then(res=>{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'warning'
                })
                this.tableData = res.obj.rows;
                this.total = res.obj.total;
            })
        },
        // 删除文件
        deleteContent(contentId){
            console.log(contentId.id)
            let id = {
                id:contentId.id
            }
            api.DeleteOfficial(id).then(res=>{
                 // 图片大于2MB
               this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                })
                this.showPublic()
                console.log(res)
            })
        },
        //上传图片
        uploadPhoto(e) {
            let _this = this;
            // 利用fileReader对象获取file
            var file = e.target.files[0];
            var filesize = file.size;
            var filename = file.name;
            // 2,621,440   2M
            if (filesize > 2101440) {
                // 图片大于2MB
               this.$message({
                    showClose: true,
                    message: '图片不能超过2M',
                    type: 'warning'
                })
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e)=> {
                // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                _this.image = e.target.result;
                _this.imgUrl = e.target.result;
                console.log(_this.imgUrl);  
            }
        },
        // 增加跳转到富文本编辑器页面
        add(){
            this.$router.push({
                path:'/policy'
            })
        },
        editorContent(id){
            let _this = this;
            this.value = id.id;
            this.dialogVisible = true;
            let getId = {
                id:id.id
            }
            api.getDetail(getId).then(res=>{
                console.log(res)
                this.editor.info = '';
                let resData = res.obj;//后台返回的数据
                _this.imgUrl = resData.pic;
                this.titleInfo = resData.title;//标题内容
                this.editor.info = resData.content;//编辑器内容
                this.image = this.GLOBAL.BASE_URL+'/'+resData.pic;
                console.log(this.image)
                this.showPublic();//重新调用接口 刷新页面
            })
        },
         handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.showPublic();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
             this.showPublic();
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        //保存修改内容
         saveHtml:function(event){
            let _this = this;
            console.log(this.image)
            if(this.titleInfo == '' || this.editor.info == ''){
                this.$message({
                    showClose: true,
                    message: '标题或内容不能为空',
                    type: 'warning'
                })
            }
            console.log(this.editor.info)
            let publicPage = {
                id:this.value,
                pic: _this.imgUrl,
                title:_this.titleInfo,
                content:_this.editor.info
            }
            console.log(publicPage.content)
            api.UpdateOfficial(publicPage).then(res=>{
                console.log(res)
                this.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success'
                })
                this.showPublic();
            }) 
            this.titleInfo = '';
            this.image = '';
            this.editor.info = '';
            this.dialogVisible = false;    
            location. reload()
        },
        change (val) {
        this.editor.info1 = val
        }
    },
    components: {
        EditorBar
    }
}
</script>
<style scoped>
.editorImage{
    margin: 20px 0;

}
.upload{
    margin-top: 20px;
}

.upload >>> .upload{
    width: 100%;
    height: auto;
}

.upload >>> .el-upload {
    width: 90px;
    height: 34px;
    background: none;
    border:none;
}

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

.editor >>> table{
    border: 1px solid #333;
    text-align: center;
}

.editor >>> th{
    border: 1px solid #333;
}

.editor >>> td{
    border: 1px solid #333;
}

.editor >>> tr{
    border: 1px solid #333;
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

.button{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.file{
    position: relative;
    top: 10px;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}

.kyc-passin{
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}

.image img{
    width: 100px;
    height: 100px;
}

.editor >>> .w-e-toolbar{
  flex-wrap:wrap;
}

.editor >>> .w-e-text-container{
    height: 300px !important;   
}
</style>

