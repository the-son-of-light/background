webpackJsonp([13],{TV9w:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("gyMJ"),s=a("P+Pz"),o=(document.createElement("p"),document.createElement("a"),document.createElement("div"),s.a,document.createElement("p")),n=document.createElement("a"),l=document.createElement("div"),r={name:"guideList",data:function(){return{uploadUrl:this.GLOBAL.BASE_URL+"/api/Administration/group/UploadFile",fileList:[],currentPage:1,pagesize:10,total:0,tableData:[],dialogVisible:!1,image:"",titleInfo:"",editor:{info:""},isClear:!1,value:"",imgUrl:""}},created:function(){this.showPublic()},methods:{handleSuccess:function(e,t,a){console.log(t.name),""==e.data[0]?this.$message({showClose:!0,message:"上传失败",type:"warning"}):this.$message({showClose:!0,message:"上传成功",type:"success"}),o.append(n),n.className="download",n.innerText=t.name,n.href=e.data[0],n.download=t.name,l.append(o),this.editor.info+=l.innerHTML},showPublic:function(){var e=this,t={page:this.currentPage,rows:this.pagesize,type:5};i.a.QueryResearch(t).then(function(t){e.$message({showClose:!0,message:t.msg,type:"warning"}),e.tableData=t.obj.rows,e.total=t.obj.total})},deleteContent:function(e){var t=this;console.log(e.id);var a={id:e.id};i.a.DeleteResearch(a).then(function(e){t.$message({showClose:!0,message:e.msg,type:"success"}),t.showPublic(),console.log(e)})},uploadPhoto:function(e){var t=this,a=e.target.files[0],i=a.size;a.name;i>2101440&&this.$message({showClose:!0,message:"图片不能超过2M",type:"warning"});var s=new FileReader;s.readAsDataURL(a),s.onload=function(e){t.image=e.target.result,t.imgUrl=e.target.result}},add:function(){this.$router.push({path:"/guide"})},editorContent:function(e){var t=this,a=this;this.value=e.id,this.dialogVisible=!0;var s={id:e.id};i.a.getDetail(s).then(function(e){console.log(e),t.editor.info="";var i=e.obj;a.imgUrl=i.pic,t.titleInfo=i.title,t.editor.info=i.content,t.image=t.GLOBAL.BASE_URL+"/"+i.pic,console.log(t.image),t.showPublic()})},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pagesize=e,this.showPublic()},handleCurrentChange:function(e){console.log("当前页: "+e),this.currentPage=e,this.showPublic()},tableRowClassName:function(e){e.row;var t=e.rowIndex;return 1===t?"warning-row":3===t?"success-row":""},saveHtml:function(e){var t=this;console.log(this.image),""!=this.titleInfo&&""!=this.editor.info||this.$message({showClose:!0,message:"标题或内容不能为空",type:"warning"}),console.log(this.editor.info);var a={id:this.value,pic:this.imgUrl,title:this.titleInfo,content:this.editor.info};console.log(a.content),i.a.UpdateResearch(a).then(function(e){console.log(e),t.$message({showClose:!0,message:"保存成功",type:"success"}),t.showPublic()}),this.titleInfo="",this.image="",this.editor.info="",this.dialogVisible=!1,location.reload()},change:function(e){this.editor.info1=e}},components:{EditorBar:s.a}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"moneyListBox"},[a("div",{staticClass:"addUserBtn"},[a("el-button",{staticStyle:{width:"80px"},attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[e._v("增加")])],1),e._v(" "),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-class-name":e.tableRowClassName}},[a("el-table-column",{attrs:{prop:"title",label:"标题"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"发布人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createat",label:"发布时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addDelete",label:"编辑"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.editorContent(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.deleteContent(t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",{staticClass:"editorContent"},[a("el-dialog",{attrs:{title:"增加内容",visible:e.dialogVisible,width:"60%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"editor"},[a("p",[e._v("标题："),a("el-input",{staticStyle:{width:"95%"},attrs:{placeholder:"请输入内容"},model:{value:e.titleInfo,callback:function(t){e.titleInfo=t},expression:"titleInfo"}})],1),e._v(" "),a("p",[e._v("缩略图:\n                    "),a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[e._v("选择图片\n                        "),a("input",{staticClass:"kyc-passin",attrs:{type:"file"},on:{change:function(t){return e.uploadPhoto(t)}}})])]),e._v(" "),a("p",{staticClass:"image"},[a("img",{staticClass:"editorImage",attrs:{src:e.image,alt:""}})]),e._v(" "),a("editor-bar",{attrs:{isClear:e.isClear},on:{change:e.change},model:{value:e.editor.info,callback:function(t){e.$set(e.editor,"info",t)},expression:"editor.info"}}),e._v(" "),a("div",{staticClass:"upload"},[a("el-upload",{ref:"upload",staticClass:"upload",attrs:{action:e.uploadUrl,"on-success":e.handleSuccess,limit:3,multiple:"","method:":"post",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain","file-list":e.fileList}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""}},[e._v("上传附件")])],1)],1)],1),e._v(" "),a("div",{staticClass:"button"},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveHtml}},[e._v("保存")])],1)])],1)])},staticRenderFns:[]};var d=a("C7Lr")(r,c,!1,function(e){a("czSF")},"data-v-2e5466b6",null);t.default=d.exports},czSF:function(e,t){}});
//# sourceMappingURL=13.483dd50d793be1ecffc8.js.map