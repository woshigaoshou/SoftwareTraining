<template>
    <div class="content-view">
        <!--表格-->
        <el-table
          border
          :data="tableData"
          style="width: 100%"
          @expand-change="handleMange" 
          >
          <el-table-column type="expand" >
           <template slot-scope="props" >
              <el-form label-position="left" inline class="table-expand">
                      <el-form-item label="项目ID:">
                        <span>{{ props.row.projectId }}</span>
                      </el-form-item>
                      <el-form-item label="项目名称:">
                        <span>{{ props.row.projectName }}</span>
                      </el-form-item>
                      <el-form-item label="负责人:">
                        <span>{{ userInfo.userName }}</span>
                      </el-form-item>
                      <el-form-item label="学号:">
                        <span>{{ props.row.userId }}</span>
                      </el-form-item>
                      <el-form-item label="联系方式:">
                        <span>{{ userInfo.userPhone }}</span>
                      </el-form-item>
                      <el-form-item label="项目等级:">
                        <span v-if="props.row.grade === 1">校级</span> 
                        <span v-if="props.row.grade === 2">省级</span> 
                        <span v-if="props.row.grade === 3">国家级</span> 
                        <span v-if="props.row.grade === 0">无</span>
                      </el-form-item>
                       <el-form-item label="指导老师1:">
                        <span v-if="props.row.oneId !== null">{{props.row.oneId}}</span> 
                        <span v-else>无</span>
                      </el-form-item>
                       <el-form-item label="指导老师2:">
                        <span v-if="props.row.twoId !== null">{{props.row.twoId}}</span> 
                        <span v-else>无</span>
                      </el-form-item>
                      <el-form-item label="立案申请:">
                        <span v-if="props.row.sreport == 1" style="color:green">已提交</span> 
                        <span v-else style="color:red">未提交</span>
                      </el-form-item>
                      <el-form-item label="中期报告:">
                         <span v-if="props.row.mreport == 1" style="color:green">已提交</span> 
                        <span v-else style="color:red">未提交</span>
                      </el-form-item>
                      <el-form-item label="结案报告:">
                         <span v-if="props.row.freport == 1" style="color:green">已提交</span> 
                          <span v-else style="color:red">未提交</span>
                      </el-form-item>
                    </el-form>
          </template>
          </el-table-column>
          <template>
          <el-table-column
            label="项目名称"
            width="270"
            prop="projectName"
            >
          </el-table-column>
          <el-table-column
            label="项目负责人学号"
            width="180"
            prop="userId"
            >
          </el-table-column>
          <el-table-column
            label="项目等级"
            width="150">
            <template slot-scope="scope"> 
                  <span v-if="scope.row.grade === 1">校级</span> 
                  <span v-if="scope.row.grade === 2">省级</span> 
                  <span v-if="scope.row.grade === 3">国家级</span> 
                  <span v-if="scope.row.grade === 0">无</span>
              </template>
          </el-table-column>
          <el-table-column
            label="中期报告"
            width="150">
              <template slot-scope="scope">
                  <span v-if="scope.row.mreport == 1" style="color:green">已提交</span> 
                  <span v-else style="color:red">未提交</span>
              </template>
          </el-table-column>
          </template>
          <el-table-column label="中期报告操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="mReport(scope.$index, scope.row)">查看</el-button>
              <el-button type="primary" size="small" @click="mReportNew(scope.$index, scope.row)">新建</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="5"
              layout="prev, pager, next, jumper"
              :total="count">
            </el-pagination>
       </div>

    <el-dialog
      v-model="dialogFormVisibleNew"
     :visible.sync="dialogFormVisibleNew"
      class="midReport"
     title="新建中期报告">
     <el-form class="mReportForm">
       <el-form-item label="项目名称:" label-width="100px" >
             <span>{{midReportNew.projectName}}</span>
      </el-form-item>
      <el-form-item label="项目编号:" label-width="100px">
             <span>{{midReportNew.projectId}}</span>
      </el-form-item>
      <el-form-item label="学生学号" label-width="100px">
             <span>{{midReportNew.userId}}</span>
      </el-form-item>
      <el-form-item label="中期报告简介" label-width="100px">
            <el-input v-model="midReportNew.content"></el-input>
      </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
        <el-button @click="submitMreport" type="primary">新建</el-button>
      </div>
    </el-dialog>
     <el-dialog
      v-model="dialogFormVisible"
     :visible.sync="dialogFormVisible"
      class="midReport"
     title="中期报告详情">
    <template>
      <el-form class="mReportForm" :model="midReport" >
            <el-form-item label="项目名称:" label-width="100px">
             <span>{{projectName}}</span>
          </el-form-item>
          <el-form-item label="中期报告简介:" label-width="100px">
            <span v-if="changeContentValue == false">
             <span>{{content}}</span>
             <a href="javascript:;" @click="changeContentValue = true" class="changeContent">修改</a>
             </span>
             <el-form class="contentForm" v-else>
               <el-input v-model="content"></el-input>
               <el-button type="primary" size="mini" @click="changeContent">确定</el-button>
             </el-form>
          </el-form-item>
          <el-form-item label="导师评议:" label-width="100px" class="midDisscuss" >
             <span v-if="midReport.tapproval === 0">未审核</span>
             <span v-if="midReport.tapproval === 1" style="color:red">不通过</span>
             <span v-if="midReport.tapproval === 2" style="color:green">已通过</span>
             <span v-if="midReport.tapproval === 3" style="color:yellow">退回修改</span>
          </el-form-item>
          <el-form-item label="学院评议:" label-width="100px" class="midDisscuss">
              <span v-if="midReport.capproval === 0">未审核</span>
             <span v-if="midReport.capproval === 1" style="color:red">不通过</span>
             <span v-if="midReport.capproval === 2" style="color:green">已通过</span>
             <span v-if="midReport.capproval === 3" style="color:yellow">退回修改</span>
          </el-form-item>
          <el-form-item label="大创管理评议:" label-width="100px" class="midDisscuss">
              <span v-if="midReport.sapproval === 0">未审核</span>
             <span v-if="midReport.sapproval === 1" style="color:red">不通过</span>
             <span v-if="midReport.sapproval === 2" style="color:green">已通过</span>
             <span v-if="midReport.sapproval === 3" style="color:yellow">退回修改</span>
          </el-form-item>
           <el-form-item label="评审专家评议:" label-width="100px" class="midDisscuss">
              <span v-if="midReport.eapproval === 0">未审核</span>
             <span v-if="midReport.eapproval === 1" style="color:red">不通过</span>
             <span v-if="midReport.eapproval === 2" style="color:green">已通过</span>
             <span v-if="midReport.eapproval === 3" style="color:yellow">退回修改</span>
          </el-form-item>
          <el-form-item label="导师评语:" label-width="100px">
             <span>{{midReport.tcomment}}</span>
          </el-form-item>
           <el-form-item label="学院评语:" label-width="100px">
             <span>{{midReport.ccomment}}</span>
          </el-form-item>
           <el-form-item label="大创管理评语:" label-width="100px">
             <span>{{midReport.scomment}}</span>
          </el-form-item>
           <el-form-item label="评审专家评语:" label-width="100px">
             <span>{{midReport.ecomment}}</span>
          </el-form-item>
          <el-form-item label="上传文件:" label-width="100px" enctype="multipart/form-data">
             <el-upload
              class="upload-demo"
              ref="upload"
              action
              :limit="1"
              :before-upload="beforeUpload"
              >
              <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip" style="margin:0">文件不超过5MB</div>
              <el-button type="primary" size="mini" style="margin-left:10px" @click="submitUpload()">上传</el-button>
              <p v-if="fileShow === true" style="font-size:12px;color:#ccc;margin:0">{{ mfileNewName }}</p>   
              </el-upload> 
          </el-form-item>
          <el-form-item label="文件列表:" label-width="100px" style="width:90%">
             <el-table
                  :data="mfiles"
                  height="250"
                  border
                  style="width: 100%;font-size:12px">
                  <el-table-column
                    prop="fname"
                    label="文件名"
                    width="210">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    > 
                    <template slot-scope="scope">
                    <el-link :href="'http://47.113.80.250:8012/onlinePreview?url='+scope.row.furl">
                    <el-button size="mini" type="primary">预览</el-button>
                    </el-link>
                    <el-link :href="scope.row.furl" style="margin-left:10px">
                    <el-button type="primary" size="mini">下载</el-button>
                    </el-link>    
                    <el-popconfirm
                          confirmButtonText='确认'
                          cancelButtonText='不了'
                          icon="el-icon-info"
                          title="确定删除该文件吗？"
                          style="margin-left:10px;"
                          @onConfirm="deleteFile(scope.$index,scope.row)"
                        >
                    <el-button slot="reference" 
                    size="mini" type="danger">删除</el-button>
                    </el-popconfirm>
                 </template>
                  </el-table-column>
                </el-table>
          </el-form-item>
      </el-form>
      
    </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../../network/request/request";
