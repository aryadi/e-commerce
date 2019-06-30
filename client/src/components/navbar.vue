<template>
  <v-toolbar class="blue darken-4" fixed="true">
    <v-toolbar-title class="white--text">
      <router-link style="color: white; text-decoration:none" to="/">HOOPS SHOP</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="$store.state.isAdmin && $store.state.isLogin" to="/createProduct" class="white--text" flat>Add
        Product</v-btn>
      <v-btn v-if="!$store.state.isAdmin && $store.state.isLogin" to="/cart" class="white--text" flat>Cart</v-btn>
      <!-- <v-btn v-if="!$store.state.isLogin" to="/login" class="white--text" flat>Sign In</v-btn> -->
      <v-btn v-if="!$store.state.isLogin" to="/login_register" class="white--text" flat>Sign in / Sign up</v-btn>
      <v-btn v-if="$store.state.isLogin" @click="logout" class="white--text" flat>Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import Swal from 'sweetalert2';
  export default {
    methods: {
      logout() {
        localStorage.clear();
        this.$store.commit('SETISLOGIN', false);
        this.$store.commit('SETISADMIN', false);
        Swal.fire(
          'Succesful!',
          'User logged out!',
          'success'
        )
        this.$router.push('/');
      }
    }
  }
</script>

<style>

</style>
