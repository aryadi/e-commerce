import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    baseUrl: `http://e-commerce-1.madearyadi.club`,
    products: [],
    carts: [],
    selectedProduct: {},
    formatter: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
  },
  mutations: {
    SETISLOGIN(state, payload) {
      state.isLogin = payload;
    },
    SETISADMIN(state, payload) {
      state.isAdmin = payload;
    },
    SETPRODUCT(state, payload) {
      payload.forEach((item) => {
        item.price = state.formatter.format(item.price);
      })
      state.products = payload;
    },
    SETCART(state, payload) {
      payload.forEach((item) => {
        item.productId.price = state.formatter.format(item.productId.price);
      })
      state.carts = payload;
    },
    SETSELECTEDPRODUCT(state, payload) {
      state.selectedProduct = payload;
    }
  },
  actions: {
    getProducts(context) {
      axios({
          method: 'GET',
          url: context.state.baseUrl + '/products',
        })
        .then((response) => {
          // console.log(response.data[0]._id);
          context.commit('SETPRODUCT', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCarts(context) {
      
      axios({
          method: 'GET',
          url: context.state.baseUrl + '/carts/'+localStorage.getItem('_id'),
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then((response) => {

          console.log(response);
          context.commit('SETCART', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
})

export default store;