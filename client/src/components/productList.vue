<template>
  <v-container class="my-5" grid-list-md text-xs-center>
    <Parallax class="mb-5" v-if="!$store.state.isLogin"></Parallax>
    <router-view></router-view>
    <v-layout row wrap>
      <v-flex v-for="product in $store.state.products" :key="product._id"  xs4>
        <Card :product="product"></Card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Parallax from './Parallax'
  import Card from './card'
  export default {
    components: {
      Card,
      Parallax
    },
    data() {
      return {
      }
    }
  }
</script>

<style>

</style>
