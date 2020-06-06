<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" class="stuform">
      <el-form-item label="专家id">
        <el-input v-model="form.expert" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="专家姓名">
        <el-input v-model="form.expertName" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="指导老师id">
        <el-input v-model="form.oneId" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="指导老师姓名">
        <el-input v-model="form.teacherName" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="项目id">
        <el-input v-model="form.projectId" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="项目名字">
        <el-input v-model="form.projectName" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="报告id">
        <el-input v-model="form.reportId" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="负责人id">
        <el-input v-model="form.userId" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名">
        <el-input v-model="form.userName" placeholder="please input"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        expert: "",
        expertName: "",
        oneId: "",
        projectId: "",
        projectName: "",
        reportId: "",
        teacherName: "",
        userId: "",
        userName: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$bus.$emit("close");
      // console.log(this.form);
      this.$bus.$emit("find", this.form);
    },
    close() {
      this.$bus.$emit("close");
    }
  }
};
</script>

<style scoped>
.el-form-item {
  width: 390px;
}
.el-input__inner {
  width: 80% !important;
}
.el-form-item__label {
  width: 100px !important;
}
.el-input {
  width: 87% !important;
}
.btn {
  margin-left: 35px;
}
.stuform {
  width: 400px !important;
  position: relative;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 15px;
  background-color: rgb(163, 207, 218);
  z-index: 9999999;
  border-radius: 15px;
}
</style>
