import Vue from 'vue'
import Router from 'vue-router'
import ProductList from './components/productList'
import LoginPage from './components/Login.vue'
import RegisterPage from './components/Register.vue'
import CartPage from './components/cartList'
import CreateProduct from './components/formCreate'
import LoginRegisterPage from './components/LoginRegister'
import FormUpdate from './components/formEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/login_register',
      name: 'LoginRegisterPage',
      component: LoginRegisterPage,
      children: [{
          path: '/login',
          name: 'LoginPage',
          component: LoginPage
        },
        {
          path: '/register',
          name: 'RegisterPage',
          component: RegisterPage
        }
      ]
    },
    {
      path: '/cart',
      name: 'CartPage',
      component: CartPage
    },
    {
      path: '/createProduct',
      name: 'CreateProduct',
      component: CreateProduct
    },
    {
      path: '/form_update',
      name: 'FormUpdate',
      component: FormUpdate
    }
  ]
})
