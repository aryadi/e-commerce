<template>
  <v-card height="500">
    <v-img v-bind:src="product.image" height="60%" aspect-ration="1"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0 mb-2">{{product.name}}</h3>
        <div style="text-align: left">Price: {{product.price}}</div>
        <div style="text-align: left">Stock: {{product.stock}}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn @click="addToChart(product._id)" v-if="!$store.state.isAdmin && $store.state.isLogin" color="success">Add
        to Cart</v-btn>
      <DialogDetail :product="product" class="dialog-style" v-if="!$store.state.isAdmin && $store.state.isLogin">Detail</DialogDetail>
      <!-- <v-btn v-if="!$store.state.isAdmin && $store.state.isLogin" color="error">Detail</v-btn> -->
      <v-btn v-if="$store.state.isAdmin && $store.state.isLogin" @click="showEdit(product)" color="success">Edit</v-btn>
      <v-btn @click="deleteProduct(product._id)" v-if="$store.state.isAdmin && $store.state.isLogin" color="error">Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import DialogDetail from './dialogDetail'
  export default {
    components: {
      DialogDetail
    },
    props: ['product'],
    methods: {
      addToChart(productId) {
        axios({
            method: 'POST',
            url: this.$store.state.baseUrl + '/carts',
            data: {
              productId: productId,
              userId: localStorage.getItem('_id')
            },
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then((response) => {
            Swal.fire(
              'Succesful!',
              'Product added to Chart',
              'success'
            )
            this.$store.dispatch('getCarts');
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);

            Swal.fire(
              'Opps!',
              'Something went wrong',
              'error'
            )
          });
      },
      showEdit(obj) {
        this.$store.commit('SETSELECTEDPRODUCT', obj);
        this.$router.push('/form_update')
      },
      deleteProduct(id) {
        axios({
            method: 'DELETE',
            url: this.$store.state.baseUrl + '/products/' + id,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then((response) => {
            this.$store.dispatch('getProducts');
            Swal.fire(
              'Succesful!',
              'Products deleted!',
              'success'
            );
          })
          .catch((err) => {
            Swal.fire(
              'Opps!',
              'Something wrong',
              'error'
            );
            console.log(err);
          });
      }
    },

  }
</script>

<style scoped>
  .dialog-style {
    margin-left: 10px;
  }
</style>
