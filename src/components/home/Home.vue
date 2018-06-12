<template>
  <div>
    <h1>{{ titulo }}</h1>
    <input class="filtro" type="search" @input="filtro = $event.target.value" placeholder="Busque pelo título">
    {{ filtro }}
    <ul>
      <li v-for="foto of fotosComFiltro">
        <painel :titulo="foto.titulo">
          <imagem-responsiva v-transform="360" :titulo="foto.titulo" :url="foto.url"></imagem-responsiva>
          <botao 
              tipo="submit" 
              rotulo="Excluir" 
              @botaoAtivado="excluir( foto )"
              estilo="perigo"
              :confirmacao="true"></botao>
        </painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue"
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue"
import Botao from "../shared/botao/Botao.vue";

export default {

  components: {
    painel : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    botao : Botao
  },
  name: 'app',
  data () {
    return {
      titulo: 'Alurapic',
      fotos : [],
      filtro : ''
    }
  },
  computed : {
    fotosComFiltro(){
      if( this.filtro ){
        
        let exp = new RegExp( this.filtro.trim(), 'i' ); 
        
        return this.fotos.filter( 
          foto => exp.test( foto.titulo )
        );
      }else{
        
        return this.fotos;
      }
    }
  },

  methods : {
      
      excluir( item ){

          alert( item.titulo + " excluido com sucesso!" );
      }
  },
  created(){
    let promise = this.$http.get('http://localhost:3000/v1/fotos');
    
    promise
      .then( res => res.json() )
      .then( fotos => this.fotos = fotos , err => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.imagem-responsiva{
  width: 100%;
}

.filtro{

  display: block;
  width: 100%;
  margin: 1rem;
  padding: .4rem;
}
</style>
