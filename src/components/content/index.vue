<template>
  <div>
    <h2>首页</h2>
    <div>用户{{$store.state.loginForm.userID}}，你好！</div>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
import { CHANGE_LOGOUT } from "../../store/mutation-types";

export default {
  name: "index",
  methods: {
    logout() {
      // console.log(this.$store.state.loginForm.userID);
      this.$store.commit(CHANGE_LOGOUT);
      this.$router.push("/login");
    }
  }
};
</script>
<style>
</style>
