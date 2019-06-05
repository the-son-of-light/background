<template>
    <div class="confirmBox">
        <div class="editor">
            <p>标题：<el-input style="width:95%;" v-model="titleInfo" placeholder="请输入内容"></el-input></p>
            <p>图片：
                <a href="javascript:;" class="file">选择文件
                    <input @change="uploadPhoto($event)" type="file" class="kyc-passin">
                </a>
            </p>
            <p class="image">
                <img :src="image" alt="">
            </p>
            <editor-bar v-model="editor.info" :isClear="isClear" @change="change"></editor-bar>
        </div>
        <div class="button">
            <el-button type="primary" @click="saveHtml">保存</el-button>
        </div>
    </div>
</template>
<script>
import api from '../../api/index'
import EditorBar from './wangeditor'

export default {
    name:'confirm',
    data(){
        return{
            image:'',
            titleInfo:'',
            content: ``,
            editor: {
                info: ''
            },
            isClear: false,
        }
    },
    methods: {
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
                console.log(this.image);  
            }
        },
        saveHtml:function(event){
            let _this = this;
            console.log(this.image)
            if(this.titleInfo == '' || this.editor.info == ''){
                this.$message({
                    showClose: true,
                    message: '标题或内容不能为空',
                    type: 'warning'
                })
                return;
            }
            console.log(this.editor.info)
            let publicPage = {
                pic:_this.image,
                title:_this.titleInfo,
                content:_this.editor.info
            }
            console.log(publicPage.content)
            api.AddPolicy(publicPage).then(res=>{
                console.log(res)
                this.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success'
                })
                this.titleInfo = '';
                this.image = '';
                this.editor.info = '';
                this.$router.push({
                    path:'/confrimList'
                })
                location.reload()
            }) 
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
.editor{
    width: 100%;
}
.editor p{
    padding-bottom:10px;
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

.editor >>> .w-e-text-container{
    height: 300px !important;   
}

</style>
