<template>
  <div>
     <ul>
       <li v-for="pagina in paginas" :key="pagina">
       <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
name:'ProdutosPaginar',
props:{
  //prop com o valor total de produtos por pagina
  produtosPorPagina:{
    type:Number,//informamos o valor da prop é numero
    default:1//informamos que o valor padrão é 1
  },
  //prop com o valor total de produtos
  produtosTotal:{
    type:Number,//imformaos que o valor da prop é tipo Number
    default:1//informamos que o valor padrão é 1
  },
},
  computed:{
    //metodo computado para verificar a pag que o usuario estar e criar a logica do menu de paginação
    paginas(){
     const current = Number(this.$route.query._page);//verifica a pagina que o usuario esta
     const ranger = 9;//numero maximo de opções de paginação
     const offset = Math.ceil(ranger / 2)
     const total = this.paginasTotal;
     const pagesArray = [];
     
     for(let i = 1; i<=total; i++){
       pagesArray.push(i)
     }
     pagesArray.splice(0,current -offset)
     pagesArray.splice(ranger, total)
      console.log(current)
      console.log(ranger)
      console.log(pagesArray)
      return pagesArray
    },
    paginasTotal(){
      const total = this.produtosTotal / this.produtosPorPagina;//faz o calcculo das pagias
      return (total !== Infinity) ? Math.ceil(total) : 0
    }
  },
  methods:{
    query(pagina){
      return{
        ...this.$route.query,
          _page:pagina
      }
    }
  }

}
</script>

<style>


ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>