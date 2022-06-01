<template>
   <section class="produto-container">
     <transition mode="out-in">
          <div v-if="produtos && produtos.length > 0" class="produtos" key="produtos">
       <div v-for="(produto,index) in produtos" :key="index" class="produto">
         <router-link :to="{name: 'Produto',params: {id: produto.id}}">
          <img v-if="produto.fotos" :src="produto.fotos[0]" :alt="produto.fotos[0]">
          <p class="preco">{{produto.preco | numeroPreco}}</p>
          <h2 class="titulo">{{produto.nome}}</h2>
          <p>{{produto.descricao}}</p>
         </router-link>
       </div>
       <produtos-paginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>
     </div>
      <div v-else-if="produtos && produtos.length == 0" key="sem-resultado">
        <p class="sem-resultado">Busca sem resultado. Tente buscar outro termo</p>
      </div>
      <div v-else key="carregando">
        <pagina-carregando />
      </div>
    </transition>
   </section>
</template>

<script>
import {api} from '../services.js'
import {serialize} from  '../helpers.js'
import ProdutosPaginar from '../components/ProdutosPaginar.vue'

export default {
name:'ProdutoLista',
components:{
  ProdutosPaginar
},
data(){
  return{
    produtos:null,//valor inicial dos produtos
    produtosPorPagina:9,//total de produtos por pagina
    produtosTotal:0//valor de produtos que será usado no menu da paginação
  }
},
methods: {
  getProdutos(){
    this.produtos = null
    setTimeout(() =>{
    api.get(this.url)//usa como parametro a url para fazer a requisição com o axios
   .then(response => {
    this.produtosTotal = Number(response.headers["x-total-count"])//valor dos produtos que a api retornou
    this.produtos = response.data//salvamos na variavel produtos, o valor da requiição
   })       
    },1000)
  }
},
computed:{
  url(){
    const query = serialize(this.$route.query);
    //faz uma concatenação para buscar os produtos na url
    return `/produto?_limit=${this.produtosPorPagina}${query}`
  }
},
watch:{
  url(){
    //sempre que a url for mudada(em casos de busca por produtos) vai ser feita uma nova chamada a api
    this.getProdutos();
  }
},
created(){
  //sempre que o componente for iniciado, fara uma requisião a api buscando os produtos
  this.getProdutos()
}
}
</script>

<style>
.produto-container{
  max-width: 1000px;
  margin: 0 auto;
}

.produtos{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto{
  box-shadow: 0 4px 8px rgba(30,60,90,0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover{
  box-shadow: 0 4px 8px rgba(30,60,90,0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img{
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo{
  margin-bottom: 10px;
}

.preco{
  color: #e80;
  font-weight: bold;
}

.sem-resultado{
  text-align: center;
}
</style>