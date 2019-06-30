<template>
<div>
  <div class="login-register-container">
    <v-btn to="/login" color="info">Sign In</v-btn>
    <v-btn to="/register" color="info">Sign Up</v-btn>
  </div>
  <div>
    <router-view></router-view>
  </div>
</div>
  
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .login-register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
</style>
