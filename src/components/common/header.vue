<template>
  <div>
    <header>
      <div class="header-title" onclick="window.location.href = 'index.html'">
        <strong>大创中期检查系统</strong>
      </div>
      <div class="header-search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="formInline.content" placeholder="查询内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="header-profile">
        <el-dropdown>
          <span class="el-dropdown-link">
            我的
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <el-dropdown-item disabled>
              当前登录用户: {{ userName }}
              <template>
                <span v-if="identityId == 1">(学生)</span>
                <span v-if="identityId == 2">(指导老师)</span>
                <span v-if="identityId == 3">(二级学院管理员)</span>
                <span v-if="identityId == 4">(大创管理者)</span>
                <span v-if="identityId == 5">(评审专家)</span>
              </template>
            </el-dropdown-item>
            <el-dropdown-item>个人主页</el-dropdown-item>
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>
              <el-button @click="logout">退出账号</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import { CHANGE_LOGOUT } from "../../store/mutation-types";
import { request } from "../../network/request/request";
export default {
  data() {
    return {
      formInline: {
        content: ""
      },
      userId: "",
      userName: "",
      identityId: ""
    };
  },
  created() {
    //   console.log(this.$store.state.loginForm);
    this.userId = localStorage.getItem("USERID");
    this.initUserInfo();
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
    },
    logout() {
      // console.log(this.$store.state.loginForm.userID);
      this.$store.commit(CHANGE_LOGOUT);
      this.$router.push("/login");
    },
    initUserInfo() {
      request({
        url: "http://47.113.80.250:9003/user/select/" + this.userId,
        method: "get"
      }).then(res => {
        this.userName = res.data.user.userName;
        this.identityId = res.data.user.identityId;
        // console.log(res);
      });
    }
  }
};
</script>

<style>
header {
  background-color: #292a2a;
  height: 80px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 20px;
  z-index: 999;
  box-sizing: border-box;
}
.demo-form-inline {
  width: 100%;
  margin: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #ccc;
  font-size: 16px;
}
.el-icon-arrow-down {
  font-size: 16px;
}

.dropdown-menu {
  text-align: center;
}
.el-dropdown-menu .el-button {
  border: 0;
}
.header-profile {
  width: 100px;
  height: 50px;
  float: right;
  margin-top: 32px;
  margin-right: 6px;
}

.header-search {
  display: inline-block;
  margin-left: 330px;
  margin-top: 20px;
  z-index: 999;
}

.header-title {
  position: absolute;
  font-size: 24px;
  line-height: 70px;
}
</style>
