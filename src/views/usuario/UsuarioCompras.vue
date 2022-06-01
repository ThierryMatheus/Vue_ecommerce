<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <button class="deletar" @click="deletarCompra(compra.id)">Remover do carrinho</button>
         <produto-item v-if="compra.produto" :produto="compra.produto">
           <p class="vendedor">
             <span>Vendedor</span>
             {{compra.vendedor_id}}
           </p>
         </produto-item>
      </div>
    </div>
  </section>
</template>

<script>
import ProdutoItem from '../../components/ProdutoItem.vue'
import {api} from './../../services.js'
import {mapState} from 'vuex'

export default {
name:'UsuarioCompras',
components:{ProdutoItem},
data(){
  return{
    compras:null,
  }
},
computed:{
  ...mapState(['usuario','login'])
},
methods:{
  getCompras(){
    api.get(`/transacao?comprador_id=${this.usuario.id}`)
    .then(response =>{
      this.compras = response.data
    })
  },
  deletarCompra(id){
    const confirmar = window.confirm("Deseja remover esta compra?")
    if(confirmar){
    api.delete(`/transacao/${id}`)
    .then(() => {
      this.getCompras();
    }).catch(error => {
      console.log(error.response)
    })
    }
  }

},
watch:{
  login(){
    this.getCompras()
  }
},
created(){
  if(this.login){
  this.getCompras()
  }
}
}
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
