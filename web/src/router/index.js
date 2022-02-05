import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import AddProduct from '@/views/products/AddProduct.vue'
import AllProducts from '@/views/products/AllProducts.vue'
import EditProduct from '@/views/products/EditProduct.vue'
import SingleProduct from '@/views/products/SingleProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products/:slug',
    name: 'SingleProduct',
    component: SingleProduct,
  },
  // Admin dash
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/products',
    name: 'AllProducts',
    component: AllProducts,
  },
  {
    path: '/edit-product',
    name: 'EditProduct',
    component: EditProduct,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
