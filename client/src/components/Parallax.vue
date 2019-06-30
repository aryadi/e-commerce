<template>
  <v-parallax
    dark
    src="https://images.unsplash.com/photo-1527515047028-10b18ca90f24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-4 font-weight-bold mb-3 parallax-text">Hoops Shop</h1>
      <h4 class="display-1 parallax-text">The best jersey only for you!</h4>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {

}
</script>

<style scoped>
  .parallax-text {
    color: #111;
    text-shadow: -2px 2px 0 #ddd, 1px -1px 0 #ddd, -1px 1px 0 #ddd, 1px 1px 0 #ddd;
  }
</style>