export default {
  data() {
    return {
      tableData:[],
      userId : '',
      dialogFormVisible:false,
      dialogFormVisibleNew:false,
      baseUrl:'',
      userInfo:[], 
      count:0, 
      limit:5,
      currentPage: 1,
      midReport:[],
      midReportNew:[],
      projectName:'',
      mfiles:[],
      content:'',
      changeContentValue:false,
      fileShow:false,
      mfileNewName:'',
      mfileNewForm:{
        file:'',
        reportId:''
      }
    }
  },
  created() {
    this.initData();
  },
  methods:{
    //初始化数据
    initData() {
      this.userId = localStorage.getItem("USERID")
    request({
        url:'http://47.113.80.250:9003/project/select/' + this.userId,
        method:'get'
      }).then(res => {
        this.tableData =[];
        console.log(res);
        res.data.forEach(item => {
        this.tableData.push(item) ;
        })
        // console.log(this.tableData);
        this.count = this.tableData.length;
        return this.tableData   
        })
    },
    //点击拓展按钮显示拓展表格
    handleMange(index, row) {
        // console.log(index);
        // console.log(row);
        request({
        url:'http://47.113.80.250:9003/user/select/' + row[0].userId,
        method:'get'
      }).then(res => {
        this.userInfo =[];
        this.userInfo = row
        console.log(res);
        this.userInfo.userCollege = res.data.college.collegeName;
        this.userInfo.userName = res.data.user.userName
        this.userInfo.userPhone = res.data.user.phone
        //将该项目中的数据整合到userInfo中
        // console.log(this.userInfo);        
        // return this.tableData[0]     
        })
    },
    //分页设置
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
       this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      // this.getResturants()
      },
    //中期报告信息获取
    mReport(index, row) {
      console.log(row);
      request({
        url:'http://47.113.80.250:9003/report/select/' + row.projectId,
        method:'get'
      }).then(res => {
        // console.log(res);
        if(res.code === 200){
         this.projectName = row.projectName;
        this.midReport = res.data.mreport;
        this.mfiles = res.data.mfiles;
        this.content = res.data.mreport.content;
        return res.code
        }else {
          alert(res.message)
        }
        // console.log(this.midReport);
        }).then(res => {
          // if(res.code == 200)
          if(res === 200) {
            this.dialogFormVisible = true
          }
         
        })
    },

  //新建中期报告
  mReportNew(index,row){
    console.log(row);
    if(row.mreport === 1) {
      alert('您已建立了中期报告，请查看并修改');
    }
    else if(row.mreport === 0) {
    this.midReportNew.projectId =row.projectId;
    this.midReportNew.projectName = row.projectName;
    this.midReportNew.userId = row.userId;
    this.dialogFormVisibleNew = true
    }
  },
  //中期报告上传
  submitMreport() {
      request({
          url:'http://47.113.80.250:9003/report/student/insert',
          data:{
            content:this.midReportNew.content,
            projectId:this.midReportNew.projectId,
            userId:this.midReportNew.userId
          },
          method:'POST'
        }).then(res => {
          console.log(res);
          
          if(res.code === 200) {
            alert('新建成功！');
            this.dialogFormVisibleNew = false;
            this.$router.go(0)
          } else {
            alert(res.message)
          }
   })
  },

    //删除中期报告文件
    deleteFile(index,row) {
      let rowId = row.fid
      request({
        url:'http://47.113.80.250:9003/report/student/file/delete',
        data: { fileId :rowId },
        method:'POST'
      }).then(res => {
        if(res.code === 200) {
         alert('删除成功');
         this.mfiles.splice(index,1)
        }else {
          alert(res.message)
        }
      })
    },
    
    //修改中期报告简介
    changeContent() {
      request({
        url:'http://47.113.80.250:9003/report/student/update',
        data:{content:this.content,reportId:this.midReport.reportId},
        method:'POST'
      }).then(res => {
        alert('修改简介成功！')
        this.changeContentValue = false;
      })
    },

    //中期报告文件上传
    //(1)上传前检验
    beforeUpload(file) {
      console.log(file);
      this.mfileNewForm.file = file;
      this.mfileNewForm.reportId = this.midReport.reportId;
      //下方显示文件名
      this.fileShow = true;
      this.mfileNewName = file.name;
      //限制文件大小不超过5m
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return isLt5M;
    },
    submitUpload() {
     console.log(this.mfileNewForm);
    request ({
      url:'http://47.113.80.250:9003/report/student/file/insert/one',
      headers:{'Content-Type':'multipart/form-data'},
      data:this.mfileNewForm,
      method:'POST'
    }).then(res => {
      console.log(res);
      
    })
    }
  }
}
</script>

