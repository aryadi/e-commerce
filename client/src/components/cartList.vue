<template>
  <div v-if="$store.state.carts.length == 0">
    <h3 class="header-cart display-2">Empty</h3>
  </div>
  <div v-else>
    <h3 class="header-cart display-2">Cart</h3>
    <div class="cartContainer">
      <div class="cart" v-for="cart in $store.state.carts" :key="cart._id">
        <img class="cart-image" :src="cart.productId.image" alt="">
        <div>
          <p class="cart-text">Product Name: {{cart.productId.name}}</p>
          <p class="cart-text">Price: {{cart.productId.price}}</p>
          <p class="cart-text-description">Description: {{cart.productId.description}}</p>
        </div>
        <div>
          <v-text-field label="Quantity" type='number'></v-text-field>
          <v-btn @click="deleteCart(cart._id)" color="error">Delete</v-btn>
        </div>
      </div>
      <!-- <v-btn color="success">Checkout</v-btn> -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  export default {
    methods: {
      deleteCart(id) {
        axios({
            method: 'DELETE',
            url: this.$store.state.baseUrl + '/carts/' + id,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then((response) => {
            this.$store.dispatch('getCarts');
            Swal.fire(
              'Succesful!',
              'Cart deleted!',
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
    }
  }
</script>

<style scoped>
  .header-cart {
    font-weight: bold;
    color: #333;
    margin-top: 100px;
    margin-bottom: 40px;
    text-align: center;
  }

  .cartContainer {
    padding: 20px 250px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    background-color: #eee;
    margin-bottom: 10px;
  }

  .cart-image {
    height: 200px;
    width: 200px;
  }

  .cart-text {
    font-size: 1.8rem;
    margin: 0px;
  }
</style>
