<template>
  <div class="home">
    <h1>Compre ou Venda</h1>
    <produto-buscar/>
    <produto-lista/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProdutoBuscar from '../components/ProdutoBuscar.vue'
import ProdutoLista from '../components/ProdutoLista.vue'

export default {
  name: 'Home',
  components: {
    ProdutoBuscar,
    ProdutoLista
  }
}
</script>

<style scoped>
  h1{
    color: #87f;
    margin-top: 40px;
    font-size: 2rem;
    text-align: center;
  }
</style>