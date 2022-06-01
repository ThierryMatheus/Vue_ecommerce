import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Produto from '../views/Produto.vue'
import Login from '../views/Login.vue'
import Usuario from '../views/usuario/Usuario.vue'
import UsuarioProduto from '../views/usuario/UsuarioProduto.vue'
import UsuarioEditar from '../views/usuario/UsuarioEditar.vue'
import UsuarioVendas from '../views/usuario/UsuarioVendas.vue'
import UsuarioCompras from '../views/usuario/UsuarioCompras.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: Produto,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/usuario',
    component: Usuario,
    //tpega um elemnto e transforma em filho
    children:[
      {
        path:'',
        name:'Usuario',
        component:UsuarioProduto
      },
      {
        path:'compras',
        name:'Compras',
        component:UsuarioCompras
      },
      {
        path:'vendas',
        name:'Vendas',
        component:UsuarioVendas
      },
      {
        path:'editar',
        name:'Usuario-editar',
        component:UsuarioEditar
      }
    ]
  },

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior:"smooth"})
  }
  
})



export default router