<style>
.table-expand {
        font-size: 0;
    }

.table-expand label {
      width: 90px;
      color: #99a9bf;
    }
.table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        line-height: 20px;
        width: 50%;
    }
.el-pagination {
    text-align: center;
    margin-left: -50px;
    margin-top: 30px;
  }
  .content-view {
    /* position: fixed; */
    /* margin-top: 80px; */
    padding-top: 100px;
    padding-left: 50px;
    overflow: auto;
  }
  .project_form {
   margin-top: 0px;
   margin-left: 0px; 
  }
  .table-expand{
      margin: 0 auto;
    }
.el-table__expanded-cell form{
  margin-top: -10px;
  width: 100%;
}
.table-expand el-button {
  margin: 0 auto;
}
.el-dialog__body {
  margin: -5px auto 0;
}
    /* .el-form-item {
      margin-left: 15px;
    } */

    .el-dialog__title {
      font-size: 16px;
      font-weight: 600;
      color: cadetblue;
    }
    .midReport {
      margin: 0 auto;
    }
    .mReportForm {
      margin: 0;
      margin-top: -18px;
      width: 100%;
    }
    .v-modal {
      position: relative;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
    .el-form-item__label , .el-form-item__content{
      line-height: 30px;
    }
    .midDisscuss {
      width: 50%;
      float: left;
    }
  .el-button {
    vertical-align: middle;
    }
  .changeContent {
    color:skyblue;
    font-size: 14px;
    margin-left: 10px;
    text-decoration: none;
  }
  .contentForm {
    margin: 0;
  }
  .contentForm .el-button {
    float: right;
    margin-top: 3px;
  }
  .el-col-20 {
    width: 74.1%;
  }
</style>