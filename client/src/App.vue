<template>
  <v-app>
    <Navbar></Navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import Navbar from './components/navbar'
  import ProductList from './components/productList'
  import LoginPage from './components/Login'
  import RegisterPage from './components/Register'
  import CreateProduct from './components/formCreate'

export default {
  name: 'App',
  components: {
    Navbar,
    LoginPage,
    ProductList,
    RegisterPage,
    CreateProduct
  },
  data () {
    return {
      //
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('SETISLOGIN', true);
    }
    if (localStorage.getItem('role') == 'Admin') {
      this.$store.commit('SETISADMIN', true)
    }
    if (localStorage.getItem('role') == 'Buyer') {
      this.$store.dispatch('getCarts');
    }
    this.$store.dispatch('getProducts');
  }
}
</script>
